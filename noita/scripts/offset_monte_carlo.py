#!/usr/bin/env python3
"""Monte Carlo null for the eye-messages Offset tab.

Two null families:
  1. Corpus null — 9 independent Uniform(0..82) messages at real lengths.
  2. Paired null — keep one message fixed, scramble the partner (shuffle
     multiset or fresh uniform). Tests whether a specific pair's hit count
     needs joint structure beyond marginal symbol frequencies.

Usage:
  python3 offset_monte_carlo.py                    # both nulls, r=1 & r=2
  python3 offset_monte_carlo.py --trials 20000 --radius 1
  python3 offset_monte_carlo.py --corpus-only      # skip paired section
  python3 offset_monte_carlo.py --paired-only
"""
from __future__ import annotations

import argparse
import json
import random
import re
import statistics
from collections import Counter
from pathlib import Path

N = 83
VIEWER = Path(__file__).with_name("eye-messages-isomorph-viewer.html")

FAM = {
    "East 1": "a", "West 1": "a", "East 2": "a",
    "West 2": "b", "East 3": "b", "West 3": "b",
    "East 4": "g", "West 4": "g", "East 5": "g",
}


def load_real() -> tuple[list[str], dict[str, list[int]]]:
    html = VIEWER.read_text()
    blob = re.search(r'<script id="d" type="application/json">(.*?)</script>', html, re.S)
    if not blob:
        raise SystemExit(f"no embedded JSON in {VIEWER}")
    data = json.loads(blob.group(1))
    return data["names"], data["messages"]


def identical_cover(a: list[int], b: list[int], min_len: int = 2) -> set[int]:
    covered: set[int] = set()
    m = min(len(a), len(b))
    p = 0
    while p < m:
        if a[p] != b[p]:
            p += 1
            continue
        q = p + 1
        while q < m and a[q] == b[q]:
            q += 1
        if q - p >= min_len:
            covered.update(range(p, q))
        p = q
    return covered


def pair_offset_hits(
    a: list[int], b: list[int], *, pos_min: int = 1, radius: int = 1
) -> list[tuple[int, int, int]]:
    """Return (pos_a, pos_b, off) hits — mirrors viewer pairOffsetHits."""
    covered = identical_cover(a, b)
    hits: list[tuple[int, int, int]] = []
    for i in range(pos_min, len(a)):
        val = a[i]
        for off in range(-radius, radius + 1):
            j = i + off
            if j < pos_min or j >= len(b):
                continue
            if b[j] != val:
                continue
            if off == 0 and i in covered:
                continue
            hits.append((i, j, off))
    return hits


def all_pair_counts(
    names: list[str], msgs: dict[str, list[int]], *, pos_min: int, radius: int
) -> dict[tuple[str, str], int]:
    out: dict[tuple[str, str], int] = {}
    for i, na in enumerate(names):
        for nb in names[i + 1 :]:
            out[(na, nb)] = len(pair_offset_hits(msgs[na], msgs[nb], pos_min=pos_min, radius=radius))
    return out


def uniform_corpus(lengths: list[int], rng: random.Random) -> list[list[int]]:
    return [[rng.randrange(N) for _ in range(L)] for L in lengths]


def summarize(label: str, counts: dict[tuple[str, str], int]) -> None:
    vals = list(counts.values())
    print(f"\n{label}")
    print(f"  pairs={len(vals)}  min={min(vals)}  median={statistics.median(vals):.1f}  "
          f"mean={statistics.fmean(vals):.2f}  max={max(vals)}")
    top = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:8]
    for (a, b), c in top:
        fa, fb = FAM[a], FAM[b]
        print(f"    {c:3d}  {a} ↔ {b}  ({fa}↔{fb})")


def p_ge(obs: float, samples: list[float]) -> float:
    return sum(1 for x in samples if x >= obs) / len(samples)


def four_stats(values: list[float]) -> dict[str, float]:
    if not values:
        return {"mean": 0.0, "median": 0.0, "average_min": 0.0, "average_max": 0.0}
    return {
        "mean": statistics.fmean(values),
        "median": statistics.median(values),
        "average_min": min(values),
        "average_max": max(values),
    }


def fmt_four(s: dict[str, float]) -> str:
    return (f"mean={s['mean']:.2f}  median={s['median']:.2f}  "
            f"avg-min={s['average_min']:.2f}  avg-max={s['average_max']:.2f}")


