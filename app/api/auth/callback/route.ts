import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ALLOWED_EMAIL = "renzelloshane@gmail.com";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const loginUrl = new URL("/admin/login", origin);

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state");

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/admin/login?error=1", origin));
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: `${origin}/api/auth/callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/admin/login?error=1", origin));
  }

  const { access_token } = await tokenRes.json();

  // Get the user's email from Google
  const userRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  if (!userRes.ok) {
    return NextResponse.redirect(new URL("/admin/login?error=1", origin));
  }

  const { email } = await userRes.json();
  const sessionToken = process.env.ADMIN_TOKEN;

  if (email !== ALLOWED_EMAIL || !sessionToken) {
    loginUrl.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(loginUrl);
  }

  cookieStore.set("admin_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return NextResponse.redirect(new URL("/admin/dashboard", origin));
}
