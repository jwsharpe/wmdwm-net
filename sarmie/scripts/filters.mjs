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
  "carbohydrate",
  "heraldry",
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
  "pharmaceutical",
  "pharmaceutical effect",
  "pharmaceutical drug",
  "pharmaceutical drugs",
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
  "economics",
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
  "by extension",
  "gui",
]);

/** Register tags: dated or low-value senses for a general quiz. */
const REJECT_REGISTER_TAGS = new Set([
  "obsolete",
  "archaic",
  "historical",
  "dated",
  "rare",
  "now rare",
  "humorous",
  "originally us slang",
]);

const REJECT_WORDS = new Set([
  "cannot",
  "eucalyptus",
  "billfish",
  "unreflecting",
  "foretellable",
  "silliest",
  "codelss",
  "fadable",
]);

const MAX_DERIVED_SUFFIX_LEN = 12;

/** Post-build: drop headwords formed with a prefix when the stem is also in the list. */
export const STEM_PREFIX_RULES = [
  { prefix: "de", minStemLen: 3 },
  { prefix: "un", minStemLen: 3 },
  { prefix: "counter", minStemLen: 3 },
];

const SYMBOL_NOTATION = /\(symbol\s*:?\s*[^)]+\)/i;

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
 * re-: glosses of the form “to X again”, “new/replace X”, etc. where X matches the stem (repew → pews).
 * -ly: circular adverb glosses (In an X manner/fashion/way, that is X, etc.).
 * -wise: “in the manner of a X” (catwise → cat).
 * -erly: gloss uses stem x (northerly → north); not *+ly false splits (cleverly).
 * -iest: gloss uses related -y stem (silliest → silly).
 * -ish: circular adjective glosses (Somewhat X, resembling X, like a X, etc.).
 * -ible: circular adjective glosses (Capable of being X, able to be X, etc.).
 * -able: circular adjective glosses where X matches the stem (abandonable → abandoned).
 * -ic: circular adjective glosses (in/of or pertaining to X, etc.) where X matches the stem.
 * -s: glosses that use the stem before -s (acrobatics → acrobatic; plurals of X).
 * -ing: circular participle glosses (That Xs, act of Xing, stem in gloss, etc.).
 * un-: glosses of the form "not X" where X matches the stem after un-.
 * im-: glosses of the form “lack of X” / “absence of X” where X matches the stem after im-.
 * counter-: glosses that name the stem or describe X in response to another X.
 * hyper-: glosses that name the stem or use excessive/abnormal meta wording.
 * out-: glosses that name the stem or use “surpass / better than” meta wording.
 * sub-: gloss uses stem x (“almost/under X”, part of X, or x in gloss).
 * pre-: glosses of the form “to X in advance” / “X in advance” where X matches the stem after pre-.
 * -al: glosses that use the related -e form (e.g. anecdotal → anecdote).
 * -ial: glosses that use the related -e stem (figurial → figure; authorial → author).
 * -ous: glosses that use the related -e form (e.g. courageous → courage).
 * -late: glosses that use the stem before -late (e.g. circulate → circles); not *plate.
 * -le: glosses that use the stem before -le (e.g. crumble → crumbs); not *jectile.
 * -olate: glosses that use the stem before -olate (e.g. lanceolate → lance).
 * -tive: gloss uses stem x ending in -l (accumulative → accumul).
 * -inity: glosses that use the stem before -inity (femininity → feminine); pairs with -o.
 * -o: gloss uses the stem before -o with -inity (virago → viraginity).
 * -iferous: gloss uses the stem before -iferous (carboniferous → carbon); base X whose gloss names X-iferous.
 * -y: gloss names stem x or “x-y” (fudgy → fudge; bantery → banter).
 * -ized/-ised: gloss uses the related -y stem (hierarchized → hierarchy; granitized → granite).
 * -dom: glosses that use the stem before -dom (e.g. artistdom → artists).
 * -ship: glosses of the form “of a/an X” / “office of X” where X matches the stem before -ship.
 * -ty (not -ity): gloss uses stem x (frailty → frail, subtlety → subtle).
 * -tor: glosses that use the matching -ate/-ating/-ting form (cohobator → cohobating).
 * -es: agent-style glosses like “someone that represses” (represses → repress).
 * -maker: gloss names the product as stem + s/es (bagmaker → bags). -smith: “maker of X” (hammersmith → hammers).
 * -man: gloss names the stem X (boatman → boat); not *human.
 * -ization: gloss uses the related -a/-ize stem (dramatization → drama, actualization → actual).
 * -ation (not -ization): gloss uses the related -ate stem (hesitation → hesitate).
 * -den (x+d+en): gloss uses stem x (harden → hard). -ize/-ise: “convert into X” or “treat with X” (morphinize → morphine).
 * -in: gloss uses paired -ic form (toxin → toxic, hepatotoxin → hepatotoxic); *toxin glosses citing toxin/toxic.
 * non-/mis-: “not X”, “wrong/poorly X”, etc. under-: “too little/not enough X”. uni-: “single X”. anti-/pseudo-/over-/super-/semi-/dis-: opposing, false, excessive, partial, negating glosses.
 * pre-/fore-: “before X”, “to X before/beforehand”; semi-: “somewhat X”; un-/de-: “remove/rid of X”; *-ed: related -e stem or “having a X” (flued → flue).
 * -ful/-less/-some/-oid/-hood/-proof/-free/-ee/-ism/-cy: circular glosses; -ically from x-y; x-by from x or x-s; base X citing X-ism.
 * non-: “not X”, “absence/lack of X”, etc.
 * @returns {string|null} reject reason
 */
