#!/usr/bin/env python3
"""Synthetic uniform corpora for eye-message fingerprint calibration.

Builds 9-message null sets at real lengths with two structural knobs beyond
plain i.i.d. Uniform(0..82):

  plain        — independent uniform (allows adjacent doubles)
  no_doubles   — uniform, reject c[i]==c[i-1] (matches eye no-double rule)
  gap4_spike   — no_doubles + copy c[i]=c[i-4] with prob p (elevates gap-4)

Compares pooled gap histograms and Offset-tab hit counts vs the real corpus.

Usage:
  python3 uniform_nulls.py
  python3 uniform_nulls.py --trials 10000 --gap4-p 0.01
  python3 uniform_nulls.py --write-sample null_gap4.json
"""
from __future__ import annotations

import argparse
import json
import random
import statistics
from collections import Counter
from pathlib import Path
from typing import Callable

from offset_monte_carlo import (
    N,
    all_pair_counts,
    load_real,
    p_ge,
    pair_offset_hits,
)

VIEWER = Path(__file__).with_name("eye-messages-isomorph-viewer.html")
GAP_MIN, GAP_MAX = 2, 20
DEFAULT_GAP4_P = 0.01  # ponytail: ~real gap-4 share (~13%) on one seed sweep


# ---- generators (one message) -----------------------------------------------

def gen_plain(length: int, rng: random.Random) -> list[int]:
    return [rng.randrange(N) for _ in range(length)]


def gen_no_doubles(length: int, rng: random.Random) -> list[int]:
    seq: list[int] = []
    prev = -1
    for _ in range(length):
        x = rng.randrange(N)
        while x == prev:
            x = rng.randrange(N)
        seq.append(x)
        prev = x
    return seq


def gen_gap4_spike(length: int, rng: random.Random, *, p_copy: float) -> list[int]:
    """No-doubles stream with injected i vs i-4 repeats (gap-4 pairs)."""
    seq: list[int] = []
    for i in range(length):
        if i >= 4 and rng.random() < p_copy and seq[i - 4] != seq[i - 1]:
            seq.append(seq[i - 4])
        else:
            x = rng.randrange(N)
            while seq and x == seq[-1]:
                x = rng.randrange(N)
            seq.append(x)
    return seq


def make_gen(kind: str, gap4_p: float) -> Callable[[int, random.Random], list[int]]:
    if kind == "plain":
        return gen_plain
    if kind == "no_doubles":
        return gen_no_doubles
    if kind == "gap4_spike":
        return lambda L, rng: gen_gap4_spike(L, rng, p_copy=gap4_p)
    raise ValueError(kind)


def make_corpus(names: list[str], lengths: list[int], gen, rng: random.Random) -> dict[str, list[int]]:
    return {n: gen(L, rng) for n, L in zip(names, lengths)}


# ---- fingerprints (viewer N-Gaps logic) -------------------------------------

def count_doubles(seq: list[int]) -> int:
    return sum(1 for i in range(len(seq) - 1) if seq[i] == seq[i + 1])


def message_gaps(seq: list[int]) -> list[int]:
    last: dict[int, int] = {}
    out: list[int] = []
    for i, v in enumerate(seq):
        if v in last:
            g = i - last[v]
            if GAP_MIN <= g <= GAP_MAX:
                out.append(g)
        last[v] = i
    return out


def corpus_fingerprint(msgs: dict[str, list[int]]) -> dict:
    all_gaps: list[int] = []
    doubles = 0
    for seq in msgs.values():
        doubles += count_doubles(seq)
        all_gaps.extend(message_gaps(seq))
    gc = Counter(all_gaps)
    total = len(all_gaps) or 1
    return {
        "doubles": doubles,
        "gap_total": len(all_gaps),
        "gap4": gc.get(4, 0),
        "gap4_share": gc.get(4, 0) / total,
        "gap2": gc.get(2, 0),
        "gap2_share": gc.get(2, 0) / total,
        "gap_counts": dict(sorted(gc.items())),
    }


def fmt_fp(fp: dict) -> str:
    return (f"doubles={fp['doubles']}  gaps={fp['gap_total']}  "
            f"gap4={fp['gap4']} ({fp['gap4_share']*100:.1f}%)  "
            f"gap2={fp['gap2']} ({fp['gap2_share']*100:.1f}%)")


