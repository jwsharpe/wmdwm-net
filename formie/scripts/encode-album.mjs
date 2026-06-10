import { encode } from "./obfuscate.mjs";

const url = process.argv[2]?.trim();
if (!url) {
  console.error("Usage: node scripts/encode-album.mjs <album-url>");
  process.exit(1);
}

console.log(encode(url));