export function selfReferenceReason(word, definition) {
  const w = word.toLowerCase();
  const d = definition.trim().replace(/\.+$/, "").toLowerCase();

  if (w.length >= MIN_SELF_REF_WORD_LEN) {
    const re = new RegExp(`\\b${escapeRegex(w)}\\b`, "i");
    if (re.test(d)) return "self-reference";
  }

  if (w.startsWith("uni") && w.length >= 7 && !UNI_PREFIX_SKIP.has(w)) {
    const reason = uniPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("un") && w.length >= 5) {
    const reason = unNotSelfReferenceReason(w, d);
    if (reason) return reason;
    const removeReason = prefixRemoveSelfReferenceReason(w, d, 2);
    if (removeReason) return removeReason;
  }

  if (w.startsWith("de") && w.length >= 5) {
    const removeReason = prefixRemoveSelfReferenceReason(w, d, 2);
    if (removeReason) return removeReason;
  }

  if (w.startsWith("non") && !w.startsWith("none") && w.length >= 6) {
    const reason = nonNotSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("mis") && w.length >= 6) {
    const reason = misPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("im") && w.length >= 6) {
    const reason = imPrefixLackSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("anti") && w.length >= 7) {
    const reason = antiPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("pseudo") && w.length >= 9) {
    const reason = pseudoPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("over") && w.length >= 7) {
    const reason = overPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("under") && w.length >= 8) {
    const reason = underPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("super") && w.length >= 8) {
    const reason = superPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("semi") && w.length >= 7) {
    const reason = semiPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("dis") && w.length >= 6) {
    const reason = disPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  for (const prefix of ["re", "un", "de"]) {
    const reason = prefixSelfReferenceReason(prefix, w, d);
    if (reason) return reason;
  }

  if (w.startsWith("re") && w.length >= 5) {
    const reason = rePrefixAgainSelfReferenceReason(w, d);
    if (reason) return reason;
    const renewReason = rePrefixRenewSelfReferenceReason(w, d);
    if (renewReason) return renewReason;
  }

  if (w.endsWith("erly") && w.length >= 7 && !ERLY_LY_SKIP.has(w)) {
    const reason = erlySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ically") && w.length >= 8) {
    const reason = icallySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ly") && w.length >= 5) {
    const reason = adverbLySelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("wise") && w.length >= 7) {
    const reason = wiseSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ish") && !w.endsWith("fish") && w.length >= 6) {
    const reason = adjectiveIshSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ful") && w.length >= 6) {
    const reason = fulSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("less") && w.length >= 7) {
    const reason = lessSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("some") && w.length >= 7) {
    const reason = someSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("by") && w.length >= 5 && !BY_SUFFIX_SKIP.has(w)) {
    const reason = bySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("oid") && w.length >= 6) {
    const reason = oidSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("iest") && w.length >= 7) {
    const reason = iestYSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("cy") && w.length >= 7) {
    const reason = cySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("y") && w.length >= 5) {
    const reason = ySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ible") && w.length >= 7) {
    const reason = adjectiveIbleSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("able") && w.length >= 7) {
    const reason = adjectiveAbleSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ic") && w.length >= 5) {
    const reason = adjectiveIcSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("es") && w.length >= 6) {
    const reason = esSuffixErSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("s") && w.length >= 5) {
    const reason = sSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ing") && w.length >= 7) {
    const reason = participleIngSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("counter") && !w.startsWith("counterfeit") && w.length >= 10) {
    const reason = counterPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("hyper") && w.length >= 8) {
    const reason = hyperPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("out") && w.length >= 7) {
    const reason = outPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("sub") && w.length >= 6) {
    const reason = subPrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("pre") && w.length >= 6) {
    const reason = prePrefixAdvanceSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.startsWith("fore") && w.length >= 6) {
    const reason = forePrefixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ial") && w.length >= 7) {
    const reason = adjectiveIalESelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("al") && w.length >= 6) {
    const reason = adjectiveAlESelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ous") && !w.endsWith("iferous") && w.length >= 6) {
    const reason = adjectiveOusESelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ed") && !w.endsWith("eed") && w.length >= 5) {
    const reason = adjectiveEdESelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("late") && !w.endsWith("plate") && w.length >= 7) {
    const reason = lateSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("olate") && w.length >= 8) {
    const reason = olateSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("tive") && w.length >= 7) {
    const reason = tiveSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("inity") && w.length >= 7) {
    const reason = initySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ty") && !w.endsWith("ity") && w.length >= 6) {
    const reason = tySuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("o") && w.length >= 5) {
    const reason = oSuffixInitySelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("iferous") && w.length >= 9) {
    const reason = iferousSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (!w.endsWith("iferous") && w.length >= 5) {
    const reason = baseIferousSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (!w.endsWith("ism") && w.length >= 5) {
    const reason = baseIsmSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("le") && w.length >= 6) {
    const reason = leSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("dom") && w.length >= 6) {
    const reason = domSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("hood") && w.length >= 7) {
    const reason = hoodSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ship") && w.length >= 7) {
    const reason = shipSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("er") && w.length >= 5) {
    const reason = erSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("tor") && w.length >= 7) {
    const reason = torSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("maker") && w.length >= 8) {
    const reason = makerSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("smith") && w.length >= 8) {
    const reason = smithSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("man") && !w.endsWith("human") && w.length >= 6) {
    const reason = manSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (
    (w.endsWith("ization") || w.endsWith("isation")) &&
    w.length >= 11
  ) {
    const reason = izationSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (
    w.endsWith("ation") &&
    !w.endsWith("ization") &&
    !w.endsWith("isation") &&
    w.length >= 9
  ) {
    const reason = ationSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("proof") && w.length >= 8) {
    const reason = proofSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("free") && w.length >= 7) {
    const reason = freeSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ee") && w.length >= 6) {
    const reason = eeSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ism") && w.length >= 7) {
    const reason = ismSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("den") && w.length >= 6) {
    const reason = denSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ized") && w.length >= 8) {
    const reason = izedSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("ised") && w.length >= 8) {
    const reason = izedSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if ((w.endsWith("ize") || w.endsWith("ise")) && w.length >= 7) {
    const reason = izeSuffixSelfReferenceReason(w, d);
    if (reason) return reason;
  }

  if (w.endsWith("in") && w.length >= 5) {
    const reason = inSuffixSelfReferenceReason(w, d);
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

function unNotSelfReferenceReason(w, d) {
  const stem = w.slice(2);
  if (stem.length < 3) return null;

  const notMatch = d.match(/^not ([\w-]+)/);
  if (!notMatch) return null;

  if (adjectiveMatchesLyStem(notMatch[1], stem, w)) {
    return "un-not";
  }

  return null;
}

/** un-/de- headwords whose gloss says “remove X” or “rid of X” (deflea → rid of fleas). */
function prefixRemoveSelfReferenceReason(w, d, prefixLen) {
  const prefix = w.slice(0, prefixLen);
  const stem = w.slice(prefixLen);
  if (stem.length < 3) return null;

  const tag = `${prefix}-remove`;

  const toRemoveWord = d.match(/^to remove (?:the |a |an )?([\w-]+)/);
  if (toRemoveWord && adjectiveMatchesLyStem(toRemoveWord[1], stem, w)) {
    return tag;
  }

  const toRemovePhrase = d.match(/^to remove (?:the |a |an )?(.+?)(?: from\b|,|;|\.|$)/);
  if (toRemovePhrase && phraseMatchesStem(toRemovePhrase[1], stem, w)) {
    return tag;
  }

  if (/^to remove\b/.test(d)) {
    const fromMatch = d.match(/\bfrom (?:a |an |the )?([\w-]+)\b/);
    if (fromMatch && adjectiveMatchesLyStem(fromMatch[1], stem, w)) {
      return tag;
    }
  }

  const toRidOf = d.match(/^to rid of (?:the |a |an )?([\w-]+)/);
  if (toRidOf && adjectiveMatchesLyStem(toRidOf[1], stem, w)) {
    return `${prefix}-rid-of`;
  }

  for (const m of d.matchAll(/\brid of (?:the |a |an )?(\w+)/gi)) {
    if (adjectiveMatchesLyStem(m[1], stem, w)) return `${prefix}-rid-of`;
  }

  for (const m of d.matchAll(/\bremoval of (?:the |a |an )?(\w+)/gi)) {
    if (adjectiveMatchesLyStem(m[1], stem, w)) return tag;
  }

  return null;
}

const NON_ABSENCE_CAPTURE_PATTERNS = [
  [/^(?:the )?absence of (?:a |an |the )?([\w-]+)/i, "non-absence"],
  [/^(?:the )?lack of (?:a |an |the )?([\w-]+)/i, "non-lack"],
  [/\babsence of (?:a |an |the )?([\w-]+)/gi, "non-absence"],
  [/\black of (?:a |an |the )?([\w-]+)/gi, "non-lack"],
  [/^failure to ([\w-]+)/i, "non-failure"],
  [/^without ([\w-]+)/i, "non-without"],
];

/** non- headwords whose gloss says “not X” or “absence/lack of X” (nonabsorption → absence of absorption). */
function nonNotSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3) return null;

  const notMatch = d.match(/^not ([\w-]+)/);
  if (notMatch && adjectiveMatchesLyStem(notMatch[1], stem, w)) {
    return "non-not";
  }

  for (const [re, reason] of NON_ABSENCE_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
        if (phraseMatchesStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (!m) continue;
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      if (phraseMatchesStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:absence|lack|without|failure to|devoid of|free from)\b/.test(d)
  ) {
    return "non-stem-reference";
  }

  return null;
}

const MIS_META_CAPTURE_PATTERNS = [
  [/^wrong ([\w-]+)/, "mis-wrong"],
  [/^incorrect ([\w-]+)/, "mis-incorrect"],
  [/^bad ([\w-]+)/, "mis-bad"],
  [/^badly ([\w-]+)/, "mis-badly"],
  [/^improper(?:ly)? ([\w-]+)/, "mis-improper"],
  [/^wrongly ([\w-]+)/, "mis-wrongly-start"],
  [/^to ([\w-]+) (?:in|the) (?:a )?wrong (?:way|manner)/, "mis-wrong-way"],
  [/^to ([\w-]+) incorrectly\b/, "mis-incorrectly"],
  [
    /^to ([\w-]+) (?:wrongly|poorly|badly|improperly|unsuitably|incorrectly)\b/,
    "mis-to-adverb",
  ],
  [
    /\bto ([\w-]+) (?:wrongly|poorly)(?: or (?:poorly|unsuitably|badly))?\b/gi,
    "mis-to-wrongly",
  ],
  [/\b(\w+) wrongly(?: or (?:poorly|unsuitably|badly))?\b/gi, "mis-stem-wrongly"],
  [/\bto ([\w-]+)(?:\s*\([^)]*\))*\s+incorrectly\b/gi, "mis-to-incorrectly"],
  [/\bto give bad (\w+)\b/gi, "mis-give-bad"],
  [/\bfalsely (\w+)/gi, "mis-falsely"],
  [/\bmistaken(?:ly)? (\w+)/gi, "mis-mistaken"],
  [/\bincorrect (\w+)/gi, "mis-incorrect-mid"],
];

/** Verb stem vs related noun in gloss (misadvise → advice). */
function misStemMatchesGlossWord(word, stem, w) {
  if (adjectiveMatchesLyStem(word, stem, w)) return true;
  if (phraseMatchesStem(word, stem, w)) return true;
  if (stem.endsWith("ise") && word === stem.slice(0, -3) + "ice") return true;
  if (stem.endsWith("ize") && word === stem.slice(0, -3) + "ice") return true;
  return false;
}

/** mis- headwords whose gloss names the stem as wrong, bad, poorly, or incorrect. */
function misPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3) return null;

  for (const [re, reason] of MIS_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (misStemMatchesGlossWord(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (!m) continue;
      if (misStemMatchesGlossWord(m[1], stem, w)) return reason;
    }
  }

  const misNoun = d.match(/^mis([\w-]+)/);
  if (misNoun && adjectiveMatchesLyStem(misNoun[1], stem, w)) {
    return "mis-noun";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:wrong|incorrect|improper|bad(?:ly)?|mistaken|poor(?:ly)?)\b/.test(d)
  ) {
    return "mis-stem-reference";
  }

  return null;
}

const UNDER_META_CAPTURE_PATTERNS = [
  [/^to ([\w-]+) (?:too little|insufficiently)\b/gi, "under-to-little"],
  [/\btoo little (\w+)/gi, "under-too-little"],
  [/\bnot enough (\w+)/gi, "under-not-enough"],
  [/\binsufficiently (\w+)/gi, "under-insufficiently"],
  [/\binsufficient (\w+)/gi, "under-insufficient"],
  [/\bbelow (?:the )?(?:normal|usual|expected) (?:level of )?(\w+)/gi, "under-below"],
];

/** under- headwords whose gloss says “too little / not enough X” (underbake → bake insufficiently). */
function underPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(5);
  if (stem.length < 3) return null;

  const lessThan = d.match(/^to (.+?) less than (?:expected|normal|usual|needed)\b/);
  if (lessThan && phraseMatchesStem(lessThan[1], stem, w)) {
    return "under-less-than";
  }

  const achievement = d.match(/\b(\w+) that is less than expected\b/);
  if (achievement && adjectiveMatchesLyStem(achievement[1], stem, w)) {
    return "under-less-than-noun";
  }

  for (const [re, reason] of UNDER_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:too little|not enough|insufficient|less than (?:expected|normal|usual|needed))\b/.test(
      d,
    )
  ) {
    return "under-stem-reference";
  }

  return null;
}

const ANTI_META_CAPTURE_PATTERNS = [
  [/\bagainst (?:a |an |the )?(\w+)/gi, "anti-against"],
  [/\bopposing (?:a |an |the )?(\w+)/gi, "anti-opposing"],
  [/\bopposed to (?:a |an |the )?(\w+)/gi, "anti-opposed"],
  [/\bthat (?:inhibits|prevents|counteracts|neutralizes) (\w+)/gi, "anti-inhibits"],
  [/\bhostile to (?:a |an |the )?(\w+)/gi, "anti-hostile"],
];

function antiPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(4);
  if (stem.length < 3) return null;

  for (const [re, reason] of ANTI_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

const PSEUDO_META_CAPTURE_PATTERNS = [
  [/\bfalse (\w+)/gi, "pseudo-false"],
  [/\bnot (?:a )?genuine (\w+)/gi, "pseudo-not-genuine"],
  [/\bnot (?:a )?true (\w+)/gi, "pseudo-not-true"],
  [/\bpseudo[- ](\w+)/gi, "pseudo-pseudo"],
  [/\bpretending to be (?:a |an )?(\w+)/gi, "pseudo-pretending"],
  [/\bfeigned (\w+)/gi, "pseudo-feigned"],
];

function pseudoPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(6);
  if (stem.length < 3) return null;

  for (const [re, reason] of PSEUDO_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:false|fake|feigned|pretend|spurious|sham)\b/.test(d)
  ) {
    return "pseudo-stem-reference";
  }

  return null;
}

const OVER_META_PATTERNS = [
  /^overly /,
  /^too much /,
  /^excessive(?:ly)? /,
  /^excess /,
  / more than (?:is )?(?:normal|usual|needed|required)/,
  / in excess of/,
];

function overPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(4);
  if (stem.length < 3) return null;

  for (const re of OVER_META_PATTERNS) {
    if (re.test(d)) return "over-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "over-stem-reference";

  return null;
}

const SUPER_META_PATTERNS = [
  /^excessively /,
  /^extremely /,
  /^very (?:great|high|large|strong) /,
  / above (?:the )?normal/,
  / more than (?:usual|normal)/,
  /^beyond (?:the )?usual/,
];

function superPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(5);
  if (stem.length < 3) return null;

  for (const re of SUPER_META_PATTERNS) {
    if (re.test(d)) return "super-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "super-stem-reference";

  return null;
}

const SEMI_META_CAPTURE_PATTERNS = [
  [/\bsomewhat (\w+)/gi, "semi-somewhat"],
  [/\bslightly (\w+)/gi, "semi-slightly"],
  [/\bhalf(?:way)? (\w+)/gi, "semi-half"],
  [/\bpartly (\w+)/gi, "semi-partly"],
  [/\bpartially (\w+)/gi, "semi-partially"],
  [/\bsemi[- ](\w+)/gi, "semi-semi"],
];

function semiPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(4);
  if (stem.length < 3) return null;

  for (const [re, reason] of SEMI_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

/** Headwords spelled “uni…” but not the uni- “single X” prefix. */
const UNI_PREFIX_SKIP = new Set([
  "unique",
  "unit",
  "union",
  "unity",
  "unite",
  "united",
  "uniform",
  "universe",
  "universal",
  "university",
  "unix",
]);

const UNI_SINGLE_CAPTURE_PATTERNS = [
  [/^a single[- ]?(\w+)/i, "uni-a-single"],
  [/^having(?:,? or involving)? a single (\w+)/i, "uni-having-single"],
  [/^of a single (\w+)/i, "uni-of-single"],
  [/^consisting of a single (\w+)/i, "uni-consisting"],
  [/^containing only a single (?:type of )?(\w+)/i, "uni-containing"],
  [/^made up of (?:one )?single (\w+)/i, "uni-made-up"],
  [/^knowing or using a single (\w+)/i, "uni-using-single"],
  [/\bcomprising a single (\w+)/gi, "uni-comprising"],
  [/\ba single (\w+)/gi, "uni-a-single-mid"],
  [/\bone single (\w+)/gi, "uni-one-single"],
  [/\bsingle[- ](\w+)/gi, "uni-single-hyphen"],
];

const UNI_STEM_SUFFIXES = [
  "aceous",
  "iform",
  "ulate",
  "linear",
  "lobed",
  "lobate",
  "nerved",
  "petalous",
  "cellular",
  "cameral",
  "central",
  "ciliate",
  "articulate",
  "auriculate",
  "bracteate",
  "bracteolate",
  "carinated",
  "colorate",
  "colorous",
  "globular",
  "facial",
  "focal",
  "personal",
  "sexual",
  "ous",
  "ate",
  "ular",
  "ine",
  "ose",
  "ive",
  "ent",
  "al",
  "ar",
  "ic",
];

function uniStemRoot(stem) {
  for (const suf of UNI_STEM_SUFFIXES) {
    if (stem.endsWith(suf) && stem.length > suf.length + 2) {
      return stem.slice(0, -suf.length);
    }
  }
  return stem;
}

function uniStemMatches(captured, stem, w) {
  if (adjectiveMatchesLyStem(captured, stem, w)) return true;
  if (phraseMatchesStem(captured, stem, w)) return true;
  if (captured.length >= 4 && stem.startsWith(captured)) return true;
  const root = uniStemRoot(stem);
  if (root.length >= 3 && captured.startsWith(root)) return true;
  return false;
}

/** uni- headwords whose gloss says “single X” (uniaxial → single axis). */
function uniPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3 || !/\bsingle\b/.test(d)) return null;

  for (const [re, reason] of UNI_SINGLE_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (uniStemMatches(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && uniStemMatches(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "uni-stem-single";

  const words = d.match(/[\w-]+/g) || [];
  for (const word of words) {
    if (word === "single" || word.length < 3) continue;
    if (uniStemMatches(word, stem, w)) return "uni-single-word";
  }

  return null;
}

/** dis- headwords whose gloss negates the stem (dishonest → not honest). */
function disPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 4) return null;

  const notMatch = d.match(/^not ([\w-]+)/);
  if (notMatch && adjectiveMatchesLyStem(notMatch[1], stem, w)) {
    return "dis-not";
  }

  const lack = d.match(/^(?:a |an )?lack of ([\w-]+)/);
  if (lack && adjectiveMatchesLyStem(lack[1], stem, w)) {
    return "dis-lack";
  }

  const opposite = d.match(/^opposite of ([\w-]+)/);
  if (opposite && adjectiveMatchesLyStem(opposite[1], stem, w)) {
    return "dis-opposite";
  }

  const reverse = d.match(/^reverse of ([\w-]+)/);
  if (reverse && adjectiveMatchesLyStem(reverse[1], stem, w)) {
    return "dis-reverse";
  }

  return null;
}

/** im- headwords whose gloss says “lack of X” (immotility → lack of motility). */
const IM_LACK_CAPTURE_PATTERNS = [
  [/\b(?:a |an |the )?lack of (?:a |an |the )?(\w+)/gi, "im-lack"],
  [/\black or absence of (?:a |an |the )?(\w+)/gi, "im-lack-absence"],
  [/\babsence of (?:a |an |the )?(\w+)/gi, "im-absence"],
];

function imPrefixLackSelfReferenceReason(w, d) {
  const stem = w.slice(2);
  if (stem.length < 4) return null;

  for (const [re, reason] of IM_LACK_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
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

function phraseMatchesStem(phrase, stem, w) {
  const words = phrase.toLowerCase().match(/[\w-]+/g);
  if (!words) return false;
  return words.some((word) => adjectiveMatchesLyStem(word, stem, w));
}

/** re- headwords whose gloss only says “to X again” / “X again or anew” (reaccelerate → accelerate again). */
function rePrefixAgainSelfReferenceReason(w, d) {
  const stem = w.slice(2);
  if (stem.length < 4) return null;

  const toAgain = d.match(/^to (.+?) again\b/);
  if (toAgain) {
    if (phraseMatchesStem(toAgain[1], stem, w)) return "re-to-stem-again";
    if (/\bonce again\s*$/.test(toAgain[1]) || toAgain[1].length <= 45) {
      return "re-to-again";
    }
  }

  if (/^to .+ once again\b/.test(d)) return "re-to-once-again";

  const toAnew = d.match(/^to (.+?) anew\b/);
  if (toAnew && phraseMatchesStem(toAnew[1], stem, w)) return "re-to-anew";

  const startNoun = d.match(/^(\w+) again(?:\b|[,;]|\s+of|\s+or)/);
  if (startNoun && adjectiveMatchesLyStem(startNoun[1], stem, w)) {
    return "re-noun-again";
  }

  const startPhrase = d.match(/^(.{1,50}?) again or anew\b/);
  if (startPhrase && phraseMatchesStem(startPhrase[1], stem, w)) {
    return "re-phrase-anew";
  }

  const second = d.match(/^(?:a |an )?second or subsequent (\w+)\b/);
  if (second && adjectiveMatchesLyStem(second[1], stem, w)) {
    return "re-second";
  }

  const inline = d.match(/^.{0,60}\b(\w+) again or anew\b/);
  if (inline && adjectiveMatchesLyStem(inline[1], stem, w)) {
    return "re-inline-anew";
  }

  const verbStart = d.match(/^(\w+) again[,;]/);
  if (verbStart && adjectiveMatchesLyStem(verbStart[1], stem, w)) {
    return "re-verb-again";
  }

  return null;
}

const RE_RENEW_CAPTURE_PATTERNS = [
  [
    /^to (?:furnish|provide|fit|supply|equip) (?:\w+ )?with (?:a |an |the )?new (\w+)/gi,
    "re-furnish-new",
  ],
  [/^to replace (?:the |a |an )?(\w+)/gi, "re-replace"],
  [/^to renew (?:the |a |an )?(\w+)/gi, "re-renew"],
  [
    /^to repair .{0,50}by replacing (?:the |a |an )?(\w+)/gi,
    "re-repair-replace",
  ],
  [/\bwith (?:a |an |the )?new (\w+)/gi, "re-with-new"],
  [/^to re[- ]?(\w+)\b/gi, "re-to-re"],
];

function adjectiveMatchesLyStem(adj, stem, w) {
  if (!adj || !stem) return false;
  return (
    adj === stem ||
    adj.startsWith(stem) ||
    stem.startsWith(adj) ||
    w.startsWith(adj)
  );
}

/** re- headwords whose gloss names the stem with new/replace/renew (repew → new pews). */
function rePrefixRenewSelfReferenceReason(w, d) {
  const stem = w.slice(2);
  if (stem.length < 3) return null;

  for (const [re, reason] of RE_RENEW_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

/** *+ly headwords spelled *erly that are not x+erly (cleverly, gingerly, etc.). */
const ERLY_LY_SKIP = new Set([
  "biquarterly",
  "cleverly",
  "disorderly",
  "gingerly",
  "lubberly",
  "sheerly",
  "sunderly",
  "unsoldierly",
  "weatherly",
]);

const ERLY_DIRECTION_CAPTURE_PATTERNS = [
  [/\b(?:facing|pointing towards?) (?:the )?(\w+)/gi, "erly-facing"],
  [/\bdirected towards? (?:the )?(\w+)/gi, "erly-directed"],
  [/\bsituated in,? or pointing (?:to|towards?) (?:the )?(\w+)/gi, "erly-situated"],
];

/** *-erly: gloss uses stem x (northerly → north; northeasterly → northeast). */
function erlySuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 3) return null;

  for (const [re, reason] of ERLY_DIRECTION_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      if (phraseMatchesStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "erly-stem-reference";

  return null;
}

const ICALLY_META_CAPTURE_PATTERNS = [
  [/\bin terms of (\w+)/gi, "ically-in-terms"],
  [/\bby means of (\w+)/gi, "ically-by-means"],
  [/\bin an? (\w+) (?:manner|way|fashion|sense)\b/gi, "ically-manner"],
  [/\bwith respect to (\w+)/gi, "ically-with-respect"],
  [/\bfrom the perspective of (\w+)/gi, "ically-perspective"],
  [/\bwith reference to (\w+)/gi, "ically-reference"],
  [/\b(?:related|pertaining) to (\w+)/gi, "ically-related"],
  [
    /\b(?:as part of|during) (?:a |an |the )?(\w+) (?:process|period|cycle)\b/gi,
    "ically-process",
  ],
];

/** Related *-y stems for *-ically adverbs (agrogeologically → agrogeology). */
function icallyYStems(w) {
  if (!w.endsWith("ically") || w.length < 8) return null;

  const base = w.slice(0, -7);
  const forms = new Set();
  if (base.length >= 4) {
    forms.add(base);
    forms.add(`${base}y`);
  }
  if (base.endsWith("ic") && base.length >= 5) {
    const root = base.slice(0, -2);
    forms.add(root);
    forms.add(`${root}y`);
  }
  if (base.endsWith("ical") && base.length >= 6) {
    const root = base.slice(0, -4);
    forms.add(root);
    forms.add(`${root}y`);
  }
  if (base.endsWith("etric") && base.length >= 7) {
    forms.add(`${base.slice(0, -5)}etry`);
  }
  if (base.endsWith("log") && base.length >= 5) {
    forms.add(`${base}y`);
    forms.add(`${base}ology`);
    forms.add(`${base}ical`);
    forms.add(`${base}ic`);
  }
  if (base.length >= 5) {
    forms.add(`${base}ic`);
    forms.add(`${base}ical`);
    forms.add(`${base}ics`);
    forms.add(`${base}ology`);
    forms.add(`${base}y`);
  }
  if (base.endsWith("ic") && base.length >= 5) {
    const root = base.slice(0, -2);
    forms.add(root);
    forms.add(`${root}y`);
    forms.add(`${root}ics`);
  }
  if (base.endsWith("om") && base.length >= 5) {
    forms.add(`${base}y`);
    forms.add(`${base}ics`);
    forms.add(`${base}omy`);
  }

  return [...forms].filter((s) => s.length >= 4);
}

/** *-ically: gloss uses related *-y stem or “x-y” (agrogeologically → agrogeology). */
function icallySuffixSelfReferenceReason(w, d) {
  const stems = icallyYStems(w);
  if (!stems) return null;

  for (const form of stems) {
    const stemY = new RegExp(`\\b${escapeRegex(form)}[- ]?y\\b`, "i");
    if (stemY.test(d)) return "ically-stem-y";
  }

  for (const [re, reason] of ICALLY_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      for (const form of stems) {
        if (adjectiveMatchesLyStem(m[1], form, w)) return reason;
      }
    }
  }

  for (const form of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (!stemWord.test(d)) continue;
    if (
      /\b(?:terms of|means of|manner|sense|perspective|respect|reference to|pertaining|related to|process|period)\b/.test(
        d,
      )
    ) {
      return "ically-stem-reference";
    }
  }

  return null;
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

const WISE_MANNER_CAPTURE_PATTERNS = [
  [
    /\b(?:in |with )?the manner of (?:a |an |the )?([\w\s-]{1,40}?)(?:[,;.]|\s+or\b|\s+and\b|$)/gi,
    "wise-manner-of",
  ],
];

function wiseStemMatches(captured, stem, w) {
  if (phraseMatchesStem(captured, stem, w)) return true;
  const head = captured.trim().split(/\s+/)[0];
  if (adjectiveMatchesLyStem(head, stem, w)) return true;
  return false;
}

/** *-wise: gloss says “in the manner of a X” (catwise → cat; crabwise → crab). */
function wiseSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 3) return null;

  for (const [re, reason] of WISE_MANNER_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (wiseStemMatches(m[1], stem, w)) return reason;
    }
  }

  return null;
}

function adjectiveIshSelfReferenceReason(w, d) {
  const stem = w.slice(0, -3);
  if (stem.length < 3) return null;

  const somewhat = d.match(/^somewhat (\w+)/);
  if (somewhat && adjectiveMatchesLyStem(somewhat[1], stem, w)) {
    return "ish-somewhat";
  }

  const resembling = d.match(
    /resembling or (?:likened to |characteristic of )(?:a |an |the )?(\w+)/,
  );
  if (resembling && adjectiveMatchesLyStem(resembling[1], stem, w)) {
    return "ish-resembling";
  }

  const like = d.match(/^like (?:a |an |the )?(\w+)/);
  if (like && adjectiveMatchesLyStem(like[1], stem, w)) {
    return "ish-like";
  }

  const characteristic = d.match(/characteristic of (?:a |an |the )?(\w+)/);
  if (
    characteristic &&
    adjectiveMatchesLyStem(characteristic[1], stem, w)
  ) {
    return "ish-characteristic";
  }

  const stemLike = new RegExp(`\\b${escapeRegex(stem)}-like\\b`, "i");
  if (stemLike.test(d)) return "ish-stem-like";

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "ish-stem-reference";

  return null;
}

/** Wiktionary circular glosses for -ible adjectives (Capable of being X, able to be X, …). */
const IBLE_META_PATTERNS = [
  /^capable of being \w+/,
  /^able to be \w+/,
  /^that can be \w+/,
  /^liable to be \w+/,
  /^which can be \w+/,
  /^(?:fit|worthy) to be \w+/,
  /^not able to be \w+/,
  /^capable or deserving to be \w+/,
  /^(?:capable|deserving) or (?:capable|deserving) to be \w+/,
  /\bcapable of being \w+/,
  /\bable to be \w+/,
  /\bthat can be \w+/,
  /\bnot able to be \w+/,
  /(?:capable|deserving)[^.]{0,50}\bto be \w+/,
];

function adjectiveIbleSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  for (const re of IBLE_META_PATTERNS) {
    if (re.test(d)) return "ible-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "ible-stem-reference";

  return null;
}

/** Circular glosses for -able adjectives when X matches the stem (abandonable → abandoned). */
const ABLE_META_CAPTURE_PATTERNS = [
  [/\bcapable of being (\w+)/gi, "able-capable"],
  [/\bable to be (\w+)/gi, "able-to-be"],
  [/\bthat can be (\w+)/gi, "able-that-can"],
  [/\bliable to be (\w+)/gi, "able-liable"],
  [/\bwhich can be (\w+)/gi, "able-which"],
  [/\b(?:fit|worthy) to be (\w+)/gi, "able-fit"],
  [/\bnot able to be (\w+)/gi, "able-not"],
];

function adjectiveAbleSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  for (const [re, reason] of ABLE_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "able-stem-reference";

  return null;
}

/** Circular glosses for -ic adjectives when X matches the stem (biologic → biology). */
const IC_META_CAPTURE_PATTERNS = [
  [/\bin,? of or pertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-in-of-pertaining"],
  [/\bof or pertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-of-pertaining"],
  [/\bpertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-pertaining"],
  [/\bof or relating to,?\s*(?:a |an |the )?(\w+)/gi, "ic-of-relating"],
  [/\brelating to,?\s*(?:a |an |the )?(\w+)/gi, "ic-relating"],
  [/\brelating,? or pertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-relating-pertaining"],
  [/\bor pertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-or-pertaining"],
  [/\bhaving,? or pertaining to,?\s*(?:a |an |the )?(\w+)/gi, "ic-having-pertaining"],
];

function adjectiveIcSelfReferenceReason(w, d) {
  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  for (const [re, reason] of IC_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

/** Not plural *-s forms (physics, famous, glass, etc.). */
const S_SUFFIX_SKIP = /(?:ss|us|is|ous|ics|less|ness|ways)$/i;

function sPluralStems(w) {
  if (!w.endsWith("s") || w.length < 5 || S_SUFFIX_SKIP.test(w)) return null;

  const stems = new Set([w.slice(0, -1)]);
  if (w.endsWith("ies") && w.length > 5) stems.add(`${w.slice(0, -3)}y`);
  if (w.endsWith("ves") && w.length > 5) stems.add(`${w.slice(0, -3)}f`);
  if (w.endsWith("es") && w.length > 6 && !w.endsWith("ies")) {
    stems.add(w.slice(0, -2));
  }
  return [...stems].filter((s) => s.length >= 4);
}

const S_META_CAPTURE_PATTERNS = [
  [/(?:^|\b)(?:\w+ )*plural of (?:a |an |the )?(\w+)/gi, "s-plural"],
  [/(?:^|\b)(?:\w+ )*singular of (\w+)/gi, "s-singular"],
];

/** *-s headwords whose gloss uses the stem before -s (bitters → bitter). */
function sSuffixSelfReferenceReason(w, d) {
  const stems = sPluralStems(w);
  if (!stems) return null;

  for (const [re, reason] of S_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (stems.some((stem) => adjectiveMatchesLyStem(m[1], stem, w))) {
        return reason;
      }
    }
  }

  for (const stem of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "s-stem-reference";
  }

  return null;
}

/** Circular glosses for -ing participles (That Xs, act of Xing, stem/stem+ing in gloss). */
const ING_META_PATTERNS = [
  /^that \w+/,
  /^tending to \w+/,
  /^causing \w+/,
  /^feeling or showing \w+/,
  /^showing \w+/,
  /^having the power to \w+/,
  /^(an |the )?act (of|in which)/,
  /instance in which someone \w+/,
  /^while being \w+/,
  /^the action of \w+/,
];

function participleIngSelfReferenceReason(w, d) {
  const stem = w.slice(0, -3);
  if (stem.length < 4) return null;

  for (const re of ING_META_PATTERNS) {
    if (re.test(d)) return "ing-meta";
  }

  const stemIng = new RegExp(`\\b${escapeRegex(stem)}ing\\b`, "i");
  if (stemIng.test(d)) return "ing-stem-ing";

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "ing-stem-reference";

  return null;
}

const COUNTER_META_PATTERNS = [
  /\bin response to another\b/,
  /\bin opposition to another\b/,
  /\bthat counteracts?\b/,
  /\bopposes? another\b/,
  /\bgoes against another\b/,
  /\bopposing (the )?other\b/,
  /\bcontrary to another\b/,
  /\bin reply to another\b/,
];

function counterPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(7);
  if (stem.length < 3) return null;

  for (const re of COUNTER_META_PATTERNS) {
    if (re.test(d)) return "counter-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "counter-stem-reference";

  return null;
}

const HYPER_META_PATTERNS = [
  /^excessively /,
  /^excessive /,
  /^abnormally /,
  /^an abnormally /,
  /^an increased rate of /,
  /^greater than (the )?normal/,
];

function hyperPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(5);
  if (stem.length < 3) return null;

  for (const re of HYPER_META_PATTERNS) {
    if (re.test(d)) return "hyper-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\b`, "i");
  if (stemWord.test(d)) return "hyper-stem-reference";

  const hyperStem = new RegExp(`\\bhyper${escapeRegex(stem)}\\w*\\b`, "i");
  if (hyperStem.test(d)) return "hyper-prefix-stem";

  return null;
}

const OUT_META_PATTERNS = [
  /^to surpass in /,
  /^to exceed in /,
  /^to outdo in /,
  /^to have more .+ than /,
  / better than/,
  / louder or longer than/,
  / more or (?:worse )?/,
  /^to surpass /,
];

function outPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3) return null;

  for (const re of OUT_META_PATTERNS) {
    if (re.test(d)) return "out-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\b`, "i");
  if (stemWord.test(d)) return "out-stem-reference";

  const outStem = new RegExp(`\\bout${escapeRegex(stem)}\\w*\\b`, "i");
  if (outStem.test(d)) return "out-prefix-stem";

  return null;
}

/** sub- headwords whose gloss uses stem x (subaccount → account; subalate → alate). */
const SUB_META_CAPTURE_PATTERNS = [
  [/\balmost or imperfectly (\w+)/gi, "sub-almost-imperfectly"],
  [/\balmost or partly (\w+)/gi, "sub-almost-partly"],
  [/\balmost (\w+)/gi, "sub-almost"],
  [/\ban under (\w+)/gi, "sub-an-under"],
  [/\blying under(?: the)? (\w+)/gi, "sub-lying-under"],
  [/\bunder(?: the)? (\w+)/gi, "sub-under"],
  [/\bbeneath(?: the)? (\w+)/gi, "sub-beneath"],
  [/\bsubordinate (?:to )?(?:a |an |the )?(\w+)/gi, "sub-subordinate"],
  [
    /\b(?:making up|forming) part of (?:a |an |the )?(\w+)/gi,
    "sub-making-up-part",
  ],
  [/\bpart of (?:a |an |the )?(\w+)/gi, "sub-part-of"],
  [/\bsubset of (?:a |an |the )?(\w+)/gi, "sub-subset-of"],
  [/\blesser (?:\w+ ){0,6}than (\w+)/gi, "sub-lesser-than"],
  [/\bsmaller (?:\w+ ){0,6}than (\w+)/gi, "sub-smaller-than"],
];

function subPrefixSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3) return null;

  for (const [re, reason] of SUB_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      if (phraseMatchesStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "sub-stem-reference";

  return null;
}

/** pre- headwords whose gloss says “before X” or “to X in advance” (prepay → before pay). */
const PRE_ADVANCE_CAPTURE_PATTERNS = [
  [/\bto (\w+) in advance\b/gi, "pre-to-in-advance"],
  [/\b(\w+) in advance\b/gi, "pre-in-advance"],
  [/\bin advance of (?:the )?(?:a |an |main )?(\w+)/gi, "pre-advance-of"],
  [/\bprior to (?:the )?(?:a |an |main )?(\w+)/gi, "pre-prior-to"],
];

const PRE_BEFORE_CAPTURE_PATTERNS = [
  [/^before (?:a |an |the )?([\w-]+)/, "pre-before"],
  [/\bbefore (?:a |an |the )?(\w+)/gi, "pre-before-mid"],
  [/\b(\w+) before\b/gi, "pre-stem-before"],
  [/\bpreceding (?:the )?(?:a |an |the )?(\w+)/gi, "pre-preceding"],
  [/\bearlier than (?:the )?(?:a |an |the )?(\w+)/gi, "pre-earlier"],
];

function prePrefixAdvanceSelfReferenceReason(w, d) {
  const stem = w.slice(3);
  if (stem.length < 3) return null;

  for (const [re, reason] of PRE_BEFORE_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const toAdvance = d.match(/^to (.+?) in advance\b/);
  if (toAdvance && phraseMatchesStem(toAdvance[1], stem, w)) {
    return "pre-to-phrase-in-advance";
  }

  const toBeforehand = d.match(/^to (.+?) beforehand\b/);
  if (toBeforehand && phraseMatchesStem(toBeforehand[1], stem, w)) {
    return "pre-to-beforehand";
  }

  const startAdvance = d.match(/^(.+?) in advance\b/);
  if (startAdvance && phraseMatchesStem(startAdvance[1], stem, w)) {
    return "pre-phrase-in-advance";
  }

  for (const [re, reason] of PRE_ADVANCE_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

/** Stems for *-ial: gloss uses related -e noun (figurial → figure; authorial → author). */
function ialEStems(w) {
  const base = w.slice(0, -3);
  if (base.length < 4) return null;

  const forms = new Set([base]);
  if (!base.endsWith("e")) forms.add(`${base}e`);
  if (base.endsWith("i")) forms.add(`${base.slice(0, -1)}e`);
  return [...forms].filter((s) => s.length >= 4);
}

/** *-ial: gloss uses the related -e stem (not handled correctly by the generic *-al rule). */
function adjectiveIalESelfReferenceReason(w, d) {
  const stems = ialEStems(w);
  if (!stems) return null;

  for (const form of stems) {
    const eWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (eWord.test(d)) return "ial-e-stem-reference";
  }

  const derived = d.match(/^of or derived from (?:a |an |the )?(\w+)/);
  if (derived && stems.some((s) => adjectiveMatchesLyStem(derived[1], s, w))) {
    return "ial-derived-from";
  }

  return null;
}

function adjectiveAlESelfReferenceReason(w, d) {
  const base = w.slice(0, -2);
  if (base.length < 4) return null;

  const eForm = base.endsWith("e") ? base : `${base}e`;
  const eWord = new RegExp(
    `\\b${escapeRegex(eForm)}(?:s|es|d|ing)?\\b`,
    "i",
  );
  if (eWord.test(d)) return "al-e-stem-reference";

  const derived = d.match(/^of or derived from (?:a |an |the )?(\w+)/);
  if (derived && adjectiveMatchesLyStem(derived[1], eForm, w)) {
    return "al-derived-from";
  }

  return null;
}

/** *-ous: gloss uses the related -e noun (courageous → courage; fibrous → fibre). */
function adjectiveOusESelfReferenceReason(w, d) {
  const base = w.slice(0, -3);
  if (base.length < 4) return null;

  const eForms = base.endsWith("e") ? [base] : [base, `${base}e`];

  for (const eForm of eForms) {
    const eWord = new RegExp(
      `\\b${escapeRegex(eForm)}(?:s|es|d|ing)?\\b`,
      "i",
    );
    if (eWord.test(d)) return "ous-e-stem-reference";
  }

  const derived = d.match(/^of or derived from (?:a |an |the )?(\w+)/);
  if (derived) {
    for (const eForm of eForms) {
      if (adjectiveMatchesLyStem(derived[1], eForm, w)) {
        return "ous-derived-from";
      }
    }
  }

  return null;
}

const ED_PARTICIPLE_SKIP =
  /^(?:past|present) participle|^(?:having )?been |^to have been |\bbeen \w+ed\b/i;

function edStems(w) {
  if (!w.endsWith("ed") || w.endsWith("eed") || w.length < 5) return null;

  if (w.endsWith("ied") && w.length > 5) {
    const yStem = `${w.slice(0, -3)}y`;
    return yStem.length >= 4 ? [yStem] : null;
  }

  const base = w.slice(0, -2);
  if (base.length < 3) return null;
  if (base.endsWith("e")) return [base];
  return [base, `${base}e`];
}

/** *-ed: gloss uses the related -e stem (winged → wing) or “having a X” (flued → flue); skips participle meta glosses. */
function adjectiveEdESelfReferenceReason(w, d) {
  if (ED_PARTICIPLE_SKIP.test(d)) return null;

  const stems = edStems(w);
  if (!stems) return null;

  const having = d.match(
    /^having (?:a |an |the )?([\w\s-]+?)(?:[,;.]|\s+or\b|\s+of\b|\s+that\b|$)/,
  );
  if (having) {
    for (const form of stems) {
      if (phraseMatchesStem(having[1], form, w)) return "ed-having-a";
      const head = having[1].trim().split(/\s+/)[0];
      if (adjectiveMatchesLyStem(head, form, w)) return "ed-having-a";
      const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
      if (stemWord.test(having[1])) return "ed-having-a";
    }
  }

  for (const form of stems) {
    const eWord = new RegExp(
      `\\b${escapeRegex(form)}(?:s|es|d|ing)?\\b`,
      "i",
    );
    if (eWord.test(d)) return "ed-e-stem-reference";
  }

  return null;
}

const Y_META_CAPTURE_PATTERNS = [
  [/\bresembling (?:or characteristic of )?(?:a |an |the )?(\w+)/gi, "y-resembling"],
  [/\bcharacteristic of (?:a |an |the )?(\w+)/gi, "y-characteristic"],
  [/\btypical of (?:a |an |the )?(\w+)/gi, "y-typical"],
  [/\blike (?:a |an |the )?(\w+)/gi, "y-like"],
  [/\bsimilar to (?:a |an |the )?(\w+)/gi, "y-similar"],
  [/\bsomewhat (\w+)/gi, "y-somewhat"],
  [/\binvolving (?:a |an |the )?(\w+)/gi, "y-involving"],
  [/having the characteristics of (\w+)/gi, "y-characteristics"],
  [/having the quality of (\w+)/gi, "y-quality"],
];

function yStems(w) {
  const stem = w.slice(0, -1);
  if (stem.length < 4) return null;

  const forms = new Set([stem]);
  if (!stem.endsWith("e")) forms.add(`${stem}e`);
  return [...forms];
}

const IEST_Y_CAPTURE_PATTERNS = [
  [/\bsuperlative (?:form |degree )?of (\w+)/gi, "iest-superlative-of"],
  [/\bcomparative degree of (\w+)/gi, "iest-comparative-of"],
  [/^most (\w+)/i, "iest-most"],
];

/** Stems for *-iest superlatives of *-y adjectives (silliest → silly). */
function iestYStems(w) {
  const base = w.slice(0, -4);
  if (base.length < 3) return null;

  const forms = new Set([`${base}y`]);
  return [...forms].filter((s) => s.length >= 4);
}

/** *-iest: gloss uses related -y stem (silliest → silly). Skips *priest (not *-y superlatives). */
function iestYSuffixSelfReferenceReason(w, d) {
  if (/priest$/i.test(w)) return null;

  const stems = iestYStems(w);
  if (!stems) return null;

  const stem = stems[0];

  for (const [re, reason] of IEST_Y_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  for (const yForm of stems) {
    const yWord = new RegExp(`\\b${escapeRegex(yForm)}\\w*\\b`, "i");
    if (yWord.test(d)) return "iest-y";
  }

  return null;
}

/**
 * *-y: gloss names stem x, “x-y”, -ize/-ify, or “resembling X” (fudgy → fudge; bantery → banter).
 */
function ySuffixSelfReferenceReason(w, d) {
  const stems = yStems(w);
  if (!stems) return null;

  const stem = stems[0];

  for (const form of stems) {
    const stemY = new RegExp(`\\b${escapeRegex(form)}[- ]?y\\b`, "i");
    if (stemY.test(d)) return "y-stem-y";
  }

  const ize = new RegExp(
    `\\b${escapeRegex(stem)}iz(?:e|es|ed|ing|ation)\\b`,
    "i",
  );
  if (ize.test(d)) return "y-ize";

  const ify = new RegExp(
    `\\b${escapeRegex(stem)}if(?:y|ies|ied|ying|ication)\\b`,
    "i",
  );
  if (ify.test(d)) return "y-ify";

  const toMake = d.match(/^to make (\w+)/);
  if (toMake && adjectiveMatchesLyStem(toMake[1], stem, w)) {
    return "y-make";
  }

  const toBecome = d.match(/^to become (\w+)/);
  if (toBecome && adjectiveMatchesLyStem(toBecome[1], stem, w)) {
    return "y-become";
  }

  for (const [re, reason] of Y_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  for (const form of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "y-stem-reference";
  }

  return null;
}

/** Related *-y stems for *-ized headwords (hierarchized → hierarchy; granitized → granite). */
function izedYStems(w) {
  const base = w.slice(0, -4);
  if (base.length < 4) return null;

  const forms = new Set([`${base}y`]);
  if (!base.endsWith("e")) forms.add(`${base}e`);
  return [...forms].filter((s) => s.length >= 4);
}

/** *-ized/-ised: gloss uses the related -y stem (category → categorized). */
function izedSuffixSelfReferenceReason(w, d) {
  const base = w.slice(0, -4);
  if (base.length < 4) return null;
  if (base.endsWith("ectom")) return null;

  const stemY = new RegExp(`\\b${escapeRegex(base)}[- ]?y\\b`, "i");
  if (stemY.test(d)) return "ized-stem-y";

  for (const form of izedYStems(w)) {
    const yWord = new RegExp(`\\b${escapeRegex(form)}\\b`, "i");
    if (yWord.test(d)) return "ized-y";
  }

  return null;
}

const DEN_SKIP_SUFFIX =
  /(?:warden|maiden|midden|burden|boden|idden|ridden|laden|sodden)$/;

/** Stems for *d+en headwords spelled *den (harden → hard, gladden → glad). */
function denEnStems(w) {
  if (!w.endsWith("den") || w.length < 6 || DEN_SKIP_SUFFIX.test(w)) {
    return null;
  }
  const stemD = w.slice(0, -2);
  if (!stemD.endsWith("d") || stemD.length < 4) return null;

  const forms = new Set([stemD]);
  if (stemD.length >= 5 && stemD.at(-1) === stemD.at(-2)) {
    forms.add(stemD.slice(0, -1));
  }
  return [...forms].filter((s) => s.length >= 4);
}

function denStemMatches(word, stems, w) {
  return stems.some((s) => adjectiveMatchesLyStem(word, s, w));
}

/** *den (x+d+en): gloss names stem x via make/become (harden → hard, sadden → sad). */
function denSuffixSelfReferenceReason(w, d) {
  const stems = denEnStems(w);
  if (!stems) return null;

  const toMake = d.match(/^to make (\w+)/);
  if (toMake && denStemMatches(toMake[1], stems, w)) return "den-make";

  const toBecome = d.match(/^to become (\w+)/);
  if (toBecome && denStemMatches(toBecome[1], stems, w)) {
    return "den-become";
  }

  const makeOrBecome = d.match(/^to make or become (\w+)/);
  if (makeOrBecome && denStemMatches(makeOrBecome[1], stems, w)) {
    return "den-make-or-become";
  }

  const causeBecome = d.match(
    /\bto cause .+ to become (?:more |less )?(\w+)/,
  );
  if (causeBecome && denStemMatches(causeBecome[1], stems, w)) {
    return "den-cause-become";
  }

  const render = d.match(
    /\bto render (?:\([^)]+\) )?(?:(?:more|less) )?(\w+)/,
  );
  if (render && denStemMatches(render[1], stems, w)) {
    return "den-render";
  }

  return null;
}

function izeStems(w) {
  const stem = w.slice(0, -3);
  if (stem.length < 4) return null;
  const forms = new Set([stem]);
  if (!stem.endsWith("e")) forms.add(`${stem}e`);
  if (stem.endsWith("in") && stem.length >= 5) {
    forms.add(`${stem.slice(0, -2)}en`);
  }
  return [...forms].filter((s) => s.length >= 4);
}

function izeStemMatches(word, stems, w) {
  return stems.some((s) => adjectiveMatchesLyStem(word, s, w));
}

function izeTreatMatches(captured, stems, w) {
  const head = captured.trim().split(/\s+/)[0];
  if (izeStemMatches(head, stems, w)) return true;
  return phraseMatchesStem(captured, stems[0], w);
}

const IZE_CONVERT_CAPTURE_PATTERNS = [
  [/^to convert (?:into|to) (?:a |an |the )?(\w+)/i, "ize-convert"],
  [
    /^to adapt or convert (?:into|to) (?:a |an |the )?(\w+)/i,
    "ize-adapt-convert",
  ],
  [
    /\bconvert(?:ed|ing|s)? (?:into|to) (?:a |an |the )?(\w+)/gi,
    "ize-convert-mid",
  ],
  [
    /\badapt or convert (?:into|to) (?:a |an |the )?(\w+)/gi,
    "ize-adapt-mid",
  ],
];

const IZE_TREAT_CAPTURE_PATTERNS = [
  [/^to (?:prepare or )?treat with (?:a |an |the )?(\w+)/i, "ize-treat"],
  [/^to combine or treat with (?:a |an |the )?(\w+)/i, "ize-combine-treat"],
  [
    /\b(?:prepare or )?treat with (?:a |an |the )?(\w+)/gi,
    "ize-treat-mid",
  ],
  [
    /\bcombine or treat with (?:a |an |the )?(\w+)/gi,
    "ize-combine-treat-mid",
  ],
];

/** *-ize/-ise: gloss says “convert into X” or “treat with X” (albumenize → albumen; morphinize → morphine). */
function izeSuffixSelfReferenceReason(w, d) {
  const stems = izeStems(w);
  if (!stems) return null;

  for (const [re, reason] of IZE_CONVERT_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (izeStemMatches(m[1], stems, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && izeStemMatches(m[1], stems, w)) return reason;
    }
  }

  for (const [re, reason] of IZE_TREAT_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (izeTreatMatches(m[1], stems, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && izeTreatMatches(m[1], stems, w)) return reason;
    }
  }

  const toTreatPhrase = d.match(
    /^to (?:prepare or )?treat with (?:a |an |the )?(.+?)(?:\.|,|;|$)/,
  );
  if (toTreatPhrase && izeTreatMatches(toTreatPhrase[1], stems, w)) {
    return "ize-treat-phrase";
  }

  return null;
}

/**
 * *-in: gloss uses the paired -ic form (n→c: toxin → toxic, elastin → elastic).
 * *toxin: gloss also cites toxin or toxic (endotoxin → “Any toxin …”).
 */
function inSuffixSelfReferenceReason(w, d) {
  const icForm = w.slice(0, -2) + "ic";
  if (icForm.length >= 4) {
    const icRe = new RegExp(`\\b${escapeRegex(icForm)}\\w*\\b`, "i");
    if (icRe.test(d)) return "in-ic";
  }

  if (w.endsWith("toxin") && w.length > 5) {
    if (/\btoxin\b/i.test(d)) return "in-toxin";
    if (/\btoxic\b/i.test(d)) return "in-toxic";
  }

  return null;
}

const FORE_BEFORE_CAPTURE_PATTERNS = [
  [/\bto (\w+) before\b/gi, "fore-to-before"],
  [/\bto (\w+) beforehand\b/gi, "fore-to-beforehand"],
  [/\b(\w+) beforehand\b/gi, "fore-stem-beforehand"],
  [/\b(\w+) before\b/gi, "fore-stem-before"],
  [/^before (?:a |an |the )?([\w-]+)/, "fore-before"],
  [/\bbefore (?:a |an |the )?(\w+)/gi, "fore-before-mid"],
  [/\bto (\w+) in advance\b/gi, "fore-to-in-advance"],
  [/\b(\w+) in advance\b/gi, "fore-in-advance"],
];

/** fore- headwords whose gloss says “to X before/beforehand” (foreadvise → advise beforehand). */
function forePrefixSelfReferenceReason(w, d) {
  const stem = w.slice(4);
  if (stem.length < 2) return null;

  const toBefore = d.match(/^to (.+?) before\b/);
  if (toBefore && phraseMatchesStem(toBefore[1], stem, w)) {
    return "fore-to-phrase-before";
  }

  const toBeforehand = d.match(/^to (.+?) beforehand\b/);
  if (toBeforehand && phraseMatchesStem(toBeforehand[1], stem, w)) {
    return "fore-to-phrase-beforehand";
  }

  for (const [re, reason] of FORE_BEFORE_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
        if (phraseMatchesStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (!m) continue;
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      if (phraseMatchesStem(m[1], stem, w)) return reason;
    }
  }

  if (/\bbeforehand\b/.test(d) || /\bin advance\b/.test(d)) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "fore-stem-advance";
  }

  return null;
}

/** *-late (not *plate): gloss uses the stem before -late (circulate → circles). */
function lateSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "late-stem-reference";

  const ation = d.match(
    /\b(?:to (?:cause|undergo) |by )(\w+ation)\b/,
  );
  if (ation && adjectiveMatchesLyStem(ation[1], stem, w)) {
    return "late-ation";
  }

  return null;
}

/** *-olate: gloss uses the stem before -olate (lanceolate → lance). */
function olateSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -5);
  if (stem.length < 4) return null;

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "olate-stem-reference";

  return null;
}

/** Stems ending in -l for *-tive headwords (accumulative → accumul). */
function tiveLStems(w) {
  if (!w.endsWith("tive")) return null;

  const forms = new Set();
  if (w.endsWith("ative")) {
    const base = w.slice(0, -5);
    if (base.length >= 4) {
      if (base.endsWith("l")) forms.add(base);
      if (base.endsWith("al")) forms.add(base.slice(0, -1));
      if (base.endsWith("a")) {
        const stem = base.slice(0, -1);
        if (stem.endsWith("l")) forms.add(stem);
      }
    }
  }
  if (w.endsWith("itive")) {
    const base = w.slice(0, -5);
    if (base.length >= 4 && base.endsWith("l")) forms.add(base);
  }
  const baseTive = w.slice(0, -4);
  if (baseTive.length >= 4 && baseTive.endsWith("l")) forms.add(baseTive);

  if (!forms.size) return null;
  return [...forms].filter((s) => s.length >= 4);
}

/** *-tive: gloss uses stem x ending in -l (accumulative → accumul). */
function tiveSuffixSelfReferenceReason(w, d) {
  const stems = tiveLStems(w);
  if (!stems) return null;

  for (const form of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "tive-l";
  }

  return null;
}

/** *-inity: gloss uses the stem before -inity (femininity → feminine, viraginity → virago). */
function initySuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -5);
  if (stem.length < 4) return null;

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "inity-stem-reference";

  const oForm = `${stem}o`;
  const oWord = new RegExp(`\\b${escapeRegex(oForm)}\\b`, "i");
  if (oWord.test(d)) return "inity-o-reference";

  return null;
}

const TY_META_CAPTURE_PATTERNS = [
  [/^the quality of being (\w+)/i, "ty-quality"],
  [/^quality of being (\w+)/i, "ty-quality"],
  [/^the state of being (\w+)/i, "ty-state"],
  [/^state of being (\w+)/i, "ty-state"],
  [/^the condition of being (\w+)/i, "ty-condition"],
  [/^an instance of being (\w+)/i, "ty-instance-being"],
  [/\bbeing (\w+)\b/gi, "ty-being"],
];

const CY_META_CAPTURE_PATTERNS = [
  [/^the (?:office|position|rank|status|role) of (?:a |an |the )?(\w+)/i, "cy-office"],
  [/^state of being (?:a |an |the )?(\w+)/i, "cy-state"],
  [/^quality of being (?:a |an |the )?(\w+)/i, "cy-quality"],
  [/^condition of being (?:a |an |the )?(\w+)/i, "cy-condition"],
  [/^the quality,? state,? or condition of being (\w+)/i, "cy-qsc-being"],
  [/\b(?:office|position|rank|status|role) of (?:a |an |the )?(\w+)/gi, "cy-office"],
  [
    /\b(?:jurisdiction|domain|authority|tenure) of (?:a |an |the )?(\w+)/gi,
    "cy-jurisdiction",
  ],
  [/\b(?:quality|state|condition) of being (\w+)/gi, "cy-being"],
  [/\bfact of being (\w+)/gi, "cy-fact-being"],
  [/\bact of being (\w+)/gi, "cy-act-being"],
];

/** *-cy: gloss uses stem x (captaincy → captain; aldermancy → alderman). */
function cySuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  for (const [re, reason] of CY_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  if (
    /\b(?:office|position|rank|status|role|quality|state|condition|fact|jurisdiction|domain|authority|tenure) of\b/.test(
      d,
    )
  ) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "cy-stem-reference";
  }

  return null;
}

/** *-ty (not *-ity): gloss uses stem x (frailty → frail, subtlety → subtle). */
function tySuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  for (const [re, reason] of TY_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  if (/\b(?:quality|state|condition) of being\b/.test(d)) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "ty-stem-reference";
  }

  return null;
}

/** *-o (stem + inity): gloss uses the matching -inity form (virago → viraginity). */
function oSuffixInitySelfReferenceReason(w, d) {
  const stem = w.slice(0, -1);
  if (stem.length < 4) return null;

  const inityWord = new RegExp(`\\b${escapeRegex(stem)}inity\\b`, "i");
  if (inityWord.test(d)) return "o-inity-reference";

  return null;
}

function iferousStems(word) {
  const w = word.toLowerCase();
  if (!w.endsWith("iferous") || w.length < 9) return null;

  const root = w.replace(/iferous$/, "");
  if (root.length < 3) return null;

  const stems = new Set([root]);
  if (root.endsWith("i") && root.length > 3) stems.add(root.slice(0, -1));
  return [...stems].filter((s) => s.length >= 3);
}

const IFEROUS_META_CAPTURE_PATTERNS = [
  [/\bcontaining or producing (\w+)/gi, "iferous-containing"],
  [/\byielding or containing (\w+)/gi, "iferous-yielding"],
  [/\bbearing or producing (\w+)/gi, "iferous-bearing"],
  [/\bproducing or bearing (\w+)/gi, "iferous-producing"],
  [/\bcontaining,? or yielding (\w+)/gi, "iferous-yielding-alt"],
  [/\bthat (?:contains|yields|produces|bears) (\w+)/gi, "iferous-that"],
];

/** *-iferous: gloss uses the stem before -iferous (carboniferous → carbon). */
function iferousSuffixSelfReferenceReason(w, d) {
  const stems = iferousStems(w);
  if (!stems) return null;

  for (const [re, reason] of IFEROUS_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (stems.some((stem) => adjectiveMatchesLyStem(m[1], stem, w))) {
        return reason;
      }
    }
  }

  for (const stem of stems) {
    const stemWord =
      stem.length < 4
        ? new RegExp(
            `\\b${escapeRegex(stem)}(?:us|um|is|os|ous|a|e|i|o)?\\b`,
            "i",
          )
        : new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "iferous-stem-reference";
  }

  return null;
}

/** Base headwords whose gloss names the matching *-iferous form (carbon → carboniferous). */
function baseIferousSelfReferenceReason(w, d) {
  if (w.endsWith("iferous") || w.length < 5) return null;

  const stem = w.toLowerCase();
  if (stem.length < 4) return null;

  const iferousWord = new RegExp(`\\b${escapeRegex(stem)}iferous\\b`, "i");
  if (iferousWord.test(d)) return "base-iferous-reference";

  return null;
}

/** Stems for base headwords whose gloss names a related *-ism (albino → albinism). */
function baseIsmStems(w) {
  const forms = new Set([w]);
  if (w.endsWith("ness") && w.length > 6) forms.add(w.slice(0, -4));
  if (w.endsWith("ity") && w.length > 5) forms.add(w.slice(0, -3));
  if (w.endsWith("tion") && w.length > 6) forms.add(w.slice(0, -4));
  if (w.endsWith("tic") && w.length > 5) {
    forms.add(w.slice(0, -3));
    forms.add(w.slice(0, -3) + "y");
  }
  if (w.endsWith("ic") && w.length > 5) forms.add(w.slice(0, -2));
  if (w.endsWith("al") && w.length > 5) forms.add(w.slice(0, -2));
  if (w.endsWith("an") && w.length > 5) forms.add(w.slice(0, -2));
  if (w.endsWith("ize") && w.length > 5) forms.add(w.slice(0, -3));
  if (w.endsWith("ise") && w.length > 5) forms.add(w.slice(0, -3));
  return [...forms].filter((s) => s.length >= 4);
}

/** Base headwords whose gloss names the matching *-ism form (authoritarian → authoritarianism). */
function baseIsmSelfReferenceReason(w, d) {
  if (w.endsWith("ism") || w.length < 5) return null;

  const stems = baseIsmStems(w);
  if (!stems.length) return null;

  for (const m of d.matchAll(/\b(\w+)ism\b/gi)) {
    const ismBase = m[1].toLowerCase();
    const ismWord = `${ismBase}ism`;
    for (const form of stems) {
      if (`${form}ism` === ismWord) return "base-ism-reference";
      if (adjectiveMatchesLyStem(ismBase, form, w)) return "base-ism-reference";
      if (adjectiveMatchesLyStem(form, ismBase, w)) return "base-ism-reference";
    }
  }

  return null;
}

/** Headwords ending in *-jectile are kept (projectile → projecting is not circular). */
const LE_SELF_REF_SKIP = /jectile$/i;

/**
 * *-le (stem + olate): gloss uses the stem before -le (crumble → crumb).
 * Pairs with *-olate adjectives (petiole / petiolate).
 */
function leSuffixSelfReferenceReason(w, d) {
  if (LE_SELF_REF_SKIP.test(w)) return null;

  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "le-stem-reference";

  return null;
}

const DOM_META_PATTERNS = [
  /^the (?:world|realm|sphere|state|rank|status|role|estate|land|jurisdiction|institution|government|authority|community|profession|essence) of /,
  /^the (?:world|realm|sphere) or /,
  /^the (?:rank|status|territory|dignity) of /,
  /^the (?:class|estate) of /,
  / collectively\b/,
];

function makerProductForms(stem) {
  if (stem.length < 3) return null;

  const forms = new Set([stem, `${stem}s`, `${stem}es`]);
  if (stem.endsWith("y") && stem.length > 3) {
    forms.add(`${stem.slice(0, -1)}ies`);
  }
  if (stem.endsWith("f") && stem.length > 3) {
    forms.add(`${stem.slice(0, -1)}ves`);
  }
  return [...forms];
}

function makerProductMatches(w, captured) {
  const stem = w.slice(0, -5);
  const forms = makerProductForms(stem);
  if (!forms) return false;

  const c = captured.toLowerCase();
  return forms.some((f) => adjectiveMatchesLyStem(c, f, w));
}

const MAKER_META_CAPTURE_PATTERNS = [
  [/\b(?:maker|manufacturer|producer) of (?:a |an |the )?(\w+)/gi, "maker-of"],
  [/\b(?:makes?|manufactures?|produces?) (?:a |an |the )?(\w+)/gi, "maker-verb"],
];

/** *-maker: gloss names the product as stem + s/es (bagmaker → bags). */
function makerSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -5);
  if (stem.length < 3) return null;

  for (const [re, reason] of MAKER_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (makerProductMatches(w, m[1])) return reason;
    }
  }

  if (!/\b(?:maker|manufacturer)\b/.test(d)) return null;

  for (const form of makerProductForms(stem)) {
    const product = new RegExp(`\\b${escapeRegex(form)}\\b`, "i");
    if (product.test(d)) return "maker-product-reference";
  }

  return null;
}

