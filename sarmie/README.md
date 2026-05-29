# Sarmie

Word exploration tool — browse definitions from Wiktionary (via [Open Dictionary](https://github.com/mhollingshead/open-dictionary)).

## Data

`data/words.json` — see [schema below](#json-schema). Regenerate:

```bash
node sarmie/scripts/build-words.mjs
```

Attribution: [ATTRIBUTION.md](./ATTRIBUTION.md).

### Build options

```bash
SARMIE_EXCLUDE_COMMON=20000 node sarmie/scripts/build-words.mjs   # default
SARMIE_EXCLUDE_COMMON=0 node sarmie/scripts/build-words.mjs       # no frequency filter
SARMIE_REFRESH_BLOCKLIST=1 node sarmie/scripts/build-words.mjs
```

### Inclusion rules

Word length **4–20**, lowercase a–z. Excludes words ending in **-ist**, **-osis** (including **-cosis**, **-iosis**), **-plasty**, **-like**, nouns ending in **-ly**, and words ending in **-able** or **-ness** when longer than 12 characters. Excludes **eucalyptus** / **eucalypt**\* words. Excludes **de-**, **un-**, and **counter-** prefixed words whose stem is also in the list (and circular **counter-** glosses at sense filter). Senses with Tier 1 science/medical/math domain tags (including `(organic chemistry)` and the Wiktionary typo `(oganic chemistry)`), register tags (`obsolete`, `archaic`, `historical`, `dated`, `rare`, `now rare`, `humorous`), bird/species/plant/tree/animal/insect/mammal/cattle tags (`of a bird`, `of cattle`, `of an animal`, etc.), `(species)`, `(birds)`, `(plants)`, `(tree)`, `(animals)`, `(insects)`, `(mammals)`, `(enzyme)`, `(legal)`, `(pharmaceutical)`, `(carbohydrate)`, `(heraldry)`. Glosses defining parts of cattle (e.g. `foreleg of cattle`, `part of the tail in cattle`) are excluded. or `(british spelling)`, `(pejorative)`, `(slang)`, `(agent noun)`, `(by extension)` are excluded — see [`scripts/filters.mjs`](scripts/filters.mjs). Glosses containing `(symbol …)` or `(symbol: …)` are excluded. Meta/inflection glosses (`… of …`, taxonomic `genus`/`species of`, `of or pertaining to`, abstract `state/quality of being`, `one who …`, `a person from …`, `to work as …`, `in a … manner` / `in a … way`, `with regard to …`, formulaic **treat(ed) with X**, glosses mentioning **maker**, etc.) are excluded. **un-** words whose gloss mentions *undo* are excluded. The words `cannot`, `billfish`, and `silliest` are excluded. Self-referential glosses are excluded: whole headword in definition (5+ letters), `re-`/`un-`/`de-` prefix use in the gloss, `re-` glosses of the form “to X again”, “new/replace X”, etc. (where X matches the stem; e.g. repew → pews), `un-` glosses of the form “not X”, “remove X”, or “rid of X”, `de-` glosses of the form “remove X” or “rid of X” (e.g. deflea → fleas), `im-` glosses of the form “lack of X” / “absence of X” (where X matches the stem), circular `hyper-` / `out-` / `sub-` (“almost X”, “under X”, part of X, or **x** in the gloss) / `pre-` / `fore-` (“before X”, “to X before/beforehand”, etc.), `semi-` (“somewhat X”), / `counter-` / `-ly` / `-erly` (stem **x**, e.g. northerly → north) / `-wise` (“in the manner of a X”) / `-ish` / `-ible` / `-able` (“able to be X”, etc.), `-ic` (“in/of or pertaining to X”, etc.), `*-s` words whose gloss uses the stem before `-s` / “plural of X”, / `-ing` glosses, `-al` adjectives whose gloss uses the related `-e` form (e.g. anecdotal → anecdote), **`-ial`** adjectives whose gloss uses the related **`-e`** stem (e.g. figurial → figure, authorial → author), `*-ous` / `*-ed` adjectives whose gloss uses the related `-e` form (e.g. courageous → courage, winged → wing) or “having a X” (e.g. flued → flue), `*-late` (not `*plate`) words whose gloss uses the stem before `-late`, `*-le` words (not `*jectile`) whose gloss uses the stem before `-le`, `*-olate` words whose gloss uses the stem before `-olate`, **`-tive`** words whose gloss uses the related **`-l`** stem (e.g. accumulative → accumul), `*-ty` words (not `*-ity`) whose gloss uses the stem **x** (e.g. frailty → frail) are excluded. `*-inity` / `*-o` words whose gloss uses the paired stem (e.g. femininity → feminine, viraginity → virago), `*-iferous` words whose gloss uses the stem before `-iferous` (e.g. carboniferous → carbon), base words whose gloss names `*-iferous` (e.g. carbon → carboniferous), `*-y` words whose gloss uses stem **x** (or “x-y”, `-ize`/`-ify`, or “resembling/characteristic of X” wording), **`-iest`** words whose gloss uses the related **`-y`** stem (e.g. silliest → silly), `*-dom` words whose gloss uses the stem before `-dom`, `*-ship` words whose gloss uses “of a/an X” / “office of X” (where X matches the stem before `-ship`), and “the manufacture/making/creation of X” glosses where X matches the headword stem (e.g. bagmaking → bags). `*-er` agent nouns whose gloss uses the matching verb stem (e.g. abrader → abrading) are excluded. `*-es` headwords with the same agent glosses (e.g. represses → someone that represses) are excluded. `*-tor` agent nouns whose gloss uses the matching `-ate`/`-ating`/`-ting` form (e.g. cohobator → cohobating) are excluded. `*-maker` words whose gloss names the product as the stem plus **-s** or **-es** (e.g. bagmaker → bags) are excluded. **`*-smith`** words whose gloss says “maker of X” (e.g. hammersmith → hammers) are excluded. `*-man` words (not `*human`) whose gloss names the stem **X** (e.g. boatman → boat) are excluded. `*-ization` / `*-isation` words whose gloss uses the related **-a** or **-ize** stem (e.g. dramatization → drama, actualization → actual) are excluded. `*-ation` words (not `*-ization`) whose gloss uses the related **-ate** stem (e.g. hesitation → hesitate) are excluded. **`*den`** causative **d+en** words whose gloss uses the stem **x** (e.g. harden → hard) and **`-ize`/`-ise`** words whose gloss says “convert into X” or “treat with X” (e.g. albumenize → albumen, morphinize → morphine) are excluded. **`-ized`/`-ised`** words whose gloss uses the related **`-y`** stem (e.g. hierarchized → hierarchy, granitized → granite) are excluded. **`-in`** words whose gloss uses the paired **`-ic`** form (e.g. toxin → toxic, hepatotoxin → hepatotoxic) or, for **`*toxin`**, cites **toxin**/**toxic** (e.g. endotoxin) are excluded. **`non-`** (“not X”), **`mis-`** (wrong/poorly/incorrect X), **`under-`** (too little / not enough X), **`uni-`** (“single X”), **`anti-`/`pseudo-`/`over-`/`super-`/`semi-`/`dis-`** (opposing, false, excessive, partial, negating glosses), **`-ful`**, **`-less`**, **`-some`**, **`-oid`**, **`-hood`**, **`-proof`**, **`-free`**, **`-ee`**, **`-ism`**, and **`-cy`** circular glosses are excluded; **`non-`** also covers “absence/lack of X”. **`-ically`** from **x-y**, **`-by`** from **x** / **x-s**, and base words citing **x-ism**, are excluded. Production glosses (“making/manufacturing of X”, etc.) are excluded when X matches the headword stem. Definitions must be **4+ words**. Blocklist + top-20k common words excluded by default — see [`scripts/word-lists.mjs`](scripts/word-lists.mjs).

## JSON schema

Each element of `words.json`:

```json
{
  "word": "abaft",
  "partOfSpeech": "adverb",
  "definition": "On the aft side; in the stern.",
  "source": "(nautical) On the aft side; in the stern.",
  "tags": [{ "label": "nautical", "kind": "domain" }],
  "examples": [
    "We drifted with the wind abaft."
  ],
  "date": null,
  "senses": [
    {
      "partOfSpeech": "adverb",
      "definition": "On the aft side; in the stern.",
      "source": "(nautical) On the aft side; in the stern.",
      "tags": [{ "label": "nautical", "kind": "domain" }],
      "examples": ["..."],
      "date": null
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `word` | Headword (lowercase) |
| `partOfSpeech` | Primary sense part of speech |
| `definition` | Clean gloss — leading `(…)` metadata removed |
| `source` | Original Wiktionary gloss text |
| `tags` | Parsed from leading parentheticals; `kind` is `domain`, `register`, `grammar`, `region`, `modifier`, or `other` |
| `examples` | Up to 5 usage examples from Wiktionary |
| `date` | Optional sense date/period string from Wiktionary |
| `senses` | All included senses for this word (primary is `senses[0]`) |

Type definitions: [`scripts/schema.d.ts`](scripts/schema.d.ts).