def z_score(obs: float, samples: list[float]) -> float:
    if len(samples) < 2:
        return 0.0
    mu = statistics.fmean(samples)
    sd = statistics.pstdev(samples)
    return (obs - mu) / sd if sd else 0.0


def shuffle_preserve(seq: list[int], rng: random.Random) -> list[int]:
    out = seq[:]
    rng.shuffle(out)
    return out


def uniform_seq(length: int, rng: random.Random) -> list[int]:
    return [rng.randrange(N) for _ in range(length)]


def pair_count(a: list[int], b: list[int], *, pos_min: int, radius: int) -> int:
    return len(pair_offset_hits(a, b, pos_min=pos_min, radius=radius))


def offset_mix(a: list[int], b: list[int], *, pos_min: int, radius: int) -> Counter[int]:
    return Counter(off for _, _, off in pair_offset_hits(a, b, pos_min=pos_min, radius=radius))


# ponytail: four paired nulls per (A,B) — shuffle/uniform × which side moves
PAIRED_MODES = ("shuffle_a", "shuffle_b", "uniform_a", "uniform_b")


def paired_null_samples(
    a: list[int],
    b: list[int],
    *,
    mode: str,
    trials: int,
    pos_min: int,
    radius: int,
    rng: random.Random,
) -> list[int]:
    counts: list[int] = []
    for _ in range(trials):
        if mode == "shuffle_a":
            aa = shuffle_preserve(a, rng)
            bb = b
        elif mode == "shuffle_b":
            aa = a
            bb = shuffle_preserve(b, rng)
        elif mode == "uniform_a":
            aa = uniform_seq(len(a), rng)
            bb = b
        elif mode == "uniform_b":
            aa = a
            bb = uniform_seq(len(b), rng)
        else:
            raise ValueError(mode)
        counts.append(pair_count(aa, bb, pos_min=pos_min, radius=radius))
    return counts


def run_paired_null(
    msgs: dict[str, list[int]],
    real_counts: dict[tuple[str, str], int],
    *,
    trials: int,
    radius: int,
    pos_min: int,
    seed: int,
) -> None:
    rng = random.Random(seed)
    keys = list(real_counts.keys())

    print(f"\n{'=' * 60}\nPaired null — radius ±{radius}, pos_min={pos_min}, trials={trials:,}")
    print("Per pair: keep one real message, scramble the other.")
    print("  shuffle_a/b = permute partner (preserve multiset)")
    print("  uniform_a/b = fresh Uniform(0..82) partner at same length")

    # Header
    hdr = (f"{'pair':<22} {'real':>4}  "
           f"{'shA μ':>5} {'p':>6}  {'shB μ':>5} {'p':>6}  "
           f"{'uA μ':>5} {'p':>6}  {'uB μ':>5} {'p':>6}  {'z(shA)':>6}")
    print(f"\n{hdr}")
    print("-" * len(hdr))

    rows: list[tuple[float, str, tuple[str, str], list[int]]] = []
    for a, b in keys:
        obs = real_counts[(a, b)]
        A, B = msgs[a], msgs[b]
        stats: dict[str, tuple[list[int], float, float]] = {}
        for mode in PAIRED_MODES:
            samples = paired_null_samples(
                A, B, mode=mode, trials=trials, pos_min=pos_min, radius=radius, rng=rng,
            )
            stats[mode] = (samples, statistics.fmean(samples), statistics.pstdev(samples))

        sh_a = stats["shuffle_a"][0]
        line = (f"{a} ↔ {b:<10} {obs:4d}  "
                f"{stats['shuffle_a'][1]:5.2f} {p_ge(obs, [float(x) for x in sh_a]):6.4f}  "
                f"{stats['shuffle_b'][1]:5.2f} {p_ge(obs, [float(x) for x in stats['shuffle_b'][0]]):6.4f}  "
                f"{stats['uniform_a'][1]:5.2f} {p_ge(obs, [float(x) for x in stats['uniform_a'][0]]):6.4f}  "
                f"{stats['uniform_b'][1]:5.2f} {p_ge(obs, [float(x) for x in stats['uniform_b'][0]]):6.4f}  "
                f"{z_score(obs, [float(x) for x in sh_a]):+6.2f}")
        print(line)
        rows.append((p_ge(obs, [float(x) for x in sh_a]), line, (a, b), sh_a))

    # Flag pairs significant on shuffle_a (structure in A given real B)
    alpha = 0.05
    bonf = alpha / len(keys)
    sig = []
    for p, _, (a, b), sh_a in rows:
        if p < bonf:
            sig.append((p, real_counts[(a, b)], a, b, statistics.fmean(sh_a)))
    sig.sort()

    print(f"\nPairs with structure in A given fixed B (shuffle_a, Bonferroni α={bonf:.4f}, n={len(keys)}):")
    if not sig:
        print("  none")
    else:
        for p, obs, a, b, mu in sig:
            print(f"  p={p:.4f}  {a} ↔ {b}: real={obs}  null μ={mu:.2f}")

    # Deep dive: E2↔E5 offset mix under shuffle_a null vs real
    focus = [("East 2", "East 5"), ("East 2", "East 4")]
    for a, b in focus:
        if (a, b) not in real_counts:
            continue
        obs = real_counts[(a, b)]
        A, B = msgs[a], msgs[b]
        null_off: Counter[int] = Counter()
        null_n = 0
        for _ in range(min(trials, 2000)):
            aa = shuffle_preserve(A, rng)
            for _, _, off in pair_offset_hits(aa, B, pos_min=pos_min, radius=radius):
                null_off[off] += 1
                null_n += 1
        real_off = offset_mix(A, B, pos_min=pos_min, radius=radius)
        print(f"\nOffset mix {a} ↔ {b}  (real n={sum(real_off.values())}, "
              f"shuffle_a null n={null_n}, radius ±{radius})")
        for off in range(-radius, radius + 1):
            rn = real_off.get(off, 0)
            r_pct = 100 * rn / max(1, sum(real_off.values()))
            nn = null_off.get(off, 0)
            n_pct = 100 * nn / max(1, null_n)
            print(f"  off {off:+d}: real {r_pct:5.1f}%   null {n_pct:5.1f}%")