def four_stats(values: list[float]) -> dict[str, float]:
    """mean, median, average-min, average-max over a sample of scalar trials."""
    if not values:
        return {"mean": 0.0, "median": 0.0, "average_min": 0.0, "average_max": 0.0}
    return {
        "mean": statistics.fmean(values),
        "median": statistics.median(values),
        "average_min": min(values),
        "average_max": max(values),
    }


def fmt_four(label: str, s: dict[str, float], *, pct: bool = False) -> str:
    if pct:
        return (f"  {label}: mean={s['mean']*100:.2f}%  median={s['median']*100:.2f}%  "
                f"avg-min={s['average_min']*100:.2f}%  avg-max={s['average_max']*100:.2f}%")
    return (f"  {label}: mean={s['mean']:.2f}  median={s['median']:.2f}  "
            f"avg-min={s['average_min']:.2f}  avg-max={s['average_max']:.2f}")


def pair_hit_stats(counts: dict[tuple[str, str], int]) -> dict[str, float]:
    """mean/median/min/max across the 36 pair hit counts (one corpus)."""
    vals = [float(c) for c in counts.values()]
    return {
        "mean": statistics.fmean(vals),
        "median": statistics.median(vals),
        "average_min": min(vals),
        "average_max": max(vals),
    }


# ---- Monte Carlo vs real ----------------------------------------------------

def mc_fingerprint(
    gen,
    lengths: list[int],
    *,
    trials: int,
    seed: int,
) -> dict:
    rng = random.Random(seed)
    gap4_n: list[float] = []
    gap4_sh: list[float] = []
    gap2_sh: list[float] = []
    dbl: list[float] = []
    gap_n: list[float] = []
    for _ in range(trials):
        msgs = [gen(L, rng) for L in lengths]
        fp = corpus_fingerprint({str(i): m for i, m in enumerate(msgs)})
        gap4_n.append(float(fp["gap4"]))
        gap4_sh.append(fp["gap4_share"])
        gap2_sh.append(fp["gap2_share"])
        dbl.append(float(fp["doubles"]))
        gap_n.append(float(fp["gap_total"]))
    return {
        "gap4_count": four_stats(gap4_n),
        "gap4_share": four_stats(gap4_sh),
        "gap2_share": four_stats(gap2_sh),
        "doubles": four_stats(dbl),
        "gap_total": four_stats(gap_n),
    }


def mc_pair_hits(
    names: list[str],
    lengths: list[int],
    gen,
    *,
    trials: int,
    radius: int,
    pos_min: int,
    seed: int,
) -> dict:
    """Per trial: stats over 36 pair counts; then summarize trials with four_stats."""
    rng = random.Random(seed)
    trial_means: list[float] = []
    trial_medians: list[float] = []
    trial_mins: list[float] = []
    trial_maxs: list[float] = []
    e2e5: list[float] = []
    for _ in range(trials):
        msgs = make_corpus(names, lengths, gen, rng)
        counts = all_pair_counts(names, msgs, pos_min=pos_min, radius=radius)
        vals = [float(c) for c in counts.values()]
        trial_means.append(statistics.fmean(vals))
        trial_medians.append(statistics.median(vals))
        trial_mins.append(min(vals))
        trial_maxs.append(max(vals))
        e2e5.append(float(len(pair_offset_hits(
            msgs["East 2"], msgs["East 5"], pos_min=pos_min, radius=radius,
        ))))
    return {
        "all_pairs": {
            "mean": statistics.fmean(trial_means),
            "median": statistics.fmean(trial_medians),
            "average_min": statistics.fmean(trial_mins),
            "average_max": statistics.fmean(trial_maxs),
        },
        "e2e5_stats": four_stats(e2e5),
        "e2e5_samples": e2e5,
    }


