"use server";

import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getJwtSecretKey } from "@/lib/jwtSecret";

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload) {
  const key = getJwtSecretKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session) {
  try {
    const key = getJwtSecretKey();
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, session, { ...cookie.options, expires });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookie.name)?.value;
  const session = await decrypt(cookieValue);
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId };
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("role");
  cookieStore.delete("id");
  cookieStore.delete(cookie.name);
}