function smithProductMatches(w, stem, captured) {
  const forms = makerProductForms(stem);
  if (!forms) return false;

  const c = captured.toLowerCase();
  if (forms.some((f) => adjectiveMatchesLyStem(c, f, w))) return true;
  return phraseMatchesStem(captured, stem, w);
}

/** *-smith: gloss says “maker of X” where X matches the stem (hammersmith → hammers). */
function smithSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -5);
  if (stem.length < 3) return null;

  const makerOfPhrase = d.match(/^a maker of (?:a |an |the )?(.+?)(?:\.|,|;|$)/);
  if (makerOfPhrase && smithProductMatches(w, stem, makerOfPhrase[1])) {
    return "smith-maker-of";
  }

  for (const [re, reason] of MAKER_META_CAPTURE_PATTERNS) {
    if (reason === "maker-verb") continue;
    for (const m of d.matchAll(re)) {
      if (smithProductMatches(w, stem, m[1])) return "smith-maker-of";
    }
  }

  if (/\bmaker of\b/.test(d)) {
    const forms = makerProductForms(stem);
    if (!forms) return null;
    for (const form of forms) {
      const product = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
      if (product.test(d)) return "smith-stem-reference";
    }
  }

  return null;
}

function manProductMatches(w, captured) {
  const stem = w.slice(0, -3);
  const forms = makerProductForms(stem);
  if (!forms) return false;

  const c = captured.toLowerCase();
  return forms.some((f) => adjectiveMatchesLyStem(c, f, w));
}

