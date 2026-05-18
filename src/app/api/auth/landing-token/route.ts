import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { createServiceClient } from "@/lib/supabase/service";

const SECRET = process.env.JWT_LANDING_SECRET;

/** Encode the raw secret as a Uint8Array for jose */
function getSecretKey() {
  if (!SECRET) throw new Error("JWT_LANDING_SECRET is not set");
  return new TextEncoder().encode(SECRET);
}

export async function POST(req: NextRequest) {
  // 1. Validate shared secret header
  const apiSecret = req.headers.get("x-api-secret");
  if (!SECRET || apiSecret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse body
  let email: string;
  try {
    const body = await req.json();
    email = (body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // 3. Sign JWT – always return the token, regardless of user existence
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(getSecretKey());

  // 4. Fire-and-forget: try to pre-create the user in Supabase
  //    Errors are intentionally swallowed – the login route handles creation too.
  (async () => {
    try {
      const supabase = createServiceClient();
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });
    } catch {
      // Ignore – user may already exist
    }
  })();

  // 5. Return the base64url-encoded token
  return NextResponse.json({ token });
}
