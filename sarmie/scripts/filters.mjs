export const MIN_WORD_LEN = 4;
export const MAX_WORD_LEN = 20;
export const MIN_DEF_LEN = 12;
export const MAX_DEF_LEN = 280;
export const MIN_DEF_WORDS = 4;
export const MAX_EXAMPLES = 5;

export const POS_PRIORITY = [
  "adjective",
  "noun",
  "verb",
  "adverb",
  "interjection",
];

const DOMAIN_TAGS = new Set([
  "organic chemistry", "chemistry", "biochemistry", "organic compound",
  "anatomy", "medicine", "medical", "pathology", "surgery", "botany", "zoology",
  "biology", "mathematics", "physics", "geology", "mineral", "mineralogy",
  "legal", "computing", "linguistics", "music", "nautical", "architecture",
  "philosophy", "economics", "anthropology", "psychology", "theology", "military",
  "finance", "grammar", "cooking", "culinary", "accounting", "law", "civil law",
  "criminal law", "engineering", "statistics", "logic", "sports", "heraldry",
]);

const REGISTER_TAGS = new Set([
  "obsolete", "archaic", "dated", "rare", "now rare", "historical", "literary",
  "informal", "colloquial", "slang", "vulgar", "offensive", "derogatory",
  "euphemistic", "formal", "humorous", "ironic", "poetic", "dialectal",
  "british slang", "american slang",
]);

const GRAMMAR_TAGS = new Set([
  "transitive", "intransitive", "ambitransitive", "uncountable", "countable",
  "plural only", "singular only", "usually plural", "attributive",
]);

const REGION_TAGS = new Set([
  "uk", "us", "usa", "british", "scotland", "scottish", "ireland", "irish",
  "australia", "australian", "canada", "canadian", "south africa", "new zealand",
  "north america", "american", "english",
]);

/** Leading parenthetical tags that exclude a sense (and word if no other senses). Tier 1 hard sciences. */
export const REJECT_DOMAIN_TAGS = new Set([
  // chemistry / medicine (original)
  "organic compound",
  "organic compounds",
  "organic chemistry",
  "oganic chemistry",
  "especially organic chemistry",
  "inorganic chemistry",
  "inorganic compound",
  "analytical chemistry",
  "physical chemistry",
  "electrochemistry",
  "photochemistry",
  "medicine",
  "medical",
  "chemistry",
  "physiology",
  "botany",
  // life sciences
  "anatomy",
  "biology",
  "zoology",
  "biochemistry",
  "genetics",
  "ecology",
  "microbiology",
  "mycology",
  "entomology",
  "ornithology",
  "ichthyology",
  "mammalogy",
  "herpetology",
  "malacology",
  "taxonomy",
  "zootomy",
  "embryology",
  "histology",
  "ethology",
  "marine biology",
  "molecular biology",
  "evolutionary biology",
  "veterinary",
  "veterinary medicine",
  "agriculture",
  "horticulture",
  "forestry",
  "animal husbandry",
  // earth & space
  "geology",
  "mineral",
  "mineralogy",
  "petrology",
  "geomorphology",
  "geochemistry",
  "geophysics",
  "glaciology",
  "hydrology",
  "oceanography",
  "paleontology",
  "astronomy",
  "astrophysics",
  "cosmology",
  "meteorology",
  "seismology",
  "volcanology",
  // physical sciences
  "physics",
  "crystallography",
  "metallurgy",
  "ceramics",
  "materials science",
  "optics",
  "acoustics",
  "electronics",
  "thermodynamics",
  "quantum mechanics",
  "quantum physics",
  "nuclear physics",
  "particle physics",
  "fluid dynamics",
  "electromagnetism",
  "mechanics",
  // medical / clinical
  "pathology",
  "surgery",
  "oncology",
  "cardiology",
  "neurology",
  "psychiatry",
  "dermatology",
  "ophthalmology",
  "urology",
  "andrology",
  "obstetrics",
  "pulmonology",
  "endocrinology",
  "hematology",
  "immunology",
  "pharmacology",
  "pharmacy",
  "dentistry",
  "orthodontics",
  "periodontics",
  "optometry",
  "epidemiology",
  "neurosurgery",
  "otolaryngology",
  "therapy",
  "rehabilitation",
  // formal math
  "mathematics",
  "math",
  "maths",
  "statistics",
  "geometry",
  // other specialist domains
  "pharmaceutical drug",
  "automotive",
  "species",
  "birds",
  "bird",
  "plants",
  "plant",
  "tree",
  "trees",
  "animals",
  "animal",
  "enzyme",
  "legal",
  "insect",
  "insects",
  "insect anatomy",
  "mammal",
  "mammals",
]);

