// Central place for the GoLore backend URL. Nothing else in the app
// should hardcode this string, and no API keys ever live here or
// anywhere else in frontend code — those stay inside the Worker.
export const GOLORE_API_URL = "https://golore-api.kc18042007.workers.dev/";

export class GoLoreError extends Error {
  constructor(message, { code = "unknown", status = null, details = null } = {}) {
    super(message);
    this.name = "GoLoreError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

export function validateImageFile(file) {
  if (!file) return { ok: false, reason: "No file provided." };
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, reason: "That image is over 10MB. Try a smaller photo." };
  }
  const looksLikeImage = file.type?.startsWith("image/") || ACCEPTED_TYPES.includes(file.type);
  if (!looksLikeImage) {
    return { ok: false, reason: "That file doesn't look like an image. Try a JPG, PNG, WEBP or HEIC." };
  }
  return { ok: true };
}

// Reads a File into a base64 string (without the data: prefix) plus its mime type.
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const commaIndex = result.indexOf(",");
      const base64 = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
      resolve({ base64, mimeType: file.type || "image/jpeg" });
    };
    reader.onerror = () => reject(new GoLoreError("Could not read that image file.", { code: "read_failed" }));
    reader.readAsDataURL(file);
  });
}

/**
 * Sends an image (and optional text context) to the GoLore Worker and
 * returns the parsed place profile. Throws GoLoreError on any failure.
 */
export async function analyzePlace({ imageBase64, mimeType, text }, { signal } = {}) {
  let response;
  try {
    response = await fetch(GOLORE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: imageBase64 || "",
        mimeType: mimeType || "image/jpeg",
        text: text || "",
      }),
      signal,
    });
  } catch (err) {
    if (err?.name === "AbortError") throw err;
    console.error("GoLore network error:", err);
    throw new GoLoreError(
      "Couldn't reach GoLore. Check your connection and try again.",
      { code: "network" }
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch (err) {
    console.error("GoLore response was not valid JSON:", err);
    throw new GoLoreError("GoLore sent back something unexpected.", {
      code: "bad_response",
      status: response.status,
    });
  }

  if (!response.ok) {
    console.error("GoLore API error:", data);
    const message =
      response.status >= 500
        ? "GoLore is having trouble on its end. Please try again in a moment."
        : data?.error || "GoLore couldn't process that request.";
    throw new GoLoreError(message, {
      code: "api_error",
      status: response.status,
      details: data,
    });
  }

  if (!data || !data.placeName) {
    console.error("GoLore returned an incomplete profile:", data);
    throw new GoLoreError("GoLore couldn't build a full profile from that photo.", {
      code: "incomplete",
    });
  }

  return data;
}
