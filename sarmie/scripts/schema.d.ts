/** @typedef {"domain"|"register"|"grammar"|"region"|"modifier"|"other"} TagKind */

/**
 * @typedef {Object} Tag
 * @property {string} label
 * @property {TagKind} kind
 */

/**
 * @typedef {Object} Sense
 * @property {string} partOfSpeech
 * @property {string} definition - Leading parentheticals removed
 * @property {string} source - Original gloss text from Wiktionary
 * @property {Tag[]} tags
 * @property {string[]} examples
 * @property {string|null} date
 */

/**
 * @typedef {Object} WordEntry
 * @property {string} word
 * @property {string} partOfSpeech - Primary sense
 * @property {string} definition
 * @property {string} source
 * @property {Tag[]} tags
 * @property {string[]} examples
 * @property {string|null} date
 * @property {Sense[]} senses - All included senses for this word
 */

export {};
