I'm working on the Noita "Eye Messages" cipher. Below is the full community briefing
document and the raw ciphertext data.

===== COMMUNITY BRIEFING (Agents.md) =====

Agents.md — Noita Eye Messages: State of the Cryptanalysis

**Purpose.** A shared, source-credited briefing for AI/LLM agents working the Noita
"Eye Messages" puzzle. It records **what is established**, **what has been ruled out**,
and **where the community expects the solution to lie** — deliberately *not* a
methods/how-to guide. Treat every claim below as attributable to the Source Register at
the end; where sources disagree or a claim is contested, it is marked.

**Scope note for agents.** Do not re-litigate settled eliminations from first principles
unless you have a *calibrated* reason (see the caution in §2). Several plausible-looking
tests on this corpus are **vacuous or gauge-dependent** and have burned prior effort;
the eliminations here that carry proofs or Monte-Carlo calibration should be treated as
load-bearing.

---

## 1. The artifact

- **Nine ciphertext messages** — labelled East 1–5 and West 1–4 (canonical order: E1,
  W1, E2, W2, E3, W3, E4, W4, E5), **1,036 glyphs** total.
- Each glyph is a **trigram** of eye-marks over a base-5 position alphabet
  (Center/Up/Right/Down/Left = 0–4), so 5³ = 125 possible trigrams. **Exactly 83 distinct
  trigrams appear**, and under the correct reading order their numeric values form the
  **unbroken set 0–82** (the 42 absent trigrams are the contiguous tail 83–124).
- **Author:** Petri Purho / Nolla Games (Noita). The messages are in-game data.
- The 83-symbol alphabet size is **prime**, which — as §5 explains — is the single most
  consequential structural fact.

---

## 2. Established facts (high confidence)

- **The 0–82 set is real, not coincidental.** The probability of 83 randomized values
  landing as a complete unbroken 0–82 set is astronomically small (community analogy:
  picking the same grain of sand out of all sand on Earth ~11 times running). This
  confirms the trigram/base-5 reading. *(Noita Wiki; Toboter)*
- **The reading order is narrowed to six.** Six symmetric reading orders each yield a
  0–82 set; **one of them is correct**, and the working "0–82" order is one of the six.
  Toboter's script tested ~86,000 reading-order permutations and found no other order
  matching the statistical significance of the ones producing the unbroken set.
- **Perfect isomorphism.** Repeated plaintext produces matching gap patterns
  that recur across messages. This is the defining
  observable and the backbone of every serious model. *(Lymm; codewarrior0)*
- **No doubles.** The same trigram never appears twice in a row in any message. *(Lymm;
  aggregators)*
- **Flat frequency.** Over a long enough stretch the ciphertext frequency distribution
  is even. *(Lymm)*
- **One key across all nine messages.** Isomorphs span different messages, indicating the
  cipher/key is consistent across the whole corpus (not nine independent keys). *(Lymm;
  codewarrior0)*
- **Shared sections / refrains.** Some messages share passages; a documented sub-pattern
  is that letters appearing in shared sections do not appear in those messages' earlier
  non-shared sections — floated as evidence the key "changes," but treated as a *hasty*
  inference by others. *(u/vollmondum; contested)*
- **The classical chaining attack fails on the eyes.** After Lymm found the isomorphs and
  codewarrior0 identified them and applied the old "alphabet chaining" attack, **the
  attack did not work and no one could fully explain why** — the leading explanations
  being that the cipher does not produce perfect isomorphs *every* time, or that
  plaintext/ciphertext is perturbed without diverting the cipher state much. This failure
  is central and is what pushed the model toward hidden-state ciphers (§5). *(Lymm;
  codewarrior0; Discord/Steam discussion)*
- **A distance-4 signal exists** but is read as the generic autokey/progressive
  distance-4 coincidence, **not** a fractionation period. *(community; consistent with the
  dynamic/autokey family)*