def run_monte_carlo(
    names: list[str],
    lengths: list[int],
    real_counts: dict[tuple[str, str], int],
    *,
    trials: int,
    radius: int,
    pos_min: int,
    seed: int,
) -> None:
    rng = random.Random(seed)
    all_vals: list[list[int]] = [[] for _ in real_counts]
    max_vals: list[int] = []
    trial_means: list[float] = []
    trial_mins: list[float] = []
    trial_maxs: list[float] = []
    off_pool: Counter[int] = Counter()
    e2e5_vals: list[int] = []
    e2g_max_vals: list[int] = []

    keys = list(real_counts.keys())
    e2e5_key = ("East 2", "East 5")
    e2g_keys = [(a, b) for a, b in keys if FAM[a] == "a" and FAM[b] == "g" and a == "East 2"]

    for _ in range(trials):
        msgs_list = uniform_corpus(lengths, rng)
        msgs = dict(zip(names, msgs_list))
        counts = all_pair_counts(names, msgs, pos_min=pos_min, radius=radius)
        vals = [float(c) for c in counts.values()]
        trial_means.append(statistics.fmean(vals))
        trial_mins.append(min(vals))
        trial_maxs.append(max(vals))
        for i, k in enumerate(keys):
            all_vals[i].append(counts[k])
        max_vals.append(max(counts.values()))
        e2e5_vals.append(counts[e2e5_key])
        e2g_max_vals.append(max(counts[k] for k in e2g_keys))

        # offset distribution for E2↔E5 on a subsample (every 10th trial)
        if _ % 10 == 0:
            for _, _, off in pair_offset_hits(msgs["East 2"], msgs["East 5"], pos_min=pos_min, radius=radius):
                off_pool[off] += 1

    print(f"\n{'=' * 60}\nMonte Carlo null — radius ±{radius}, pos_min={pos_min}, trials={trials:,}")
    print("Null: 9 independent Uniform(0..82) messages at real lengths.")

    obs_max = max(real_counts.values())
    obs_e2e5 = real_counts[e2e5_key]
    obs_e2g_max = max(real_counts[k] for k in e2g_keys)

    print(f"\nMax pair hit count:")
    mx = four_stats([float(x) for x in max_vals])
    print(f"  real={obs_max}  null {fmt_four(mx)}  p(max≥real)={p_ge(obs_max, [float(x) for x in max_vals]):.4f}")

    ap = {
        "mean": statistics.fmean(trial_means),
        "median": statistics.median(trial_means),
        "average_min": statistics.fmean(trial_mins),
        "average_max": statistics.fmean(trial_maxs),
    }
    real_vals = [float(real_counts[k]) for k in keys]
    real_ap = {
        "mean": statistics.fmean(real_vals),
        "median": statistics.median(real_vals),
        "average_min": min(real_vals),
        "average_max": max(real_vals),
    }
    print(f"\nAll 36 pairs: REAL {fmt_four(real_ap)}")
    print(f"              NULL {fmt_four(ap)}")

    e2s = four_stats([float(x) for x in e2e5_vals])
    print(f"\nEast 2 ↔ East 5:")
    print(f"  real={obs_e2e5}  null {fmt_four(e2s)}  "
          f"p(≥real)={p_ge(obs_e2e5, [float(x) for x in e2e5_vals]):.4f}")

    e2g = four_stats([float(x) for x in e2g_max_vals])
    print(f"\nmax(East 2 ↔ γ) over E4/W4/E5:")
    print(f"  real={obs_e2g_max}  null {fmt_four(e2g)}  "
          f"p(≥real)={p_ge(obs_e2g_max, [float(x) for x in e2g_max_vals]):.4f}")

    print("\nReal vs null for pairs that spike in the viewer (radius ±{}):".format(radius))
    interesting = [
        ("East 2", "East 5"),
        ("East 2", "East 4"),
        ("East 2", "West 4"),
        ("East 2", "West 3"),
        ("West 4", "East 5"),
    ]
    for key in interesting:
        if key not in real_counts:
            continue
        obs = real_counts[key]
        samples = [float(x) for x in all_vals[keys.index(key)]]
        ns = four_stats(samples)
        print(f"  {key[0]} ↔ {key[1]}: real={obs:2d}  null {fmt_four(ns)}  "
              f"p(≥)={p_ge(obs, samples):.4f}")

    if off_pool:
        total = sum(off_pool.values())
        print(f"\nNull offset mix (E2↔E5 subsample, n={total}):")
        for off in sorted(off_pool):
            print(f"  off {off:+d}: {off_pool[off]/total*100:5.1f}%")

    # Real E2↔E5 offset mix
    _, real_msg = load_real()
    roff = Counter(off for _, _, off in pair_offset_hits(real_msg["East 2"], real_msg["East 5"], pos_min=pos_min, radius=radius))
    rtot = sum(roff.values()) or 1
    print(f"\nReal offset mix (E2↔E5, n={rtot}):")
    for off in sorted(roff):
        print(f"  off {off:+d}: {roff[off]/rtot*100:5.1f}%")


