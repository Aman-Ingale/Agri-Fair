import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";
import { getJwtSecretKey } from "@/lib/jwtSecret";

const SESSION_COOKIE_NAME = "session";

const AUTH_PAGES = new Set(["/login", "/signup"]);

const PROTECTED_PAGE_PREFIXES = [
  "/dashboard",
  "/orders",
  "/bids",
  "/profile",
  "/addListing",
  "/addlisting",
];

const BUYER_BLOCKED_PAGE_PREFIXES = ["/dashboard"];

// ---------- Helpers ----------

function isProtectedPage(pathname) {
  return PROTECTED_PAGE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function isAuthPage(pathname) {
  return AUTH_PAGES.has(pathname);
}

function isBuyerBlockedPage(pathname) {
  return BUYER_BLOCKED_PAGE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function isPublicApi(pathname, method) {
  if (!pathname.startsWith("/api/")) return false;

  // Auth endpoints must remain public
  if (pathname.toLowerCase().startsWith("/api/auth")) return true;

  // Cookie helper
  if (pathname === "/api/cookie") return true;

  // Listings read allowed, write protected
  if (pathname.startsWith("/api/listings")) {
    return method === "GET";
  }

  return false;
}

async function verifySessionToken(token) {
  if (!token) return null;

  try {
    const key = getJwtSecretKey();

    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    if (!payload?.userId) return null;

    // Expiry check
    if (payload?.expires) {
      const expMs = new Date(payload.expires).getTime();
      if (Number.isFinite(expMs) && expMs < Date.now()) return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// ---------- MAIN PROXY ----------

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionToken);

  const isAuthed = Boolean(session?.userId);
  const role = request.cookies.get("role")?.value;

  // ---------- API PROTECTION ----------
  if (pathname.startsWith("/api/") && !isPublicApi(pathname, method)) {
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // ---------- PAGE PROTECTION ----------
  if (isProtectedPage(pathname) && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ---------- ROLE-BASED ACCESS ----------
  if (isAuthed && role === "buyer" && isBuyerBlockedPage(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/listings";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // ---------- AUTH PAGE BLOCK ----------
  if (isAuthPage(pathname) && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = role === "buyer" ? "/listings" : "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ---------- MATCHER ----------

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};