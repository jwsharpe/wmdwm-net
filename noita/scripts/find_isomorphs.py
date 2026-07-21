#!/usr/bin/env python3
"""Find several isomorph flavours in the Eye Messages corpus.

Types
-----
  perfect    — matching CT repeat skeletons (equality partition / prev-distance)
  arithmetic — B ≡ A + δ (mod 83), δ ≠ 0
  affine     — B ≡ α·A + β (mod 83), α ∉ {0,1,82}  (1=arith, 82=reflect)
  reflect    — B ≡ β − A (mod 83)
  lag        — lag-k consecutive differences match (default k=4); skips pure arithmetic
  comp       — perfect skeleton on one trigram plane (v//5^p)%5, p∈{0,1,2}
  rank       — matching weak-order signature (counts of previous </>/= )
  deltasig   — same multiset of consecutive deltas, but NOT arithmetic
  imperfect  — skeleton match with 1..max_mm prev-distance mismatches;
               never ends on a gap (gap→wildcard trail is kept)

Compact output (default)
------------------------
Single-line JSON, message indices instead of names, row tuples:

  {"n":[...names...],"iso":{"perfect":[[ai,bi,i,j,len,links],...], ...}}

  affine     [ai,bi,i,j,len,alpha,beta]
  reflect    [ai,bi,i,j,len,beta]
  lag        [k,ai,bi,i,j,len]
  comp       [plane,ai,bi,i,j,len,links]
  rank       [ai,bi,i,j,len]
  deltasig   [ai,bi,i,j,len]
  imperfect  [ai,bi,i,j,len,links,mm]

Paste that one line into chat / splice into the viewer. Counts go to stderr.

Usage
-----
  python3 find_isomorphs.py                  # all types, compact stdout
  python3 find_isomorphs.py --types affine,reflect,lag
  python3 find_isomorphs.py --out pack.json
  python3 find_isomorphs.py --pretty         # verbose objects (token-heavy)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

MOD = 83
HTML = Path(__file__).with_name("eye-messages-isomorph-viewer.html")
ALL_TYPES = (
    "perfect", "arithmetic", "affine", "reflect", "lag",
    "comp", "rank", "deltasig", "imperfect",
)


def load_corpus():
    text = HTML.read_text(encoding="utf-8")
    m = re.search(r'<script id="d"[^>]*>(.*?)</script>', text, re.S)
    if not m:
        sys.exit('could not find <script id="d"> block in the HTML')
    data = json.loads(m.group(1))
    names = data["names"]
    msgs = {n: data["messages"][n] for n in names}
    return names, msgs


def inv(x: int) -> int:
    return pow(x % MOD, MOD - 2, MOD)


def drop_contained(rows: list[dict]) -> list[dict]:
    kept = []
    for r in rows:
        contained = False
        for t in rows:
            if t is r or t["a"] != r["a"] or t["b"] != r["b"]:
                continue
            if (r["i"] - t["i"]) != (r["j"] - t["j"]):
                continue
            if (t["i"] <= r["i"] and t["i"] + t["len"] >= r["i"] + r["len"]
                    and t["len"] > r["len"]):
                contained = True
                break
        if not contained:
            kept.append(r)
    return kept


def dedupe(rows: list[dict]) -> list[dict]:
    seen = {}
    for r in rows:
        seen[r["id"]] = r
    return sorted(seen.values(), key=lambda r: (-r["len"], r["a"], r["b"], r["i"]))


def pair_starts(names, msgs):
    """Yield (na, A, nb, B, i, j) over unique unordered message pairs + starts."""
    seqs = [(n, msgs[n]) for n in names]
    for ai in range(len(seqs)):
        na, A = seqs[ai]
        for bi in range(ai, len(seqs)):
            nb, B = seqs[bi]
            same = ai == bi
            la, lb = len(A), len(B)
            for i in range(la):
                for j in range(lb):
                    if same and j <= i:
                        continue
                    yield na, A, nb, B, i, j


# ---- perfect / imperfect skeletons -----------------------------------------

def max_iso_len(A, i, B, j, max_mm=0):
    """Extend while prev-distance matches; allow up to max_mm mismatches.

    Returns (L, links, mm). A mismatch (gap) is a position where the two
    windows' prev-distance disagree. Positions with da == db == 0 are
    wildcards (first sighting of that value on both sides).
    """
    la, lb = len(A), len(B)
    lastA, lastB = {}, {}
    links = mm = L = 0
    # per-offset kind: 'gap' | 'link' | 'wild' — used to trim trailing gaps
    kinds = []
    while i + L < la and j + L < lb:
        va, vb = A[i + L], B[j + L]
        da = L - lastA[va] if va in lastA else 0
        db = L - lastB[vb] if vb in lastB else 0
        if da != db:
            if mm + 1 > max_mm:
                break
            mm += 1
            kinds.append("gap")
        elif da > 0:
            links += 1
            kinds.append("link")
        else:
            kinds.append("wild")
        lastA[va] = L
        lastB[vb] = L
        L += 1
    return L, links, mm, kinds


def trim_trailing_gaps(L, links, mm, kinds):
    """Never end an imperfect isomorph on a gap.

    Gaps mid-window (including gap → wildcard trail) are fine; only strip
    trailing gaps so the last kept offset is a link or wildcard.
    """
    while L > 0 and kinds[L - 1] == "gap":
        L -= 1
        mm -= 1
        kinds.pop()
    # links unchanged: gaps are never links
    return L, links, mm


def perfect_isomorphs(names, msgs, min_len, min_links):
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        L, links, _, _ = max_iso_len(A, i, B, j, 0)
        if L < min_len or links < min_links:
            continue
        out.append({
            "id": f"perf|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j, "len": L, "links": links,
        })
    return dedupe(drop_contained(out))


def imperfect_isomorphs(names, msgs, min_len, min_links, max_mm):
    """Near-perfect skeletons. Must contain ≥1 gap, and must not end on a gap."""
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        L, links, mm, kinds = max_iso_len(A, i, B, j, max_mm)
        L, links, mm = trim_trailing_gaps(L, links, mm, kinds)
        if mm < 1 or L < min_len or links < min_links:
            continue
        out.append({
            "id": f"imp|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j,
            "len": L, "links": links, "mm": mm,
        })
    return dedupe(drop_contained(out))


def _selfcheck_trim():
    """Sanity: trailing gap stripped; gap→wild kept."""
    L, links, mm = trim_trailing_gaps(4, 2, 2, ["link", "wild", "gap", "gap"])
    assert (L, links, mm) == (2, 2, 0)
    L, links, mm = trim_trailing_gaps(5, 2, 1, ["link", "gap", "wild", "wild", "link"])
    assert (L, links, mm) == (5, 2, 1)
    L, links, mm = trim_trailing_gaps(4, 1, 1, ["link", "gap", "wild", "wild"])
    assert (L, links, mm) == (4, 1, 1)


# ---- arithmetic / reflect / affine -----------------------------------------

def is_const_offset(A, i, B, j, L, delta):
    return all((B[j + t] - A[i + t]) % MOD == delta for t in range(L))


def arithmetic_isomorphs(names, msgs, min_len):
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        delta = (B[j] - A[i]) % MOD
        if delta == 0:
            continue
        if i > 0 and j > 0 and (B[j - 1] - A[i - 1]) % MOD == delta:
            continue
        L = 1
        la, lb = len(A), len(B)
        while i + L < la and j + L < lb and (B[j + L] - A[i + L]) % MOD == delta:
            L += 1
        if L < min_len:
            continue
        out.append({
            "id": f"arith|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j, "len": L, "delta": delta,
        })
    return dedupe(drop_contained(out))


def reflect_isomorphs(names, msgs, min_len):
    """B ≡ β − A (mod 83)."""
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        beta = (A[i] + B[j]) % MOD
        if i > 0 and j > 0 and (beta - A[i - 1]) % MOD == B[j - 1]:
            continue
        L = 1
        la, lb = len(A), len(B)
        while i + L < la and j + L < lb and (beta - A[i + L]) % MOD == B[j + L]:
            L += 1
        if L < min_len:
            continue
        out.append({
            "id": f"refl|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j, "len": L, "beta": beta,
        })
    return dedupe(drop_contained(out))


def affine_isomorphs(names, msgs, min_len):
    """B ≡ α·A + β, α ∉ {0,1,82}."""
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        la, lb = len(A), len(B)
        t = 0
        while (i + t < la and j + t < lb
               and A[i + t] == A[i] and B[j + t] == B[j]):
            t += 1
        if i + t >= la or j + t >= lb:
            continue
        if A[i + t] == A[i]:
            continue
        dA = (A[i] - A[i + t]) % MOD
        dB = (B[j] - B[j + t]) % MOD
        alpha = (dB * inv(dA)) % MOD
        if alpha in (0, 1, MOD - 1):
            continue
        beta = (B[j] - alpha * A[i]) % MOD
        if any((alpha * A[i + s] + beta) % MOD != B[j + s] for s in range(t)):
            continue
        if i > 0 and j > 0 and (alpha * A[i - 1] + beta) % MOD == B[j - 1]:
            continue
        L = t + 1
        while (i + L < la and j + L < lb
               and (alpha * A[i + L] + beta) % MOD == B[j + L]):
            L += 1
        if L < min_len:
            continue
        out.append({
            "id": f"aff|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j,
            "len": L, "alpha": alpha, "beta": beta,
        })
    return dedupe(drop_contained(out))


# ---- lag-k differences -----------------------------------------------------

def lag_isomorphs(names, msgs, min_len, ks):
    out = []
    for k in ks:
        need = max(min_len, k + 1)
        for na, A, nb, B, i, j in pair_starts(names, msgs):
            la, lb = len(A), len(B)
            if i + need > la or j + need > lb:
                continue
            L = k + 1
            ok = True
            for t in range(L - k):
                if ((A[i + t + k] - A[i + t]) % MOD
                        != (B[j + t + k] - B[j + t]) % MOD):
                    ok = False
                    break
            if not ok:
                continue
            while i + L < la and j + L < lb:
                t = L - k
                if ((A[i + t + k] - A[i + t]) % MOD
                        != (B[j + t + k] - B[j + t]) % MOD):
                    break
                L += 1
            if L < need:
                continue
            delta = (B[j] - A[i]) % MOD
            if delta != 0 and is_const_offset(A, i, B, j, L, delta):
                continue
            out.append({
                "id": f"lag{k}|{na}|{nb}|{i}|{j}",
                "a": na, "b": nb, "i": i, "j": j, "len": L, "k": k,
            })
    return dedupe(drop_contained(out))


# ---- component (trigram plane) ---------------------------------------------

def plane_seq(seq, plane):
    div = 5 ** plane
    return [(v // div) % 5 for v in seq]


def comp_isomorphs(names, msgs, min_len, min_links):
    out = []
    planes = {n: [plane_seq(msgs[n], p) for p in range(3)] for n in names}
    for p in range(3):
        projected = {n: planes[n][p] for n in names}
        for na, A, nb, B, i, j in pair_starts(names, projected):
            L, links, _, _ = max_iso_len(A, i, B, j, 0)
            if L < min_len or links < min_links:
                continue
            out.append({
                "id": f"comp{p}|{na}|{nb}|{i}|{j}",
                "a": na, "b": nb, "i": i, "j": j,
                "len": L, "links": links, "plane": p,
            })
    return dedupe(drop_contained(out))


# ---- rank (weak order) -----------------------------------------------------

def max_rank_len(A, i, B, j):
    la, lb = len(A), len(B)
    L = 0
    while i + L < la and j + L < lb:
        ra = sum(1 for t in range(L) if A[i + t] < A[i + L])
        rb = sum(1 for t in range(L) if B[j + t] < B[j + L])
        ea = sum(1 for t in range(L) if A[i + t] == A[i + L])
        eb = sum(1 for t in range(L) if B[j + t] == B[j + L])
        if ra != rb or ea != eb:
            break
        L += 1
    return L


def rank_isomorphs(names, msgs, min_len):
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        L = max_rank_len(A, i, B, j)
        if L < min_len:
            continue
        if A[i:i + L] == B[j:j + L]:
            continue
        out.append({
            "id": f"rank|{na}|{nb}|{i}|{j}",
            "a": na, "b": nb, "i": i, "j": j, "len": L,
        })
    return dedupe(drop_contained(out))


# ---- delta signature (multiset, non-arithmetic) ----------------------------

def delta_counter(seq, i, L):
    c = Counter()
    for t in range(L - 1):
        c[(seq[i + t + 1] - seq[i + t]) % MOD] += 1
    return c


def deltasig_isomorphs(names, msgs, min_len):
    out = []
    for na, A, nb, B, i, j in pair_starts(names, msgs):
        la, lb = len(A), len(B)
        L = min(la - i, lb - j)
        while L >= min_len:
            if delta_counter(A, i, L) == delta_counter(B, j, L):
                delta = (B[j] - A[i]) % MOD
                if delta == 0 or not is_const_offset(A, i, B, j, L, delta):
                    out.append({
                        "id": f"dsig|{na}|{nb}|{i}|{j}",
                        "a": na, "b": nb, "i": i, "j": j, "len": L,
                    })
                break
            L -= 1
    return dedupe(drop_contained(out))


# ---- packing ---------------------------------------------------------------

PACK_EXTRAS = {
    "perfect": ["links"],
    "arithmetic": ["delta"],
    "affine": ["alpha", "beta"],
    "reflect": ["beta"],
    "lag": ["k"],
    "comp": ["plane", "links"],
    "rank": [],
    "deltasig": [],
    "imperfect": ["links", "mm"],
}


def pack(names, buckets: dict) -> dict:
    idx = {n: i for i, n in enumerate(names)}
    iso = {}
    for kind, rows in buckets.items():
        extras = PACK_EXTRAS[kind]
        tuples = []
        for r in rows:
            if kind == "lag":
                tup = [r["k"], idx[r["a"]], idx[r["b"]], r["i"], r["j"], r["len"]]
            elif kind == "comp":
                tup = [r["plane"], idx[r["a"]], idx[r["b"]], r["i"], r["j"],
                       r["len"], r["links"]]
            else:
                tup = [idx[r["a"]], idx[r["b"]], r["i"], r["j"], r["len"]]
                for k in extras:
                    tup.append(r[k])
            tuples.append(tup)
        iso[kind] = tuples
    return {"n": names, "iso": iso}


def unpack_pretty(pack: dict) -> dict:
    names = pack["n"]
    out = {}
    for kind, rows in pack["iso"].items():
        objs = []
        for t in rows:
            if kind == "lag":
                k, ai, bi, i, j, L = t
                objs.append({"a": names[ai], "b": names[bi], "i": i, "j": j,
                             "len": L, "k": k})
            elif kind == "comp":
                p, ai, bi, i, j, L, links = t
                objs.append({"a": names[ai], "b": names[bi], "i": i, "j": j,
                             "len": L, "plane": p, "links": links})
            else:
                ai, bi, i, j, L = t[:5]
                obj = {"a": names[ai], "b": names[bi], "i": i, "j": j, "len": L}
                for key, val in zip(PACK_EXTRAS[kind], t[5:]):
                    obj[key] = val
                objs.append(obj)
        out[kind] = objs
    return out


def main():
    ap = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument("--types", default=",".join(ALL_TYPES),
                    help=f"comma list from {','.join(ALL_TYPES)}")
    ap.add_argument("--min-len", type=int, default=4)
    ap.add_argument("--min-links", type=int, default=2)
    ap.add_argument("--arith-min-len", type=int, default=4)
    ap.add_argument("--max-mm", type=int, default=3,
                    help="max skeleton mismatches for imperfect")
    ap.add_argument("--lags", default="4", help="comma list of lag-k values")
    ap.add_argument("--pretty", action="store_true",
                    help="verbose JSON (token-heavy)")
    ap.add_argument("--out", type=Path, help="also write JSON to this file")
    args = ap.parse_args()

    want = {t.strip() for t in args.types.split(",") if t.strip()}
    unknown = want - set(ALL_TYPES)
    if unknown:
        sys.exit(f"unknown types: {unknown}")
    lags = [int(x) for x in args.lags.split(",") if x.strip()]

    names, msgs = load_corpus()
    _selfcheck_trim()
    buckets = {}

    if "perfect" in want:
        buckets["perfect"] = perfect_isomorphs(
            names, msgs, args.min_len, args.min_links)
    if "arithmetic" in want:
        buckets["arithmetic"] = arithmetic_isomorphs(
            names, msgs, args.arith_min_len)
    if "affine" in want:
        buckets["affine"] = affine_isomorphs(names, msgs, args.min_len)
    if "reflect" in want:
        buckets["reflect"] = reflect_isomorphs(names, msgs, args.min_len)
    if "lag" in want:
        buckets["lag"] = lag_isomorphs(names, msgs, args.min_len, lags)
    if "comp" in want:
        buckets["comp"] = comp_isomorphs(
            names, msgs, args.min_len, args.min_links)
    if "rank" in want:
        buckets["rank"] = rank_isomorphs(names, msgs, args.min_len)
    if "deltasig" in want:
        buckets["deltasig"] = deltasig_isomorphs(names, msgs, args.min_len)
    if "imperfect" in want:
        buckets["imperfect"] = imperfect_isomorphs(
            names, msgs, args.min_len, args.min_links, args.max_mm)

    packed = pack(names, buckets)
    payload = unpack_pretty(packed) if args.pretty else packed
    text = json.dumps(payload, indent=2 if args.pretty else None,
                      separators=(",", ":"))

    print(text)
    if args.out:
        args.out.write_text(text + "\n", encoding="utf-8")
        print(f"# wrote {args.out} ({len(text)} bytes)", file=sys.stderr)

    parts = [f"{k}:{len(v)}" for k, v in buckets.items()]
    print("# " + "  ".join(parts), file=sys.stderr)
    print(f"# compact bytes: {len(json.dumps(packed, separators=(',',':')))}",
          file=sys.stderr)


if __name__ == "__main__":
    main()
