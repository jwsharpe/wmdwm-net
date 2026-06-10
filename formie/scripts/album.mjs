// Google serves a JS stub to browser UAs; a simple UA gets a 302 to the share page.
const FETCH_HEADERS = { "User-Agent": "formie/1.0" };

export async function resolveAlbumUrl(input) {
  const trimmed = input.trim();
  if (trimmed.includes("photos.google.com/share")) return trimmed;

  let url = trimmed;
  for (let hop = 0; hop < 5; hop++) {
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) break;
      url = new URL(location, url).href;
      if (url.includes("photos.google.com/share")) return url;
      continue;
    }
    break;
  }

  throw new Error("Could not resolve album URL — try the photos.google.com/share link");
}

export function parseInitData(html) {
  const re = /AF_initDataCallback\(\{[^}]*data:(.+?), sideChannel:/g;
  let best = null;
  for (const match of html.matchAll(re)) {
    const candidate = match[1];
    if (!best || candidate.length > best.length) best = candidate;
  }
  if (!best) throw new Error("Could not find album data in page HTML");
  return JSON.parse(best);
}

export function extractPhotos(initData, albumUrl) {
  const items = initData?.[1];
  if (!Array.isArray(items)) throw new Error("Unexpected album data shape");

  const photos = [];
  for (const entry of items) {
    if (!Array.isArray(entry) || entry.length < 2) continue;
    const detail = entry[1];
    if (!Array.isArray(detail) || detail.length < 3) continue;
    const [url, width, height] = detail;
    if (typeof url !== "string" || !url.includes("googleusercontent.com")) continue;
    const takenAt = typeof entry[2] === "number" ? entry[2] : null;
    photos.push({
      id: typeof entry[0] === "string" ? entry[0] : url,
      url,
      width: typeof width === "number" ? width : null,
      height: typeof height === "number" ? height : null,
      takenAt,
      albumUrl,
    });
  }

  if (photos.length === 0) throw new Error("No photos found in album");
  return photos;
}

export async function fetchAlbumPhotos(albumUrl) {
  const shareUrl = await resolveAlbumUrl(albumUrl);
  const res = await fetch(shareUrl, {
    headers: FETCH_HEADERS,
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const initData = parseInitData(html);
  return extractPhotos(initData, albumUrl);
}
