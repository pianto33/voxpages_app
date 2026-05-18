import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { createServiceClient } from "@/lib/supabase/service";

interface Props {
  params: Promise<{ locale: string; token: string }>;
}

/** Encode the raw secret as a Uint8Array for jose */
function getSecretKey() {
  const secret = process.env.JWT_LANDING_SECRET;
  if (!secret) throw new Error("JWT_LANDING_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export default async function JwtLoginPage({ params }: Props) {
  const { locale, token } = await params;

  // 1. Verify JWT
  let email: string;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload.email || typeof payload.email !== "string") {
      throw new Error("Invalid payload");
    }
    email = payload.email.trim().toLowerCase();
  } catch {
    // Token invalid or expired
    redirect(`/${locale}/login?error=invalid_token`);
  }

  // 2. Upsert user in Supabase (create if not exists, confirm email automatically)
  const supabase = createServiceClient();
  try {
    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
  } catch {
    // User already exists – that's fine, continue
  }

  // 3. Generate a magic-link OTP and extract the redirect URL
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/callback?next=/${locale}/home`,
    },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[jwt-login] generateLink error:", error?.message);
    redirect(`/${locale}/login?error=login_failed`);
  }

  // 4. Redirect the user to the magic-link URL so Supabase sets the session cookie
  redirect(data.properties.action_link);
}