> **Calibration caution.** Independent re-derivation this cycle found that several
> "consistency" tests on this corpus are **vacuous** — e.g. column-aligned chaining
> transitivity, and a free-per-pair-offset consistency check both pass for the true
> cipher, for ciphertext-feedback ciphers, *and* for shuffled noise. Likewise,
> **any test evaluated in raw trigram-value order is gauge-dependent** (the true cipher
> operates in the order of an unknown mixed alphabet, so raw additive/affine "signatures"
> neither confirm nor exclude a group class). Calibrate against a planted control before
> trusting a verdict.

---

## 3. What has been ruled out

Ordered roughly strongest → most specific. Attribution in the Source Register.

- **Simple substitution** — incompatible with the cross-message isomorphs + flat
  frequency. *(Lymm; codewarrior0)*
- **Periodic polyalphabetic / Vigenère** — no period is present; sits below the surviving
  class in the hierarchy. *(Lymm)*
- **Ciphertext-Autokey (CTAK), i.e. the cyclic case** — ruled out by **chaining
  conflicts**. *(Lymm)*
- **GCTAK (group ciphertext-autokey)** — ruled out because **83 is prime**: a bijective
  readout forces |group| = 83, and the only group of order 83 is cyclic, collapsing GCTAK
  to the already-dead cyclic case. *(Lymm)*
- **Cyclic-group GAK and Dihedral-group GAK** — both ruled out; the dihedral case has an
  explicit disproof ("Proof that the eyes cannot be a dihedral GAK cipher"). *(Lymm)*
- **Fractionation / Trifid / digit-level ciphers** — disfavored: the structure is
  **glyph-level, not digit-level**, and the per-eye sub-streams carry no period; the
  distance-4 anomaly is an autokey coincidence, not a fractionation period. *(community)*
- **Polynomial-with-modulo** — reported **Failure**. *(Dykoine)*
- **Odd/even positional frequency split** — **debunked** via Monte Carlo (p ≈ 0.539, ~13k
  trials); with ~6 samples per bin the apparent variation is noise. *(u/Alien-Fox-4,
  debunked)*
- **Naïve "add the mod-5 numbers" arithmetic** — the C=0/U=1/R=2/D=3/L=4 attribution is
  **not a group structure**, so treating trigrams as additively combinable mod 5 is
  ill-founded without first imposing a real operation. *(ChrisMzz)*
- **Two-juxtaposed-wheels with rotate-only updates** — this is exactly the **commutative
  (cyclic) mechanism**, and therefore falls with the cyclic case. Non-commutative "wheel"
  updates are a different animal (see §5). *(community/Steam; follows from Lymm)*

**Not ruled out (do not treat as dead):** the **affine / AGL** family and the general
symmetric/alternating deck. A raw-order "additive accumulator, affine excluded" argument
has been advanced but is **gauge-dependent** (see §2 caution) and is **not** part of the
community consensus; affine-class GAK remains live per Lymm's classification.

[NOTE: in a follow-up analysis pass, the affine subgroups AGL(1,83) and C83⋊C41 WERE
subsequently ruled out by the person briefing you -- treat only A83 and S83 as live.
See the "additional established facts" section below.]

---

## 4. Cipher-model taxonomy the community uses

All isomorph-producing ciphers form a strict hierarchy:
Simple sub  <  Vigenère  <  CTAK  <  GCTAK  <  GAK  <  (XGAK)   [all "perfectly isomorphic" from GAK up]
- **GAK (Group Autokey)** — an internal **state group** `G` with a **non-normal hidden
  subgroup** `H`; plaintext maps to group elements, the state updates by group
  multiplication, and the ciphertext is the **coset** of the state (`|C| = |G|/|H|`). The
  hidden subgroup gives the cipher a **hidden state** the ciphertext never fully reveals —
  which is the leading explanation for why alphabet chaining fails. A **deck cipher** is
  the general, practical realization (every group is a permutation group). *(Lymm)*
- **XGAK (Extended GAK)** — a further extension that is *still perfectly isomorphic*;
  Lymm's position is that plain GAK likely already covers the eyes' properties, so XGAK
  may be unnecessary. *(Lymm)* — **Note:** any construction that feeds prior *ciphertext
  values* additively into the key is a different, isomorphism-breaking object and is
  **excluded** (it would collapse long-isomorph counts to near zero, which the corpus
  contradicts); it should not be conflated with Lymm's XGAK.