def self_check() -> None:
    a = [0, 1, 2, 2, 3]
    b = [9, 1, 2, 2, 4]
    hits = pair_offset_hits(a, b, pos_min=1, radius=1)
    # i=2 val=2: off=0 skipped (identical run); off=+1 -> B[3]=2
    # i=3 val=2: off=-1 -> B[2]=2
    assert hits == [(2, 3, 1), (3, 2, -1)], hits
    assert identical_cover(a, b) == {1, 2, 3}


def main() -> None:
    ap = argparse.ArgumentParser(description="Monte Carlo null for Offset-tab windowed hits")
    ap.add_argument("--trials", type=int, default=5000)
    ap.add_argument("--radius", type=int, action="append", dest="radii", default=[1, 2])
    ap.add_argument("--pos-min", type=int, default=1)
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--corpus-only", action="store_true", help="skip paired null section")
    ap.add_argument("--paired-only", action="store_true", help="skip full-corpus null section")
    args = ap.parse_args()

    self_check()
    names, msgs = load_real()
    lengths = [len(msgs[n]) for n in names]

    print("Eye corpus lengths:", dict(zip(names, lengths)))
    for radius in args.radii:
        real = all_pair_counts(names, msgs, pos_min=args.pos_min, radius=radius)
        summarize(f"REAL corpus (radius ±{radius})", real)
        if not args.paired_only:
            run_monte_carlo(
                names, lengths, real,
                trials=args.trials, radius=radius, pos_min=args.pos_min, seed=args.seed + radius,
            )
        if not args.corpus_only:
            run_paired_null(
                msgs, real,
                trials=args.trials, radius=radius, pos_min=args.pos_min, seed=args.seed + 1000 + radius,
            )


if __name__ == "__main__":
    main()
