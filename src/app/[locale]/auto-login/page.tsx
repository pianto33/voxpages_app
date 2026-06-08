import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/service";
import {
  resolveCallbackPath,
  verifyAutoLoginToken,
} from "@/lib/webhook-auth";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; callbackUrl?: string }>;
}

export default async function AutoLoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { token, callbackUrl } = await searchParams;

  if (!token) {
    redirect(`/${locale}/login?error=invalid_token`);
  }

  let email: string;
  try {
    ({ email } = await verifyAutoLoginToken(token));
  } catch {
    redirect(`/${locale}/login?error=invalid_token`);
  }

  const supabase = createServiceClient();
  try {
    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
  } catch {
    // User already exists
  }

  const nextPath = resolveCallbackPath(callbackUrl, locale);
  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/auth/callback?next=${encodeURIComponent(nextPath)}`,
    },
  });

  if (error || !data?.properties?.action_link) {
    console.error("[auto-login] generateLink error:", error?.message);
    redirect(`/${locale}/login?error=login_failed`);
  }

  redirect(data.properties.action_link);
}
