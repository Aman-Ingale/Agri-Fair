import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "session";
const JWT_SECRET = new TextEncoder().encode("aman");

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
  if (pathname.startsWith("/api/auth")) return true;

  // Cookie helper is used right after login
  if (pathname === "/api/cookie") return true;

  // Allow browsing listings without a session; protect mutations
  if (pathname.startsWith("/api/listings")) {
    return method === "GET";
  }

  return false;
}

async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (!payload?.userId) return null;

    // `expires` is stored as a Date when created; JWT serializes it as a string.
    if (payload?.expires) {
      const expMs = new Date(payload.expires).getTime();
      if (Number.isFinite(expMs) && expMs < Date.now()) return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionToken);
  const isAuthed = Boolean(session?.userId);
  const role = request.cookies.get("role")?.value;

  // API protection (prefer JSON 401 over redirect)
  if (pathname.startsWith("/api/") && !isPublicApi(pathname, method)) {
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Page protection
  if (isProtectedPage(pathname) && !isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Role-based access: buyers cannot access dashboard (everything else is common)
  if (isAuthed && role === "buyer" && isBuyerBlockedPage(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/listings";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from going back to login/signup
  if (isAuthPage(pathname) && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = role === "buyer" ? "/listings" : "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // All pages + APIs, excluding Next internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

