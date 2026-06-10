import { fetchAlbumPhotos } from "../../../formie/scripts/album.mjs";
import { decode, encode } from "../../../formie/scripts/obfuscate.mjs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestGet({ request }) {
  const params = new URL(request.url).searchParams;
  const token = params.get("p");
  if (!token) {
    return Response.json({ error: "Missing p parameter" }, { status: 400, headers: CORS });
  }

  let albumUrl;
  try {
    albumUrl = decode(token);
  } catch {
    return Response.json({ error: "Invalid token" }, { status: 400, headers: CORS });
  }

  try {
    const photos = await fetchAlbumPhotos(albumUrl);
    return Response.json(
      {
        photos: photos.map(({ id, url, width, height, takenAt }) => ({
          id,
          u: encode(url),
          width,
          height,
          takenAt,
        })),
      },
      { headers: CORS },
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 502, headers: CORS });
  }
}
