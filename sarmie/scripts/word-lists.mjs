import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const LISTS_DIR = join(__dirname, "../data/lists");

const COMMON_FREQ_FILE = "google-20000-english.txt";
const BLOCKLIST_FILE = "blocklist-en.txt";

const COMMON_FREQ_URL =
  "https://raw.githubusercontent.com/first20hours/google-10000-english/master/20k.txt";
const BLOCKLIST_URL =
  "https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en";

/** @returns {Promise<string>}
 */
async function readCachedOrFetch(filename, url) {
  const path = join(LISTS_DIR, filename);
  try {
    return await readFile(path, "utf8");
  } catch {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const text = await res.text();
    await mkdir(LISTS_DIR, { recursive: true });
    await writeFile(path, text, "utf8");
    return text;
  }
}

/** Single-token a–z entries only. */
function parseWordLines(text) {
  const words = new Set();
  for (const line of text.split(/\n/)) {
    const word = line.trim().toLowerCase();
    if (/^[a-z]+$/.test(word)) words.add(word);
  }
  return words;
}

/**
 * @param {{ excludeCommonCount?: number, refreshBlocklist?: boolean }} opts
 * @returns {Promise<{ blocklist: Set<string>, commonTop: Set<string> }>}
 */
export async function loadWordLists(opts = {}) {
  const excludeCommonCount = opts.excludeCommonCount ?? 20_000;
  const refreshBlocklist = opts.refreshBlocklist ?? false;

  const freqPath = join(LISTS_DIR, COMMON_FREQ_FILE);
  let freqText;
  try {
    freqText = await readFile(freqPath, "utf8");
  } catch {
    freqText = await readCachedOrFetch(COMMON_FREQ_FILE, COMMON_FREQ_URL);
  }

  const blockPath = join(LISTS_DIR, BLOCKLIST_FILE);
  let blockText;
  if (refreshBlocklist) {
    const res = await fetch(BLOCKLIST_URL);
    if (!res.ok) throw new Error(`Failed to fetch blocklist: ${res.status}`);
    blockText = await res.text();
    await mkdir(LISTS_DIR, { recursive: true });
    await writeFile(blockPath, blockText, "utf8");
  } else {
    try {
      blockText = await readFile(blockPath, "utf8");
    } catch {
      blockText = await readCachedOrFetch(BLOCKLIST_FILE, BLOCKLIST_URL);
    }
  }

  const commonTop = new Set();
  if (excludeCommonCount > 0) {
    const lines = freqText.trim().split(/\n/);
    for (let i = 0; i < Math.min(excludeCommonCount, lines.length); i++) {
      const word = lines[i].trim().toLowerCase();
      if (/^[a-z]+$/.test(word)) commonTop.add(word);
    }
  }

  return {
    blocklist: parseWordLines(blockText),
    commonTop,
  };
}

/**
 * @param {string} word
 * @param {{ blocklist: Set<string>, commonTop: Set<string> }} lists
 * @returns {"blocklist"|"common"|null}
 */
export function wordListRejectReason(word, lists) {
  if (lists.blocklist.has(word)) return "blocklist";
  if (lists.commonTop.has(word)) return "common";
  return null;
}
