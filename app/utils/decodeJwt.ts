export default function decodeJwt<T = Record<string, unknown>>(jwt: string): T | null {
  try {
    const [, payload] = jwt.split(".");

    if (!payload) {
      throw new Error("Invalid JWT");
    }

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

    const decoded = new TextDecoder().decode(bytes);

    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
}