def report_null_kind(
    kind: str,
    real_fp: dict,
    real_pair_stats: dict[str, float],
    real_e2e5: int,
    names: list[str],
    lengths: list[int],
    gen,
    *,
    trials: int,
    radius: int,
    pos_min: int,
    seed: int,
) -> None:
    fp_mc = mc_fingerprint(gen, lengths, trials=trials, seed=seed)
    hit_mc = mc_pair_hits(
        names, lengths, gen, trials=trials, radius=radius, pos_min=pos_min, seed=seed + 1,
    )

    print(f"\n--- {kind} ---")
    print(f"  fingerprint (one sample):  {fmt_fp(corpus_fingerprint(make_corpus(names, lengths, gen, random.Random(seed))))}")
    print(f"  fingerprint MC ({trials:,} trials):")
    print(fmt_four("gap4 count", fp_mc["gap4_count"]))
    print(fmt_four("gap4 share", fp_mc["gap4_share"], pct=True))
    print(fmt_four("gap2 share", fp_mc["gap2_share"], pct=True))
    print(fmt_four("doubles", fp_mc["doubles"]))
    print(fmt_four("gap events", fp_mc["gap_total"]))
    print(f"  vs real gap4 share {real_fp['gap4_share']*100:.1f}%  gap2 {real_fp['gap2_share']*100:.1f}%  doubles {real_fp['doubles']}")

    print(f"  offset pair hits all 36 (r=±{radius}):")
    print(f"    REAL  {fmt_four('pairs', real_pair_stats).strip()}")
    print(f"    NULL  {fmt_four('pairs', hit_mc['all_pairs']).strip()}")
    e2 = hit_mc["e2e5_stats"]
    print(f"  E2↔E5: real={real_e2e5}  "
          f"mean={e2['mean']:.2f} median={e2['median']:.2f} "
          f"avg-min={e2['average_min']:.2f} avg-max={e2['average_max']:.2f}  "
          f"p(≥real)={p_ge(real_e2e5, hit_mc['e2e5_samples']):.4f}")


def write_sample(path: Path, names: list[str], lengths: list[int], gap4_p: float, seed: int) -> None:
    rng = random.Random(seed)
    kinds = {
        "plain": make_corpus(names, lengths, gen_plain, rng),
        "no_doubles": make_corpus(names, lengths, gen_no_doubles, random.Random(seed + 1)),
        "gap4_spike": make_corpus(
            names, lengths,
            lambda L, r: gen_gap4_spike(L, r, p_copy=gap4_p),
            random.Random(seed + 2),
        ),
    }
    payload = {
        "description": "Synthetic uniform null corpora at eye message lengths",
        "kinds": kinds,
        "fingerprints": {k: corpus_fingerprint(v) for k, v in kinds.items()},
    }
    path.write_text(json.dumps(payload, indent=2))
    print(f"Wrote {path}")


def self_check() -> None:
    rng = random.Random(0)
    s = gen_no_doubles(200, rng)
    assert count_doubles(s) == 0
    s2 = gen_gap4_spike(50, random.Random(1), p_copy=0.5)
    assert count_doubles(s2) == 0
    assert 4 in message_gaps(s2)


def main() -> None:
    ap = argparse.ArgumentParser(description="Synthetic uniform null corpora for eye fingerprints")
    ap.add_argument("--trials", type=int, default=5000)
    ap.add_argument("--radius", type=int, default=1)
    ap.add_argument("--pos-min", type=int, default=1)
    ap.add_argument("--gap4-p", type=float, default=DEFAULT_GAP4_P, help="P(copy c[i]=c[i-4]) in gap4_spike")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--write-sample", type=str, default="", help="Write example corpora JSON to this path")
    args = ap.parse_args()

    self_check()
    names, real_msgs = load_real()
    lengths = [len(real_msgs[n]) for n in names]
    real_fp = corpus_fingerprint(real_msgs)
    real_counts = all_pair_counts(names, real_msgs, pos_min=args.pos_min, radius=args.radius)
    real_pair_stats = pair_hit_stats(real_counts)
    real_e2e5 = int(real_counts[("East 2", "East 5")])

    print("REAL eye corpus fingerprint:", fmt_fp(real_fp))
    print(fmt_four("REAL offset pair hits (36)", real_pair_stats))
    print(f"REAL E2↔E5 offset hits (r=±{args.radius}): {real_e2e5}")

    kinds = [
        ("plain i.i.d.", gen_plain),
        ("no_doubles", gen_no_doubles),
        ("gap4_spike", lambda L, rng: gen_gap4_spike(L, rng, p_copy=args.gap4_p)),
    ]
    for label, gen in kinds:
        report_null_kind(
            label, real_fp, real_pair_stats, real_e2e5, names, lengths, gen,
            trials=args.trials, radius=args.radius, pos_min=args.pos_min,
            seed=args.seed + hash(label) % 997,
        )

    if args.write_sample:
        write_sample(Path(args.write_sample), names, lengths, args.gap4_p, args.seed)


if __name__ == "__main__":
    main()