const MAN_META_CAPTURE_PATTERNS = [
  [/\bman in charge of (?:a |an |the )?(\w+)/gi, "man-in-charge"],
  [
    /\bman who (?:operates?|works?|deals?|sells?|makes?|tends?|loads?) (?:on |with |in )?(?:a |an |the )?(\w+)/gi,
    "man-who",
  ],
  [/\bmember of (?:the )?crew of (?:a |an |the )?(\w+)/gi, "man-crew"],
  [
    /\bman employed to (?:operate|manage|work on|load) (?:a |an |the )?(\w+)/gi,
    "man-employed",
  ],
  [/\bperson in charge of (?:a |an |the )?(\w+)/gi, "man-person-in-charge"],
  [/\bman (?:on|at|in) (?:a |an |the )?(\w+)/gi, "man-on"],
];

/** *-man: gloss names the stem X (boatman → boat); not *human. */
function manSuffixSelfReferenceReason(w, d) {
  if (w.endsWith("human")) return null;

  const stem = w.slice(0, -3);
  if (stem.length < 3) return null;

  for (const [re, reason] of MAN_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (manProductMatches(w, m[1])) return reason;
    }
  }

  if (!/\b(?:\w+ )?man\b/.test(d) && !/\bmember of\b/.test(d)) return null;

  for (const form of makerProductForms(stem)) {
    const product = new RegExp(`\\b${escapeRegex(form)}\\b`, "i");
    if (product.test(d)) return "man-product-reference";
  }

  return null;
}