/** Leading tags matching these patterns are excluded (bird/species/plant/tree/animal/insect/mammal glosses). */
const REJECT_TAG_PATTERNS = [
  /\bof a bird\b/i,
  /\bof birds\b/i,
  /\bof a species\b/i,
  /\bor species\b/i,
  /\bas a species\b/i,
  /\bchiefly of birds\b/i,
  /\bespecially of birds\b/i,
  /\bof a species of\b/i,
  /\bin names of species\b/i,
  /\bof an animal or animal species\b/i,
  /\bof a bird of prey\b/i,
  /\bof birds or\b/i,
  /\busually a bird\b/i,
  /\bbirdwatching\b/i,
  /\bbirding\b/i,
  /\bof a plant\b/i,
  /\bof plants\b/i,
  /\bof a tree or plant\b/i,
  /\bof a plant or plant species\b/i,
  /\bof animals or plants\b/i,
  /\bof animals and plants\b/i,
  /\bof an animal\b/i,
  /\bof animals\b/i,
  /\bchiefly of animals\b/i,
  /\bof animals or wings\b/i,
  /\bof animals or things\b/i,
  /\banimals or things\b/i,
  /\bin plants\b/i,
  /\bplant disease\b/i,
  /\bor a plant\b/i,
  /\bplant etc\./i,
  /\bof a tree\b/i,
  /\bof trees\b/i,
  /\bof a tree or branches\b/i,
  /\bof a tree or plant\b/i,
  /\bof an insect\b/i,
  /\bof insects\b/i,
  /\bchiefly of insects\b/i,
  /\bchiefly of an insect\b/i,
  /\bof an insect larva\b/i,
  /\bof an insect or animal\b/i,
  /\bof an insect or arachnid\b/i,
  /\bof a mosquito or other female insect\b/i,
  /\bof the insect eye\b/i,
  /\bof the eyes of an insect\b/i,
  /\bof a moth or insect\b/i,
  /\bof an herbivorous insect\b/i,
  /\bsaid of the legs of certain insects\b/i,
  /\bof the colouring of some insects\b/i,
  /\binsect anatomy\b/i,
  /\bof a mammal\b/i,
  /\bof mammals\b/i,
  /\bof large mammals\b/i,
  /\bchiefly mammalogy\b/i,
  /\bof cattle\b/i,
  /\bof a cow\b/i,
  /\bof cows\b/i,
  /\bof a cow or heifer\b/i,
  /\bof sheep or cattle\b/i,
  /\bchiefly of cows\b/i,
  /\bof cattle or deer\b/i,
];

const REJECT_META_TAGS = new Set([
  "british spelling",
  "pejorative",
  "slang",
  "agent noun",
]);

/** Register tags: dated or low-value senses for a general quiz. */
const REJECT_REGISTER_TAGS = new Set([
  "obsolete",
  "archaic",
  "historical",
  "dated",
  "rare",
  "now rare",
]);

const REJECT_WORDS = new Set(["cannot", "eucalyptus"]);

const MAX_DERIVED_SUFFIX_LEN = 12;

/** Post-build: drop headwords formed with a prefix when the stem is also in the list. */
export const STEM_PREFIX_RULES = [
  { prefix: "de", minStemLen: 3 },
  { prefix: "un", minStemLen: 3 },
];

const SYMBOL_NOTATION = /\(symbol:\s*[^)]+\)/i;

function hasRejectedSenseTag(tags) {
  return tags.some((tag) => {
    const label = tag.trim().toLowerCase();
    if (
      REJECT_DOMAIN_TAGS.has(label) ||
      REJECT_META_TAGS.has(label) ||
      REJECT_REGISTER_TAGS.has(label)
    ) {
      return true;
    }
    return REJECT_TAG_PATTERNS.some((re) => re.test(label));
  });
}

const MIN_SELF_REF_WORD_LEN = 5;

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Tier A: whole headword in gloss (length >= 5).
 * Prefix: re-/un- headword appears in gloss (whole or as prefix of another word).
 * -ly: circular adverb glosses (In an X manner/fashion/way, that is X, etc.).
 * @returns {string|null} reject reason
 */