---

## 5. Where the community expects the solution to lie

- **The cipher is at least GAK-class** — a group-autokey / hidden-state **deck cipher**
  with perfect isomorphism. This is the consensus frame. *(Lymm; codewarrior0)*
- **The state group is one of exactly six transitive permutation groups on 83 symbols**
  (a consequence of 83 being prime). They are: the cyclic `C₈₃`, the dihedral `D₈₃`, the
  Frobenius `C₈₃⋊C₄₁`, the affine `AGL(1,83) = C₈₃⋊C₈₂`, the alternating `A₈₃`, and the
  symmetric `S₈₃`. **Cyclic and dihedral are ruled out (§3); four survive** [UPDATE: now
  only two survive, A83 and S83 -- see note above].
- **The consensus *expectation* is `S₈₃`** (an arbitrary deck shuffle per letter) — but
  `S₈₃` and `A₈₃` each contain ~10¹²³ permutations and are **computationally
  intractable**; a full-symmetric deck leaves a hidden state of ~82! arrangements per
  step, so a crib pins the visible sequence but not the hidden deck. *(aggregators; Lymm)*
- **Plaintext is expected to be natural language** — **Finnish** (Petri Purho is Finnish)
  and/or English, with lore-related content. *(community expectation; Pyry's demonstrations
  used natural-language plaintext)*
- **Per-family language (working assumption, by canonical-order triad; families per the
  isomorph viewer):** **α = family 1 = E1·W1·E2 is likely English**; **β = family 2 =
  W2·E3·W3 is likely Finnish**; **γ = family 3 = E4·W4·E5 is unknown and needs more
  testing.** Working premise for choosing cribs, not an established fact.

---

## 6. The central bottleneck (what actually blocks a read)

Every serious path converges on the same wall: **recovering the glyph→plaintext mapping
(the "mixed alphabet" C).**

- Ciphertext-only structure does **not** bootstrap past it. Alphabet chaining fails (§2);
  consistency-style filters are abundant and weakly discriminating; and under an unknown
  alphabet, raw-order statistics are gauge-blind (§2 caution). The *only* real
  discriminator is **cascade-into-readable-plaintext**, which requires C.
- Because of the hidden-state structure, even knowing the cipher *class* leaves the
  alphabet and the specific group/shuffle unrecovered.
- The community's expectation is therefore that the break comes from **external
  anchoring**: cribs (guessed plaintext — **English** cribs for family α / 1 and **Finnish**
  lore phrases for family β / 2 per the per-family working assumption above; family γ / 3
  language is undetermined, both
  anchored at shared sections/refrains where constraints stack across messages), a
  recovered cipher mechanism, or an in-game/decompilation anchor. *(synthesis of Lymm;
  codewarrior0; Toboter; Dykoine)*

===== END BRIEFING =====

===== ADDITIONAL ESTABLISHED FACTS (from a follow-up ciphertext-only analysis pass,
not yet in the community wiki) =====

- The affine subgroups AGL(1,83) and C83⋊C41 have been ruled out. Only A83 and S83
  remain live -- i.e. there is no small hidden state left to search; the open question
  is the per-letter UPDATE RULE (a local move on a full 83-element deck), not which
  group.
- All nine messages open with the identical two glyphs (values 66, 5) despite having
  nine distinct values in position 0 -- meaning position 0 is a serial/label OUTSIDE
  the autokey chain (if it fed the state, universal identical output afterward would
  be ~83^-8 by chance). All nine messages therefore share ONE unknown initial deck/state.