function izationStemsFromBase(base) {
  const stems = new Set([base]);
  if (base.endsWith("iz")) {
    const s = base.slice(0, -2);
    stems.add(s);
    stems.add(`${s}a`);
    stems.add(`${s}ize`);
  } else if (base.endsWith("is")) {
    const s = base.slice(0, -2);
    stems.add(s);
    stems.add(`${s}a`);
    stems.add(`${s}ise`);
  } else if (base.endsWith("at")) {
    const s = base.slice(0, -2);
    stems.add(s);
    stems.add(`${s}a`);
    stems.add(`${s}ate`);
  }
  return [...stems].filter((s) => s.length >= 4);
}

const IZATION_META_CAPTURE_PATTERNS = [
  [/\bprocess of (\w+)/gi, "ization-process"],
  [/\bact of (\w+)/gi, "ization-act"],
  [/\baction of (\w+)/gi, "ization-action"],
  [
    /\bconversion (?:of|into|to) (?:a |an |the )?(\w+)/gi,
    "ization-conversion",
  ],
  [/\bresult of (\w+)/gi, "ization-result"],
  [/\b(?:making|rendering) (\w+)/gi, "ization-making"],
  [/\binstance of being (\w+)/gi, "ization-being"],
];

/** *-ization: gloss uses the related -a/-ize stem (dramatization → drama). */
function izationSuffixSelfReferenceReason(w, d) {
  const suffixLen = 7;
  const base = w.slice(0, -suffixLen);
  if (base.length < 4) return null;

  const stems = izationStemsFromBase(base);

  for (const stem of stems) {
    const ize = new RegExp(
      `\\b${escapeRegex(stem)}iz(?:e|es|ed|ing|ation)\\b`,
      "i",
    );
    if (ize.test(d)) return "ization-ize";

    const ise = new RegExp(
      `\\b${escapeRegex(stem)}is(?:e|es|ed|ing|ation)\\b`,
      "i",
    );
    if (ise.test(d)) return "ization-ise";
  }

  for (const [re, reason] of IZATION_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (stems.some((stem) => adjectiveMatchesLyStem(m[1], stem, w))) {
        return reason;
      }
    }
  }

  for (const stem of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "ization-stem-reference";
  }

  return null;
}

