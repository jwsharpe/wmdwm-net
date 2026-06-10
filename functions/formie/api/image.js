import { decodePhotoUrl } from "../../../formie/scripts/obfuscate.mjs";

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
    return new Response("Missing p parameter", { status: 400, headers: CORS });
  }

  let url;
  try {
    url = decodePhotoUrl(token);
  } catch {
    return new Response("Invalid token", { status: 400, headers: CORS });
  }

  if (!url.includes("googleusercontent.com")) {
    return new Response("Invalid token", { status: 400, headers: CORS });
  }

  const width = params.get("w") || "1600";
  const imageUrl = `${url}=w${width}`;

  try {
    const res = await fetch(imageUrl, { redirect: "follow" });
    if (!res.ok) {
      return new Response("Upstream error", { status: 502, headers: CORS });
    }

    return new Response(res.body, {
      headers: {
        ...CORS,
        "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch {
    return new Response("Upstream error", { status: 502, headers: CORS });
  }
}