- Measured, calibrated fingerprints any candidate mechanism must reproduce simultaneously:
  1. No symbol is ever adjacent to itself, in any message, zero exceptions (this is
     stronger than "no doubles" being merely typical -- it is absolute across all 1,036
     glyphs).
  2. Gap between repeats of the same symbol, pooled corpus-wide, calibrated against
     400 no-doubles-preserving shuffles: gap-2 is suppressed (z ≈ -2.0), gap-4 is
     sharply elevated (z ≈ +4.4). This survives deduplicating every known shared/
     identical passage in the corpus (z ≈ +3.2 on unique content only, ruling out
     "it's just the refrains double-counting"). No symbol ever forms a chain at
     i, i+4, i+8 (checked directly across the whole corpus: zero found) -- so the
     effect is strictly pairwise, not periodic.
  3. Several short "patches" exist within otherwise shift-aligned message pairs: a
     run of 3-4 glyphs where ciphertext differs, bracketed on both sides by long runs
     (13-22+ glyphs) of LITERALLY IDENTICAL ciphertext. Run-length geometry in these
     zones rules out a memoryless per-glyph coin (match runs far longer than a fair
     coin at the observed agreement rate would produce). This is consistent with a
     local, small-footprint encoder disturbance that mostly does not propagate, rather
     than a full state re-key -- though note ciphertext-value feedback into the state
     is separately excluded (a differing patch never prevents identity from resuming
     immediately after it).
  4. One specific pair of messages (call them message X and message Y in your own
     re-derivation if you re-index; in the source corpus these are "West 4" and
     "East 5") shows an aligned-identity rate in their mutually UNRELATED/diverged text
     of roughly 5-6x the 1/83 chance baseline. This was checked against: (a) a
     Bonferroni-corrected significance threshold across all 36 message-pair
     comparisons -- it is the only pair that survives; (b) a simulated null
     distribution of the MAXIMUM rate across 36 shuffled-corpus pairs (300 trials) --
     the observed rate still sits at p ≈ 0.007 against that stricter null; (c) exclusion
     of header-adjacent positions (first ~40 glyphs of each message) where most other
     "excess" in the corpus turned out to be explainable bleed -- this pair's excess
     does NOT go away when header positions are excluded (if anything it goes up
     slightly). This is a real, narrow, currently unexplained residual correlation
     between exactly these two messages and no others.
- A broader "echo excess" (elevated aligned-identity in supposedly-diverged text,
  pooled across ALL message pairs) initially looked significant (~1.65x baseline,
  p ~ 5x10^-5) but was fully explained away once banded by position: the entire
  excess concentrated in the first ~40 positions (shared/near-shared header content
  that a blunt "diverged" detector had mislabeled), and positions past 40 sat at or
  below the 1.2% chance rate with no residual. Treat this broader claim as debunked;
  only the West-4/East-5-specific finding above survived scrutiny.

===== END ADDITIONAL FACTS =====

===== RAW CIPHERTEXT DATA (9 messages, values 0-82) =====

East 1: 50 66 5 48 62 13 75 29 24 61 42 70 66 62 32 14 81 8 15 78 2 29 13 49 1 80 82 40 63 81 21 19 0 40 51 65 26 14 21 70 47 44 48 42 19 48 13 47 19 49 72 31 5 24 3 43 59 67 33 49 41 60 21 26 30 5 25 20 71 11 74 56 4 74 19 71 4 51 41 43 80 72 54 63 79 81 15 16 44 31 30 12 33 57 28 13 64 43 48

West 1: 80 66 5 48 62 13 75 29 24 61 42 70 66 62 32 14 81 8 15 78 2 29 13 49 1 29 11 30 52 81 21 19 0 25 26 54 20 14 21 70 47 44 48 42 19 48 13 47 19 49 44 26 59 77 64 43 79 28 72 64 1 30 73 23 67 6 33 25 64 81 68 46 17 36 13 17 21 68 13 9 46 67 57 34 62 82 15 10 73 62 2 11 65 72 37 44 10 43 68 62 9 34 18

