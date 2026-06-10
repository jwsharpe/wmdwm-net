# formie

A minimal single-page app that shows a random photo from Google Photos shared albums.

Photos are **not downloaded** — the app loads Google's hosted image URLs (`lh3.googleusercontent.com`) directly in the browser, the same way Google Photos embeds them.

## Setup

1. Add shared album URLs to `data/albums.json`:

```json
[
  "https://photos.app.goo.gl/…",
  "https://photos.google.com/share/…?key=…"
]
```

2. Deploy with [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) enabled — the `functions/formie/api/album.js` endpoint reads album metadata server-side (browsers can't fetch Google Photos pages directly due to CORS) and returns embed URLs.

3. Open `formie/index.html`.

For local dev with the API:

```bash
npx wrangler pages dev .
```

Then visit `/formie/`.

Albums with more than ~500 photos may only return the first page — a Google limitation on shared album HTML.

## Data

`data/albums.json` — list of shared album URLs. No build step or cached photo list needed.

Type definitions: [`scripts/schema.d.ts`](scripts/schema.d.ts).