function ationStemsFromBase(base) {
  const stems = new Set(izationStemsFromBase(base));
  if (!base.endsWith("at") && !base.endsWith("iz") && !base.endsWith("is")) {
    stems.add(`${base}ate`);
  }
  return [...stems].filter((s) => s.length >= 4);
}

const ATION_META_CAPTURE_PATTERNS = [
  [/\bprocess of (\w+)/gi, "ation-process"],
  [/\bact of (\w+)/gi, "ation-act"],
  [/\baction of (\w+)/gi, "ation-action"],
  [
    /\bconversion (?:of|into|to) (?:a |an |the )?(\w+)/gi,
    "ation-conversion",
  ],
  [/\bresult of (\w+)/gi, "ation-result"],
  [/\b(?:making|rendering) (\w+)/gi, "ation-making"],
  [/\binstance of being (\w+)/gi, "ation-being"],
  [/\binstance of (\w+)/gi, "ation-instance"],
  [/\b(?:action|process) of (\w+)/gi, "ation-action-process"],
];

/** *-ation (not *-ization): gloss uses the related -ate stem (hesitation → hesitate). */
function ationSuffixSelfReferenceReason(w, d) {
  const base = w.slice(0, -5);
  if (base.length < 4) return null;

  const stems = ationStemsFromBase(base);

  for (const stem of stems) {
    const ate = new RegExp(
      `\\b${escapeRegex(stem)}at(?:e|es|ed|ing)\\b`,
      "i",
    );
    if (ate.test(d)) return "ation-ate";
  }

  for (const [re, reason] of ATION_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (stems.some((stem) => adjectiveMatchesLyStem(m[1], stem, w))) {
        return reason;
      }
    }
  }

  for (const stem of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "ation-stem-reference";
  }

  return null;
}