East 2: 36 66 5 48 62 13 75 29 24 61 42 70 66 62 32 14 81 8 15 78 2 29 13 49 1 69 76 52 9 48 66 80 22 64 57 40 49 78 3 16 56 19 47 40 80 6 13 64 29 49 64 63 6 49 31 13 16 10 45 24 26 77 10 60 81 61 34 54 70 21 15 4 66 77 42 37 30 22 0 11 41 72 57 20 23 57 65 41 23 18 72 42 5 3 26 78 8 5 54 45 77 25 64 61 16 44 54 51 20 63 25 11 26 45 53 60 38 34

West 2: 76 66 5 49 75 54 69 46 32 1 42 60 26 48 50 80 32 24 55 61 47 12 21 12 49 54 34 25 36 15 56 55 20 9 8 62 13 82 9 44 29 60 53 82 42 80 5 43 71 3 80 77 47 78 34 25 62 18 10 49 62 64 52 81 11 66 62 13 47 17 52 70 26 23 32 31 64 23 35 32 50 6 1 25 8 37 47 43 26 76 65 68 80 17 7 45 63 14 53 63 60 16

East 3: 63 66 5 49 75 54 2 60 29 40 78 47 60 75 67 71 60 2 65 7 47 14 45 74 59 41 80 13 60 13 81 22 35 50 40 39 2 59 48 31 76 2 80 75 1 56 67 11 21 8 40 65 45 75 55 39 60 42 13 3 22 57 2 6 58 9 70 1 58 56 63 68 25 79 7 20 19 64 2 66 73 30 71 16 12 30 65 37 20 13 22 63 18 46 64 59 41 81 82 22 78 36 47 17 4 6 17 5 36 79 63 1 64 69 15 43 4 58 56 31 14 64 58 18 44 78 69 1 0 46 20 71 73 25 35 8 24

West 3: 34 66 5 49 75 54 23 74 11 13 28 26 19 48 67 57 37 60 34 28 74 10 17 32 11 18 19 43 19 81 42 4 62 9 46 49 32 51 76 58 4 43 47 17 67 79 21 32 44 16 30 37 26 28 41 68 57 34 51 10 69 70 8 6 46 43 18 39 47 43 15 13 33 30 35 62 37 0 37 5 38 55 37 13 40 25 9 21 11 64 5 79 42 68 11 71 11 48 3 67 61 40 22 14 35 50 61 39 11 2 66 49 51 53 17 73 36 75 74 54 24 30 54 70

East 4: 27 66 5 49 75 54 2 60 29 40 2 55 9 15 59 18 68 3 36 5 47 77 44 38 1 18 28 76 4 34 60 63 58 80 17 54 79 75 48 54 55 19 62 64 14 47 51 70 75 5 11 47 45 58 68 69 79 25 38 45 73 47 68 50 34 45 78 26 79 57 4 56 22 60 18 75 43 60 59 67 63 42 49 33 40 65 79 77 7 3 26 62 31 78 26 57 69 40 4 23 26 13 67 42 38 72 11 39 65 60 25 6 80 66 68 77 59 78 19

West 4: 77 66 5 49 75 54 2 60 29 40 2 55 9 15 59 18 68 3 36 5 47 60 21 80 1 72 55 16 82 35 57 19 1 66 18 27 39 17 74 81 39 14 78 0 25 65 43 66 64 38 81 23 24 50 57 30 71 75 26 68 54 57 56 50 71 73 14 21 8 32 26 63 5 37 19 43 66 47 53 34 66 23 73 31 54 38 77 67 11 63 79 6 22 21 51 69 74 21 5 17 67 37 29 21 60 14 82 44 30 4 20 42 35 1 31 54 46 20 40 30

East 5: 33 66 5 49 75 54 2 60 29 40 2 55 9 15 59 18 68 3 36 5 47 33 21 59 44 18 28 76 59 34 60 63 79 27 12 54 5 49 48 54 55 52 62 72 69 10 57 22 58 48 67 53 7 34 32 30 31 19 26 8 34 46 7 30 71 55 34 75 54 9 6 60 5 23 25 45 42 80 25 12 22 76 20 51 62 21 40 9 41 10 44 73 8 33 70 73 6 31 21 72 5 40 61 51 42 66 64 74 61 25 63 42 24 41

===== END DATA =====