export function selfReferenceReason(word, definition) {
  const w = word.toLowerCase();
  const d = definition.trim().replace(/\.+$/, "").toLowerCase();

  if (w.length >= MIN_SELF_REF_WORD_LEN) {
    const re = new RegExp(`\\b${escapeRegex(w)}\\b`, "i");
    if (re.test(d)) return "self-reference";
  }

  for (const prefix of ["re", "un", "de"]) {
    const reason = prefixSelfReferenceReason(prefix, w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ly") && w.length >= 5) {
    const reason = adverbLySelfReferenceReason(w, d);
    if (reason) return reason;
  }

  return null;
}

/** un- headwords whose gloss mentions undo (e.g. "To undo the confirmation of"). */
function unUndoReason(word, definition) {
  if (word.startsWith("un") && word.length >= 4 && /\bundo\b/i.test(definition)) {
    return "un-undo";
  }
  return null;
}

function prefixSelfReferenceReason(prefix, w, d) {
  if (!w.startsWith(prefix) || w.length < 4) return null;
  const whole = new RegExp(`\\b${escapeRegex(w)}\\b`, "i");
  if (whole.test(d)) return "self-reference";
  const pref = new RegExp(`\\b${escapeRegex(w)}\\w+`, "i");
  if (pref.test(d)) return `${prefix}-self-reference`;
  return null;
}

function adjectiveMatchesLyStem(adj, stem, w) {
  return (
    adj === stem ||
    adj.startsWith(stem) ||
    stem.startsWith(adj) ||
    w.startsWith(adj)
  );
}

function adverbLySelfReferenceReason(w, d) {
  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  const manner = d.match(/^in an? (\w+) (manner|fashion|way)\b/);
  if (manner && adjectiveMatchesLyStem(manner[1], stem, w)) {
    return "adverb-manner";
  }

  const thatIs = d.match(/\bthat is (\w+)/);
  if (thatIs && adjectiveMatchesLyStem(thatIs[1], stem, w)) {
    return "adverb-manner";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "ly-stem-reference";

  return null;
}

/** Ordered: first match wins for rejectReason(). */
const REJECT_RULES = [
  {
    reason: "meta-of",
    re: /^(plural|singular|past tense|simple past tense|past participle|present participle|gerund|abbreviation|alternative form|alternative spelling|variant of|variant spelling|short for|obsolete form|obsolete spelling|misspelling|eye dialect|rare form|synonym of|female equivalent|male equivalent|comparative|superlative|diminutive|augmentative|feminine|masculine|contraction|acronym|initialism|ellipsis|common misspelling|elongated form|inflection|chiefly british spelling|chiefly american spelling) of /i,
  },
  {
    reason: "participle-gerund",
    re: /^(present|past) participle and gerund of /i,
  },
  {
    reason: "verb-inflection",
    re: /\b(simple past|past participle|present participle|third-person singular|first-person singular|second-person|indicative form|participle) of [a-z]/i,
  },
  { reason: "form-of-word", re: /\bform of [a-z][a-z'-]*\b/i },
  { reason: "one-who", re: /\bone (who|whose)\b/i },
  {
    reason: "a-person-who",
    re: /^a (person|woman|man|child|machine|device|tool) (who|that|which)[, ]/i,
  },
  { reason: "someone-who", re: /^some(one|body) (who|that|which)[, ]/i },
  { reason: "agent-noun", re: /\bagent noun of\b/i },
  { reason: "a-worker-who", re: /^a worker (who|that)[, ]/i },
  { reason: "that-which", re: /^that which /i },
  { reason: "with-regard-to", re: /^with regard to /i },
  { reason: "to-work-as", re: /^to work as\b/i },
  { reason: "in-a-manner", re: /^in an? .+ (manner|way)\b/i },
  {
    reason: "animal-plant",
    re: /\b(animals? (?:or|and) plants?|plants? (?:or|and) animals?)\b/i,
  },
  {
    reason: "animal-plant",
    re: /\bclass of animals or\b/i,
  },
  {
    reason: "tree-def",
    re: /^(a|an|any|the) (shrub or )?(small |tropical |evergreen |deciduous |large |medium-sized |bushy )*tree\b/i,
  },
  { reason: "tree-def", re: /\b\w+ tree,/i },
  { reason: "taxonomic", re: /^any species of/i },
  { reason: "taxonomic", re: /^any of the species/i },
  { reason: "taxonomic", re: /^any of several species/i },
  { reason: "taxonomic", re: /^any of various species/i },
  {
    reason: "taxonomic",
    re: /^any of several (species|genera|plants|trees|fish|birds|animals|insects|mammals)/i,
  },
  { reason: "taxonomic", re: /\bspecies of (the )?genus/i },
  { reason: "taxonomic", re: /^a species of/i },
  { reason: "taxonomic", re: /^any tree of species/i },
  {
    reason: "taxonomic",
    re: /^any (plant|fish|bird|tree|mammal|member) of (the )?genus/i,
  },
  { reason: "taxonomic", re: /^member of the genus/i },
  { reason: "taxonomic", re: /\bbelonging to the genus/i },
  { reason: "taxonomic", re: /\bin the genus [A-Z]/i },
  { reason: "taxonomic", re: /\bof the genus [A-Z]/i },
  { reason: "taxonomic", re: /\bof the family [A-Z]/i },
  { reason: "taxonomic", re: /^any of the genus [A-Z]/i },
  { reason: "taxonomic", re: /\bfrom the genus [A-Z]/i },
  { reason: "taxonomic", re: /\bin genus [A-Z]/i },
  { reason: "taxonomic", re: /\btaxonomic order\b/i },
  { reason: "taxonomic", re: /^[A-Z][a-z]+ [a-z]+, a species of/i },
  { reason: "taxonomic", re: /^either of the .* form the genus/i },
  {
    reason: "taxonomic",
    re: /^a plant that is a member of the family/i,
  },
  {
    reason: "taxonomic",
    re: /^any of the (large )?(serpents|rodents|molluscs|mollusks|fish|birds|plants|trees|animals|insects|mammals)/i,
  },
  { reason: "taxonomic", re: /\bform the genus\b/i },
  {
    reason: "taxonomic",
    re: /\b(species|genus|subspecies) of (the )?[A-Z]/i,
  },
  { reason: "taxonomic", re: /\bgenus [A-Z][a-z]+\b/i },
  { reason: "relating-to", re: /\brelating to\b/i },
  {
    reason: "pertaining-to",
    re: /^of or pertaining|^of, pertaining|^pertaining to/i,
  },
  {
    reason: "abstract-noun",
    re: /^the (act|process|state|quality|condition|practice|fact|ability|capability|instance|result|degree|property|characteristic) (of|or)/i,
  },
  {
    reason: "quality-of-being",
    re: /^(quality|property|state) of being|^the characteristic of being|^characteristic of being/i,
  },
  {
    reason: "used-to",
    re: /^used to (express|refer|indicate|show|describe|mean)/i,
  },
  { reason: "a-type-of", re: /^a (type|kind|form|version|copy) of /i },
  {
    reason: "not-having",
    re: /^not (having|being|without|lacking|free of|devoid of|caused by|characterized by a lack)/i,
  },
  { reason: "female-male-form", re: /^(female|male) /i },
  { reason: "feminine-of", re: /^feminine of /i },
  { reason: "masculine-of", re: /^masculine of /i },
];

export function classifyTag(tag) {
  const t = tag.trim().toLowerCase();
  if (DOMAIN_TAGS.has(t)) return "domain";
  if (REGISTER_TAGS.has(t)) return "register";
  if (GRAMMAR_TAGS.has(t)) return "grammar";
  if (REGION_TAGS.has(t)) return "region";
  if (/^(also|esp\.|chiefly|usually|often|sometimes)\b/.test(t)) return "modifier";
  return "other";
}

export function isStemPrefixedWord(word, prefix, minStemLen, wordSet) {
  if (!word.startsWith(prefix)) return false;
  const stem = word.slice(prefix.length);
  if (stem.length < minStemLen) return false;
  return wordSet.has(stem);
}

/** @returns {string|null} e.g. "prefix-de" */
export function stemPrefixRejectReason(word, wordSet) {
  for (const { prefix, minStemLen } of STEM_PREFIX_RULES) {
    if (isStemPrefixedWord(word, prefix, minStemLen, wordSet)) {
      return `prefix-${prefix}`;
    }
  }
  return null;
}

/** @deprecated use isStemPrefixedWord(word, "de", 3, wordSet) */
export function isDePrefixedWord(word, wordSet) {
  return isStemPrefixedWord(word, "de", 3, wordSet);
}

export function wordRejectReason(word) {
  if (REJECT_WORDS.has(word)) return "blocklist-word";
  if (word.startsWith("eucalypt")) return "eucalyptus";
  if (word.endsWith("ist")) return "suffix-ist";
  if (word.endsWith("osis")) return "suffix-osis";
  if (word.endsWith("plasty")) return "suffix-plasty";
  if (word.endsWith("able") && word.length > MAX_DERIVED_SUFFIX_LEN) {
    return "suffix-able-long";
  }
  if (word.endsWith("ness") && word.length > MAX_DERIVED_SUFFIX_LEN) {
    return "suffix-ness-long";
  }
  return null;
}

/** Entry-level filters that need part of speech or other sense data. */
export function entryRejectReason(entry) {
  const wordReason = wordRejectReason(entry.word);
  if (wordReason) return wordReason;
  if (entry.word.endsWith("ly") && entry.partOfSpeech === "noun") {
    return "suffix-ly-noun";
  }
  return null;
}

export function isQuizWord(word) {
  if (word.length < MIN_WORD_LEN || word.length > MAX_WORD_LEN) return false;
  if (!/^[a-z]+$/.test(word)) return false;
  return wordRejectReason(word) === null;
}

/** Reject glosses about parts (or products) of cattle. */
function cattlePartReason(text) {
  if (!/\bcattle\b/i.test(text)) return null;

  const body =
    "skin|feet|foot|foreleg|foreshank|tail|tongues?|mouth|horn|hide|head|neck|udder|muzzle|dewlap|rumen|hoof|hooves|hock|rump|backbone|pap|lymph node|leg|teat|dung|manure|sharn|horns?|digit|digits|cantle";

  if (new RegExp(`^the .+ of (the )?(${body}) of cattle\\b`, "i").test(text)) {
    return "cattle-part";
  }
  if (new RegExp(`^a .+ of (the )?(${body}) of cattle\\b`, "i").test(text)) {
    return "cattle-part";
  }
  if (new RegExp(`^an .+ of (the )?(${body}) of cattle\\b`, "i").test(text)) {
    return "cattle-part";
  }
  if (/\bpart of (the )?[\w ]{1,50} of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (new RegExp(`\\bof the (${body}) of cattle\\b`, "i").test(text)) {
    return "cattle-part";
  }
  if (/\bunder the tongues of horses and cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\broot of the tail, where it joins the rump, in cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bcondition in cattle where the base of the tail\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bdisease in the feet of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bdisease affecting the feet of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bwarty growth of the skin of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bswelling of the lymph node of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bleather prepared from the skin of .+ cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bthe dung or manure of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\ble?sion under the skin of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bbetween both digits of cattle\b/i.test(text)) {
    return "cattle-part";
  }
  if (/\bskin hyperplasia .+ digits of cattle\b/i.test(text)) {
    return "cattle-part";
  }

  return null;
}

/** Reject glosses mentioning mammals; allow mammalian/mammalogy compounds. */
function mammalMentionReason(text) {
  if (!/\bmammals?\b|\bMammalia\b/i.test(text)) return null;
  if (/\bmammalian\b/i.test(text)) return null;
  if (/\bmammalog/i.test(text)) return null;
  return "mammal-mention";
}

/** Reject glosses mentioning insects; allow insectivore/insecticide compounds. */
function insectMentionReason(text) {
  if (!/\binsects?\b|\bInsecta\b/i.test(text)) return null;
  if (/\binsectivor/i.test(text)) return null;
  if (/\binsecticid/i.test(text)) return null;
  if (/\binsectif/i.test(text)) return null;
  if (/\binsectolog/i.test(text)) return null;
  if (/\binsectlike\b/i.test(text)) return null;
  if (/\binsectile\b/i.test(text)) return null;
  if (/\binsectary\b/i.test(text)) return null;
  return "insect-mention";
}

/** Reject glosses mentioning trees (botanical); allow idioms and computing. */
function treeMentionReason(text) {
  if (!/\btrees?\b/i.test(text)) return null;
  if (/\bfamily tree\b/i.test(text)) return null;
  if (/\btree-lined\b/i.test(text)) return null;
  if (/\bchristmas tree\b/i.test(text)) return null;
  if (/\btree traversal\b/i.test(text)) return null;
  if (/\btree data structure\b/i.test(text)) return null;
  if (/\bbarking up the wrong tree\b/i.test(text)) return null;
  return "tree-mention";
}

export function rejectReason(text) {
  if (!text) return "empty";
  if (text.trim().split(/\s+/).filter(Boolean).length < MIN_DEF_WORDS) {
    return "short-def";
  }
  if (text.length < MIN_DEF_LEN || text.length > MAX_DEF_LEN) return "length";

  for (const { reason, re } of REJECT_RULES) {
    if (re.test(text)) return reason;
  }

  const treeReason = treeMentionReason(text);
  if (treeReason) return treeReason;

  const insectReason = insectMentionReason(text);
  if (insectReason) return insectReason;

  const mammalReason = mammalMentionReason(text);
  if (mammalReason) return mammalReason;

  const cattlePart = cattlePartReason(text);
  if (cattlePart) return cattlePart;

  if (/^not /i.test(text)) {
    if (/^not [a-z][a-z'-]{1,24}\.?$/i.test(text)) return "not-only";
    const afterNot = text.slice(4, 4 + 80);
    const wordCount = afterNot.split(/\s+/).filter(Boolean).length;
    if (!/[;,]/.test(afterNot) && wordCount <= 6) return "not-stub";
  }

  return null;
}

export function isQuizDefinition(text) {
  return rejectReason(text) === null;
}

export function stripHtml(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pull all consecutive leading Wiktionary parenthetical groups into tags.
 * e.g. "(UK, slang) (cooking) To broil." → tags + cleaned text
 */
export function extractLeadingParenTags(text) {
  const tags = [];
  let result = text.trim();

  while (true) {
    const match = result.match(/^\(([^)]+)\)\s*/);
    if (!match) break;
    for (const part of match[1].split(",")) {
      const tag = part.trim();
      if (tag) tags.push(tag);
    }
    result = result.slice(match[0].length).trim();
  }

  return { tags, text: result.replace(/\s+/g, " ").trim() };
}

function normalizeSentence(text) {
  if (!text) return text;
  return text.endsWith(".") ? text : `${text}.`;
}

function hasSymbolNotation(text, tags) {
  if (SYMBOL_NOTATION.test(text)) return true;
  return tags.some((tag) => /^symbol:/i.test(tag.trim()));
}

function buildTagObjects(tags) {
  return tags.map((label) => ({
    label,
    kind: classifyTag(label),
  }));
}

function parseSense(sense, partOfSpeech, word) {
  const source = stripHtml(sense.sense ?? "");
  const { tags, text } = extractLeadingParenTags(source);
  if (hasRejectedSenseTag(tags)) return null;
  if (hasSymbolNotation(source, tags)) return null;
  if (!isQuizDefinition(text)) return null;
  if (selfReferenceReason(word, text)) return null;
  if (unUndoReason(word, text)) return null;

  const examples = (sense.examples ?? [])
    .map(stripHtml)
    .filter(Boolean)
    .slice(0, MAX_EXAMPLES);

  const date = stripHtml(sense.date ?? "") || null;

  return {
    partOfSpeech,
    definition: normalizeSentence(text),
    source: normalizeSentence(source),
    tags: buildTagObjects(tags),
    examples,
    date,
  };
}

function sortSenses(senses) {
  return senses.sort(
    (a, b) =>
      (POS_PRIORITY.indexOf(a.partOfSpeech) + 1 || 99) -
      (POS_PRIORITY.indexOf(b.partOfSpeech) + 1 || 99),
  );
}

/**
 * @returns {import("./schema.d.ts").WordEntry | null}
 */
export function buildEntry(entry) {
  const word = entry.word.toLowerCase();
  const senses = [];

  for (const etymology of entry.etymologies ?? []) {
    for (const pos of etymology.partsOfSpeech ?? []) {
      const partOfSpeech = (pos.partOfSpeech ?? "").toLowerCase();
      for (const sense of pos.senses ?? []) {
        const parsed = parseSense(sense, partOfSpeech, word);
        if (parsed) senses.push(parsed);
      }
    }
  }

  if (!senses.length) return null;

  sortSenses(senses);
  const primary = senses[0];

  return {
    word,
    partOfSpeech: primary.partOfSpeech,
    definition: primary.definition,
    source: primary.source,
    tags: primary.tags,
    examples: primary.examples,
    date: primary.date,
    senses,
  };
}

/** @deprecated use buildEntry */
export function pickBestSense(entry) {
  return buildEntry(entry);
}

/** Flatten tags from a sense for filtering/logging. */
export function tagLabels(sense) {
  return (sense.tags ?? []).map((t) =>
    typeof t === "string" ? t : t.label,
  );
}

/** Remove leading parentheticals from display text (legacy helper). */
export function stripLeadingParenTags(text) {
  return extractLeadingParenTags(text).text;
}