const FUL_META_CAPTURE_PATTERNS = [
  [/^full of (?:a |an |the )?(\w+)/i, "ful-full-of"],
  [/\bfull of (?:a |an |the )?(\w+)/gi, "ful-full-of"],
  [/\babounding (?:with|in) (?:a |an |the )?(\w+)/gi, "ful-abounding"],
  [/\brich in (?:a |an |the )?(\w+)/gi, "ful-rich-in"],
  [/^characterized by (?:a |an |the )?(\w+)/i, "ful-characterized"],
  [/\bcharacterized by (?:a |an |the )?(\w+)/gi, "ful-characterized"],
  [/^having (?:a |an |the )?(\w+)/i, "ful-having"],
  [/\bpervaded by (?:a |an |the )?(\w+)/gi, "ful-pervaded"],
  [/^given to (\w+)/i, "ful-given-to"],
  [/^providing (\w+)/i, "ful-providing"],
  [/^tending to (\w+)/i, "ful-tending"],
  [/\bfull\s+(?:a |an |the )?(\w+)/gi, "ful-full"],
  [
    /\b(?:enough|amount|quantity|contents)(?:\s+\w+){0,8}\s+(?:to\s+)?fill(?:s|ed|ing)?\s+(?:a |an |the )?(\w+)/gi,
    "ful-fill",
  ],
  [
    /\b(?:necessary|needed|required)\s+to\s+fill\s+(?:a |an |the )?(\w+)/gi,
    "ful-to-fill",
  ],
];

/** *-ful: gloss uses stem x (battleful → battles; adviceful → advice). */
function fulSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -3);
  if (stem.length < 3) return null;

  for (const [re, reason] of FUL_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
        if (phraseMatchesStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (!m) continue;
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      if (phraseMatchesStem(m[1], stem, w)) return reason;
    }
  }

  if (
    /\b(?:full of|full\s+\w|abound|characterized by|pervaded by|rich in|enough to fill|amount (?:that )?fills|contents of|fill(?:s|ed|ing)?\s+(?:a |an |the )?\w)\b/.test(
      d,
    )
  ) {
    const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "ful-stem-reference";
  }

  return null;
}

const LESS_META_CAPTURE_PATTERNS = [
  [
    /\bwithout (?:a |an |the )?([\w\s-]{1,40}?)(?:[,;.]|\s+or\b|\s+and\b|$)/gi,
    "less-without",
  ],
  [
    /\bwith no (?:a |an |the )?([\w\s-]{1,40}?)(?:[,;.]|\s+or\b|\s+and\b|$)/gi,
    "less-with-no",
  ],
  [/\blacking (?:a |an |the )?(\w+)/gi, "less-lacking"],
  [/\bnot having (?:a |an |the )?(\w+)/gi, "less-not-having"],
  [/\bhaving no (?:a |an |the )?(\w+)/gi, "less-having-no"],
  [/\bdevoid of (?:a |an |the )?(\w+)/gi, "less-devoid"],
  [/\bfree from (?:a |an |the )?(\w+)/gi, "less-free-from"],
  [/\bunaccompanied by (?:a |an |the )?(\w+)/gi, "less-unaccompanied"],
];

function lessStems(w) {
  const stem = w.slice(0, -4);
  if (stem.length < 3) return null;

  const forms = new Set([stem]);
  if (!stem.endsWith("s")) forms.add(`${stem}s`);
  return [...forms];
}

function lessStemMatches(captured, stem, w) {
  if (phraseMatchesStem(captured, stem, w)) return true;
  const head = captured.trim().split(/\s+/)[0];
  if (adjectiveMatchesLyStem(head, stem, w)) return true;
  return false;
}

/** *-less: gloss says “without X”, “with no X”, or uses stem x (aimless → aim). */
function lessSuffixSelfReferenceReason(w, d) {
  const stems = lessStems(w);
  if (!stems) return null;

  const stem = stems[0];

  for (const [re, reason] of LESS_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (lessStemMatches(m[1], stem, w)) return reason;
      if (adjectiveMatchesLyStem(m[1].trim(), stem, w)) return reason;
    }
  }

  if (
    /\b(?:without|with no|lacking|devoid of|free from|not having|having no|absence of|bereft of)\b/.test(
      d,
    )
  ) {
    for (const form of stems) {
      const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
      if (stemWord.test(d)) return "less-stem-reference";
    }
  }

  for (const form of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (stemWord.test(d)) return "less-stem-reference";
  }

  return null;
}

const SOME_META_CAPTURE_PATTERNS = [
  [/^prone to (?:a |an |the )?([\w-]+)/i, "some-prone"],
  [/^apt or prone to (?:cause )?([\w-]+)/i, "some-apt-prone"],
  [/\bcharacteri[sz]ed or marked by (?:a |an |the )?([\w-]+)/gi, "some-characterized"],
  [/\bcharacteri[sz]ed by (?:a |an |the )?([\w-]+)/gi, "some-characterized-by"],
  [
    /\bcharacteristic of (?:a |an |the )?([\w-]+)/gi,
    "some-characteristic",
  ],
  [/\bmarked by (?:a |an |the )?([\w-]+)/gi, "some-marked"],
  [/\bfull of (?:a |an |the )?([\w-]+)/gi, "some-full-of"],
  [/\binclined to (?:a |an |the )?([\w-]+)/gi, "some-inclined"],
  [/\bindicative of (?:a |an |the )?([\w-]+)/gi, "some-indicative"],
  [/\bapt to (?:cause )?([\w-]+)/gi, "some-apt"],
  [/\btending to (\w+)/gi, "some-tending"],
];

function someStems(w) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  const forms = new Set([stem]);
  if (!stem.endsWith("s")) forms.add(`${stem}s`);
  if (stem.endsWith("e") && stem.length > 4) {
    forms.add(`${stem.slice(0, -1)}ing`);
  } else {
    forms.add(`${stem}ing`);
  }
  return [...forms];
}

/** *-some: gloss uses stem x (battlesome → battle(s); adventuresome → adventures). */
function someSuffixSelfReferenceReason(w, d) {
  const stems = someStems(w);
  if (!stems) return null;

  for (const [re, reason] of SOME_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        for (const form of stems) {
          if (adjectiveMatchesLyStem(m[1], form, w)) return reason;
          if (phraseMatchesStem(m[1], form, w)) return reason;
        }
      }
    } else {
      const m = d.match(re);
      if (!m) continue;
      for (const form of stems) {
        if (adjectiveMatchesLyStem(m[1], form, w)) return reason;
        if (phraseMatchesStem(m[1], form, w)) return reason;
      }
    }
  }

  if (
    /\b(?:characteri[sz]ed|characteristic of|marked by|prone to|full of|inclined to|indicative of|apt to|tending to)\b/.test(
      d,
    )
  ) {
    for (const form of stems) {
      const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
      if (stemWord.test(d)) return "some-stem-reference";
    }
  }

  return null;
}

/** *+by headwords that are not x+by (baby, hobby, etc.). */
const BY_SUFFIX_SKIP = new Set([
  "baby",
  "booby",
  "bushbaby",
  "crybaby",
  "flyby",
  "gaby",
  "hobby",
  "hubby",
  "lobby",
  "lullaby",
  "merbaby",
  "nabby",
  "shabby",
  "stubby",
  "trilby",
]);

const BY_META_CAPTURE_PATTERNS = [
  [/\bpresence of (?:a |an |the )?([\w-]+)/gi, "by-presence"],
  [/\bmarked by (?:the )?([\w-]+)/gi, "by-marked"],
  [/\bfull of (?:a |an |the )?([\w-]+)/gi, "by-full-of"],
  [/\bhaving (?:a |an |the )?([\w-]+)/gi, "by-having"],
  [/\bconsisting of (?:a |an |the )?([\w-]+)/gi, "by-consisting"],
  [/\bcovered with (?:a |an |the )?([\w-]+)/gi, "by-covered"],
  [/\bfilled with (?:a |an |the )?([\w-]+)/gi, "by-filled"],
  [/\bsimilar to (?:a |an |the )?([\w-]+)/gi, "by-similar"],
  [/\bresembling (?:a |an |the )?([\w-]+)/gi, "by-resembling"],
  [/\btending to (\w+)/gi, "by-tending"],
];

function byStems(w) {
  const stem = w.slice(0, -2);
  if (stem.length < 3) return null;

  const forms = new Set([stem]);
  if (!stem.endsWith("s")) forms.add(`${stem}s`);
  return [...forms];
}

/** *-by: gloss uses stem x or x-s (gobby → gobs; webby → web). */
function bySuffixSelfReferenceReason(w, d) {
  const stems = byStems(w);
  if (!stems) return null;

  for (const [re, reason] of BY_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      for (const form of stems) {
        if (adjectiveMatchesLyStem(m[1], form, w)) return reason;
        if (phraseMatchesStem(m[1], form, w)) return reason;
      }
    }
  }

  if (
    /\b(?:presence of|marked by|full of|having|consisting of|covered with|filled with|similar to|resembling|tending to)\b/.test(
      d,
    )
  ) {
    for (const form of stems) {
      const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
      if (stemWord.test(d)) return "by-stem-reference";
    }
  }

  for (const form of stems) {
    const stemWord = new RegExp(`\\b${escapeRegex(form)}\\w*\\b`, "i");
    if (stemWord.test(d) && /\btending to\b/.test(d)) {
      return "by-tending-stem";
    }
  }

  return null;
}

const OID_TAXONOMIC_SKIP =
  /\b(?:aceae|idae|inae|oidea|ales|phyta|mycota|family [A-Z]|genus [A-Z]|order [A-Z]|class [A-Z])\b/;

const OID_META_CAPTURE_PATTERNS = [
  [/\bresembling (?:a |an |the )?(\w+)/gi, "oid-resembling"],
  [/\bsimilar to (?:a |an |the )?(\w+)/gi, "oid-similar"],
  [/\blike (?:a |an |the )?(\w+)/gi, "oid-like"],
  [/\bcharacteristic of (\w+)/gi, "oid-characteristic"],
  [/\bshaped like (?:a |an |the )?(\w+)/gi, "oid-shaped"],
  [/\bhaving the shape of (?:a |an |the )?(\w+)/gi, "oid-shape-of"],
];

/** *-oid: gloss says “resembling X” (algoid → algae); skips taxonomic family names. */
function oidSuffixSelfReferenceReason(w, d) {
  if (OID_TAXONOMIC_SKIP.test(d)) return null;

  const stem = w.slice(0, -3);
  if (stem.length < 3) return null;

  for (const [re, reason] of OID_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

const HOOD_META_CAPTURE_PATTERNS = [
  [/\bstate of being (?:a |an |the )?(\w+)/gi, "hood-state"],
  [/\bstatus of being (?:a |an |the )?(\w+)/gi, "hood-status"],
  [/\bcondition of being (?:a |an |the )?(\w+)/gi, "hood-condition"],
  [/\bperiod of being (?:a |an |the )?(\w+)/gi, "hood-period"],
  [/\boffice of (?:a |an |the )?(\w+)/gi, "hood-office"],
  [/\brole of (?:a |an |the )?(\w+)/gi, "hood-role"],
];

/** *-hood: gloss names the stem as a state or office (authorhood → author). */
function hoodSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  for (const [re, reason] of HOOD_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

const PROOF_META_CAPTURE_PATTERNS = [
  [/\bresistant to (\w+)/gi, "proof-resistant"],
  [/\bimpervious to (\w+)/gi, "proof-impervious"],
  [/\bproof against (\w+)/gi, "proof-against"],
  [/\bprotected from (\w+)/gi, "proof-protected"],
  [/\bsecure against (\w+)/gi, "proof-secure"],
];

/** *-proof: gloss says “resistant to X” (brushproof → brushing). */
function proofSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -5);
  if (stem.length < 4) return null;

  for (const [re, reason] of PROOF_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:resistant|impervious|proof|protected|secure)\b/.test(d)
  ) {
    return "proof-stem-reference";
  }

  return null;
}

const FREE_META_CAPTURE_PATTERNS = [
  [/\bfree from (\w+)/gi, "free-from"],
  [/\bwithout (\w+)/gi, "free-without"],
  [/\bnot containing (\w+)/gi, "free-not-containing"],
  [/\bcontaining no (\w+)/gi, "free-containing-no"],
];

