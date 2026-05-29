# Dictionary data

Word definitions in `data/words.json` are derived from [Wiktionary](https://en.wiktionary.org/) via the [Open Dictionary](https://github.com/mhollingshead/open-dictionary) project.

Licensed under [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).

Frequency list: [google-10000-english](https://github.com/first20hours/google-10000-english) `20k.txt` (top 20,000 by Google n-gram frequency; derived from Peter Norvig’s data).

Blocklist: [LDNOOBW](https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words) English profanity/slur list (build-time filter only; not redistributed in `words.json`).

To regenerate the dataset:

```bash
node sarmie/scripts/build-words.mjs
```
