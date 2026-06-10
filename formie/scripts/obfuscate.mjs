const KEY = "wmdwm-formie";

function xorBytes(bytes) {
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ KEY.charCodeAt(i % KEY.length);
  }
  return out;
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(token) {
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

export function encode(value) {
  return toBase64Url(xorBytes(new TextEncoder().encode(value)));
}

export function decode(token) {
  return new TextDecoder().decode(xorBytes(fromBase64Url(token)));
}

export const encodePhotoUrl = encode;
export const decodePhotoUrl = decode;