/** *-free: gloss says “without X” (sugarfree → sugar). */
function freeSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 4) return null;

  for (const [re, reason] of FREE_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

const EE_META_CAPTURE_PATTERNS = [
  [/\bperson to whom (\w+)/gi, "ee-person-to-whom"],
  [/\bone to whom (\w+)/gi, "ee-one-to-whom"],
  [/\brecipient of (?:a |an |the )?(\w+)/gi, "ee-recipient"],
  [/\bthat receives (\w+)/gi, "ee-receives"],
];

/** *-ee: gloss names the verb stem (addressee → address). */
function eeSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -2);
  if (stem.length < 4) return null;

  for (const [re, reason] of EE_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:person|one|party|individual) (?:to )?whom\b/.test(d)
  ) {
    return "ee-stem-reference";
  }

  return null;
}

const ISM_META_CAPTURE_PATTERNS = [
  [/\bsupport for (?:a |an |the )?(\w+)/gi, "ism-support"],
  [/\bdoctrine of (\w+)/gi, "ism-doctrine"],
  [/\bdoctrines of (\w+)/gi, "ism-doctrines"],
  [/\bbelief in (\w+)/gi, "ism-belief"],
  [/\badherence to (\w+)/gi, "ism-adherence"],
  [/\bprinciples of (\w+)/gi, "ism-principles"],
  [/\bpractice of (\w+)/gi, "ism-practice"],
  [/\btenets of (\w+)/gi, "ism-tenets"],
  [
    /\b(?:creation|principles|ideals) of (\w+)/gi,
    "ism-creation",
  ],
  [/\bthe (\w+) school of/i, "ism-school"],
];

/** *-ism: gloss names the stem as doctrine or support (abolitionism → abolition). */
function ismSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -3);
  if (stem.length < 4) return null;

  for (const [re, reason] of ISM_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (
    stemWord.test(d) &&
    /\b(?:support|doctrine|belief|practice|adherence|principles|ideals|tenets|school)\b/.test(
      d,
    )
  ) {
    return "ism-stem-reference";
  }

  return null;
}

/** *-dom: gloss uses the stem before -dom (artistdom → artists). */
function domSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -3);
  if (stem.length < 3) return null;

  for (const re of DOM_META_PATTERNS) {
    if (re.test(d)) return "dom-meta";
  }

  const stemWord = new RegExp(`\\b${escapeRegex(stem)}\\w*\\b`, "i");
  if (stemWord.test(d)) return "dom-stem-reference";

  return null;
}

/** Circular glosses for *-ship when X matches the stem before -ship (abbotship → abbot). */
const SHIP_META_CAPTURE_PATTERNS = [
  [/\bof being (?:a |an |the )?(\w+)/gi, "ship-of-being"],
  [/\bof (?:a |an |the )?(\w+)/gi, "ship-of"],
  [
    /\b(?:office|position|post|rank|role|status|employment|profession|function|duty|condition) of (?:a |an |the )?(\w+)/gi,
    "ship-office",
  ],
  [
    /\b(?:role|status|position) or (?:role|status|office) of (?:a |an )?(\w+)/gi,
    "ship-role",
  ],
];

function shipSuffixSelfReferenceReason(w, d) {
  const stem = w.slice(0, -4);
  if (stem.length < 3) return null;

  for (const [re, reason] of SHIP_META_CAPTURE_PATTERNS) {
    for (const m of d.matchAll(re)) {
      if (adjectiveMatchesLyStem(m[1], stem, w)) return reason;
    }
  }

  return null;
}

const TOR_STEM_SUFFIXES = ["ator", "itor", "utor", "etor"];

/** e.g. “alternating current” — not agent-noun self-reference. */
const ATING_NON_AGENT_CONTEXT =
  /\b\w+ating\s+(?:current|voltage|field|signal|layer|flow|motor|engine|power|circuit|loop|belt|track|mode|wave|beam)\b/i;

/** Instrument headwords (*meter, *metre) — not verb-derived -er agents. */
function erAgentStems(word) {
  const w = word.toLowerCase();
  if (!w.endsWith("er") || w.length < 5) return null;
  if (w.endsWith("meter") || w.endsWith("metre")) return null;

  const base = w.slice(0, -2);
  if (base.length < 3) return null;

  const stems = new Set([base]);
  if (!base.endsWith("e")) stems.add(`${base}e`);
  if (base.length > 3 && base.endsWith("i")) {
    stems.add(`${base.slice(0, -1)}y`);
  }
  return [...stems].filter((s) => s.length >= 4);
}

const ER_AGENT_VERB_PATTERNS = [
  [/^(?:one|someone) (?:who|that) (\w+)/, "er-one"],
  [/^something that (\w+)/, "er-something"],
  [/^that (?:which|who) (\w+)/, "er-that"],
  [
    /^(?:a|an) (?:person|thing|machine|tool|device|agent) (?:who|that|which) (\w+)/,
    "er-agent",
  ],
];

const ES_ER_AGENT_PATTERNS = [
  [/^someone or something that (\w+)/i, "es-someone"],
  ...ER_AGENT_VERB_PATTERNS.map(([re, reason]) => [
    re,
    reason.replace(/^er-/, "es-"),
  ]),
];

/** Stems before -es for agent-noun glosses (represses → repress). */
function esAgentStems(word) {
  const w = word.toLowerCase();
  if (!w.endsWith("es") || w.length < 6 || w.endsWith("ies")) return null;
  if (/(?:ness|less|ous|ics)$/i.test(w)) return null;

  const base = w.slice(0, -2);
  if (base.length < 4) return null;

  const stems = new Set([base]);
  if (!base.endsWith("e")) stems.add(`${base}e`);
  return [...stems].filter((s) => s.length >= 4);
}

function verbMatchesEsHeadword(verb, w, stems) {
  const v = verb.toLowerCase();
  if (v === w) return true;
  if (`${v}es` === w || `${v}s` === w) return true;
  return stems.some((stem) => adjectiveMatchesLyStem(v, stem, w));
}

/** *-es headwords with -er-style agent glosses (represses → someone that represses). */
function esSuffixErSelfReferenceReason(w, d) {
  const stems = esAgentStems(w);
  if (!stems) return null;

  for (const [re, reason] of ES_ER_AGENT_PATTERNS) {
    const m = d.match(re);
    if (m && verbMatchesEsHeadword(m[1], w, stems)) return reason;
  }

  return null;
}

/** *-er agent nouns whose gloss uses the matching verb stem (abrader → abrading). */
function erSuffixSelfReferenceReason(w, d) {
  const stems = erAgentStems(w);
  if (!stems) return null;

  for (const stem of stems) {
    const ing = new RegExp(`\\b${escapeRegex(stem)}\\w*ing\\b`, "i");
    if (ing.test(d)) return "er-ing";
  }

  for (const [re, reason] of ER_AGENT_VERB_PATTERNS) {
    const m = d.match(re);
    if (m && stems.some((stem) => adjectiveMatchesLyStem(m[1], stem, w))) {
      return reason;
    }
  }

  if (
    /^(?:a |an )?(?:machine|tool|device|instrument|apparatus) (?:for|that|which) /.test(
      d,
    )
  ) {
    for (const stem of stems) {
      const verb = new RegExp(
        `\\b${escapeRegex(stem)}\\w*(?:e|es|ed|ing)?\\b`,
        "i",
      );
      if (verb.test(d)) return "er-machine";
    }
  }

  if (/\bfor \w+ing\b/.test(d)) {
    for (const stem of stems) {
      const ing = new RegExp(`\\b${escapeRegex(stem)}\\w*ing\\b`, "i");
      if (ing.test(d)) return "er-for-ing";
    }
  }

  return null;
}

function torVerbStem(word) {
  const w = word.toLowerCase();
  for (const suf of TOR_STEM_SUFFIXES) {
    if (w.endsWith(suf) && w.length > suf.length + 3) {
      return w.slice(0, -suf.length);
    }
  }
  if (w.endsWith("tor") && w.length > 6) return w.slice(0, -3);
  return null;
}

/** *-tor glosses that name the matching -ate/-ating/-ting verb (inoculator → inoculating). */
function torSuffixSelfReferenceReason(w, d) {
  const stem = torVerbStem(w);
  if (!stem || stem.length < 4) return null;

  const ateIng = new RegExp(
    `\\b${escapeRegex(stem)}at(?:e|es|ed|ing)\\b`,
    "gi",
  );
  let match;
  while ((match = ateIng.exec(d)) !== null) {
    const snippet = d.slice(
      Math.max(0, match.index - 15),
      match.index + match[0].length + 35,
    );
    if (ATING_NON_AGENT_CONTEXT.test(snippet)) continue;
    return "tor-ating";
  }

  const ting = new RegExp(`\\b${escapeRegex(stem)}(?!at)\\w*ting\\b`, "i");
  if (ting.test(d)) return "tor-ting";

  return null;
}

const PRODUCTION_STEM_SUFFIXES = [
  "making",
  "smithing",
  "working",
  "beating",
  "weaving",
  "forming",
  "fabrication",
  "ization",
  "isation",
  "ation",
];

function productionStem(word) {
  const w = word.toLowerCase();
  for (const suf of PRODUCTION_STEM_SUFFIXES) {
    if (w.endsWith(suf) && w.length > suf.length + 2) {
      return w.slice(0, -suf.length);
    }
  }
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  return w;
}

const PRODUCTION_META_CAPTURE_PATTERNS = [
  [/^the manufacture of (?:a |an |the )?(\w+)/i, "manufacture-of"],
  [/^the making of (?:a |an |the )?(\w+)/i, "making-of"],
  [/^the creation of (?:a |an |the )?(\w+)/i, "creation-of"],
  [
    /\bthe (?:art|process|business|trade) of (?:making|manufacturing|producing|creating) (\w+)/gi,
    "production-art",
  ],
  [
    /\bprocess of (?:making|manufacturing|producing|creating) (\w+)/gi,
    "production-process",
  ],
  [
    /\b(?:making|manufacture|manufacturing|production|creation) of (\w+)/gi,
    "production-of",
  ],
  [/\bart of (?:making|manufacturing) (\w+)/gi, "production-art-of"],
];

/** “The manufacture/making/creation of X” when X matches the headword stem (bagmaking → bags). */
export function productionMetaReason(word, definition) {
  const w = word.toLowerCase();
  const d = definition.trim().replace(/\.+$/, "").toLowerCase();
  const stem = productionStem(w);
  if (!stem || stem.length < 3) return null;

  for (const [re, reason] of PRODUCTION_META_CAPTURE_PATTERNS) {
    if (re.global) {
      for (const m of d.matchAll(re)) {
        if (adjectiveMatchesLyStem(m[1].toLowerCase(), stem, w)) return reason;
      }
    } else {
      const m = d.match(re);
      if (m && adjectiveMatchesLyStem(m[1].toLowerCase(), stem, w)) {
        return reason;
      }
    }
  }

  return null;
}

/** Ordered: first match wins for rejectReason(). */
const REJECT_RULES = [
  {
    reason: "meta-of",
    re: /^(plural|singular|past tense|simple past tense|past participle|present participle|gerund|abbreviation|alternative form|variant of|variant spelling|short for|obsolete form|misspelling|eye dialect|rare form|synonym of|female equivalent|male equivalent|comparative|superlative|diminutive|augmentative|feminine|masculine|contraction|acronym|initialism|ellipsis|common misspelling|elongated form|inflection) of /i,
  },
  { reason: "spelling-of", re: /^(\S+\s+)*spelling of /i },
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
    re: /^a (person|woman|man|child|machine|device|tool) (who|that|which|whose|whom) /i,
  },
  { reason: "person-from", re: /^a person from /i },
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
  { reason: "by-extension", re: /\(by extension\)/i },
  { reason: "gui", re: /\(GUI\)/i },
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
  if (word.endsWith("like")) return "suffix-like";
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

/** Formulaic “treat(ed) with X” glosses; not idiomatic “treat with affection”. */
const TREAT_WITH_OBJECT_SKIP =
  /^(?:affection|care|tenderness|indignity|respect|earnest|veneration|excessive)\b/;

function treatWithMetaReason(text) {
  const d = text.trim().replace(/\.+$/, "").toLowerCase();

  if (/^treated with\b/.test(d)) return "treated-with";
  if (/^having been treated with\b/.test(d)) return "treated-with";
  if (/^treated or impregnated with\b/.test(d)) return "treated-with";
  if (/\b(?:has|have|had) been treated with\b/.test(d)) return "treated-with";
  if (/\bor treated with\b/.test(d)) return "treated-with";

  const toTreat = d.match(
    /^to (?:prepare or |combine or |react or )?treat with (?:a |an |the )?([\w-]+)/,
  );
  if (toTreat) {
    if (!TREAT_WITH_OBJECT_SKIP.test(toTreat[1])) return "treat-with";
  }

  return null;
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

  const treatReason = treatWithMetaReason(text);
  if (treatReason) return treatReason;

  if (/\bmaker\b/i.test(text)) return "maker-mention";

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
  return tags.some((tag) => /^symbol\s*:?\s*/i.test(tag.trim()));
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
  if (hasSymbolNotation(source, tags) || hasSymbolNotation(text, tags)) {
    return null;
  }
  if (!isQuizDefinition(text)) return null;
  if (selfReferenceReason(word, text)) return null;
  if (productionMetaReason(word, text)) return null;
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
