#!/usr/bin/env node
/**
 * Build sarmie/data/words.json from mhollingshead/open-dictionary (Wiktionary).
 * Run: node sarmie/scripts/build-words.mjs
 */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  isQuizWord,
  buildEntry,
  rejectReason,
  stripHtml,
  entryRejectReason,
  stemPrefixRejectReason,
} from "./filters.mjs";
import { loadWordLists, wordListRejectReason } from "./word-lists.mjs";

const EXCLUDE_COMMON_COUNT = Number(process.env.SARMIE_EXCLUDE_COMMON ?? 20_000);
const REFRESH_BLOCKLIST = process.env.SARMIE_REFRESH_BLOCKLIST === "1";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "../data/words.json");
const BASE =
  "https://raw.githubusercontent.com/mhollingshead/open-dictionary/main/api";
const GITHUB_TREE =
  "https://api.github.com/repos/mhollingshead/open-dictionary/git/trees/main?recursive=1";

const CONCURRENCY = 12;

async function listShardPaths() {
  const res = await fetch(GITHUB_TREE);
  if (!res.ok) throw new Error(`GitHub tree: ${res.status}`);
  const data = await res.json();
  return data.tree
    .filter((t) => t.path.startsWith("api/") && t.path.endsWith(".json"))
    .map((t) => t.path.replace(/^api\//, ""));
}

async function fetchShard(relativePath) {
  const url = `${BASE}/${relativePath}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}

async function mapPool(items, fn, limit) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
}

async function main() {
  const rejectCounts = {};
  let noSense = 0;
  let badWord = 0;
  let suffixDrop = 0;
  let blocklistDrop = 0;
  let commonDrop = 0;

  console.log("Loading word lists…");
  const wordLists = await loadWordLists({
    excludeCommonCount: EXCLUDE_COMMON_COUNT,
    refreshBlocklist: REFRESH_BLOCKLIST,
  });
  console.log(
    `  blocklist: ${wordLists.blocklist.size} words | common top-${EXCLUDE_COMMON_COUNT}: ${wordLists.commonTop.size} words`,
  );

  console.log("Listing shards…");
  const shards = await listShardPaths();
  console.log(`Fetching ${shards.length} shards…`);

  const byWord = new Map();
  let processed = 0;

  await mapPool(
    shards,
    async (shard) => {
      const blob = await fetchShard(shard);
      for (const entry of Object.values(blob)) {
        if (!entry?.word) continue;

        const row = buildEntry(entry);
        if (!row) {
          const fallback = (entry.etymologies ?? [])
            .flatMap((e) => e.partsOfSpeech ?? [])
            .flatMap((p) => p.senses ?? [])
            .map((s) => stripHtml(s.sense ?? ""))
            .find(Boolean);
          const reason = fallback ? rejectReason(fallback) : "no-senses";
          rejectCounts[reason ?? "no-senses"] =
            (rejectCounts[reason ?? "no-senses"] ?? 0) + 1;
          noSense += 1;
          continue;
        }

        if (!isQuizWord(row.word)) {
          badWord += 1;
          continue;
        }

        const entryReason = entryRejectReason(row);
        if (entryReason) {
          suffixDrop += 1;
          continue;
        }

        const listReason = wordListRejectReason(row.word, wordLists);
        if (listReason === "blocklist") {
          blocklistDrop += 1;
          continue;
        }
        if (listReason === "common") {
          commonDrop += 1;
          continue;
        }

        if (!byWord.has(row.word)) byWord.set(row.word, row);
      }
      processed += 1;
      if (processed % 50 === 0 || processed === shards.length) {
        console.log(`  ${processed}/${shards.length} shards — ${byWord.size} words`);
      }
    },
    CONCURRENCY,
  );

  const prefixDrop = { de: 0, un: 0 };
  for (const word of [...byWord.keys()]) {
    const reason = stemPrefixRejectReason(word, byWord);
    if (reason) {
      byWord.delete(word);
      if (reason === "prefix-de") prefixDrop.de += 1;
      else if (reason === "prefix-un") prefixDrop.un += 1;
    }
  }

  const words = [...byWord.values()].sort((a, b) =>
    a.word.localeCompare(b.word),
  );

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(words));

  const mb = (Buffer.byteLength(JSON.stringify(words)) / 1e6).toFixed(2);
  console.log(`\nWrote ${words.length} entries to ${OUT_PATH} (${mb} MB)`);
  console.log(`Dropped: ${noSense} entries with no quiz-worthy sense`);
  console.log(`Dropped: ${badWord} entries failing word rules`);
  console.log(`Dropped: ${suffixDrop} entries with suffix rules (-ist, -ly noun, -osis, -plasty, long -able/-ness)`);
  console.log(`Dropped: ${blocklistDrop} blocklisted words`);
  console.log(`Dropped: ${commonDrop} top-${EXCLUDE_COMMON_COUNT} common words`);
  console.log(
    `Dropped: ${prefixDrop.de} de- and ${prefixDrop.un} un- prefixed words (stem also in list)`,
  );
  console.log("Top reject reasons (no qualifying sense):");
  Object.entries(rejectCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .forEach(([reason, n]) => console.log(`  ${reason}: ${n}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
