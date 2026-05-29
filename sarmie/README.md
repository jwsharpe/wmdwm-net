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

Word length **4–20**, lowercase a–z. Excludes words ending in **-ist**, **-osis** (including **-cosis**, **-iosis**), **-plasty**, nouns ending in **-ly**, and words ending in **-able** or **-ness** when longer than 12 characters. Excludes **eucalyptus** / **eucalypt**\* words. Excludes **de-** and **un-** prefixed words whose stem is also in the list. Senses with Tier 1 science/medical/math domain tags (including `(organic chemistry)` and the Wiktionary typo `(oganic chemistry)`), register tags (`obsolete`, `archaic`, `historical`, `dated`, `rare`, `now rare`), bird/species/plant/tree/animal/insect/mammal/cattle tags (`of a bird`, `of cattle`, `of an animal`, etc.), `(species)`, `(birds)`, `(plants)`, `(tree)`, `(animals)`, `(insects)`, `(mammals)`, `(enzyme)`, `(legal)`. Glosses defining parts of cattle (e.g. `foreleg of cattle`, `part of the tail in cattle`) are excluded. or `(british spelling)`, `(pejorative)`, `(slang)`, `(agent noun)` are excluded — see [`scripts/filters.mjs`](scripts/filters.mjs). Glosses containing `(symbol: …)` are excluded. Meta/inflection glosses (`… of …`, taxonomic `genus`/`species of`, `of or pertaining to`, abstract `state/quality of being`, `one who …`, `to work as …`, `in a … manner` / `in a … way`, `with regard to …`, etc.) are excluded. **un-** words whose gloss mentions *undo* are excluded. The word `cannot` is excluded. Self-referential glosses are excluded: whole headword in definition (5+ letters), `re-`/`un-`/`de-` prefix use in the gloss, and circular `-ly` adverb definitions. Definitions must be **4+ words**. Blocklist + top-20k common words excluded by default — see [`scripts/word-lists.mjs`](scripts/word-lists.mjs).

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
