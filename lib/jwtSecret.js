/**
 * Shared JWT signing key (HS256). Set JWT_SECRET in production (Vercel env).
 */
export async function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_SECRET is required in production. Add it in Vercel Project Settings → Environment Variables."
      );
    }
    return new TextEncoder().encode("aman");
  }
  return new TextEncoder().encode(secret);
}
