import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import {
  signAutoLoginToken,
  validateWebhookApiKey,
} from "@/lib/webhook-auth";

export async function POST(req: NextRequest) {
  if (!validateWebhookApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let email: string;
  let customerId: string | undefined;
  let name: string | undefined;

  try {
    const body = await req.json();
    email = (body?.email ?? "").trim().toLowerCase();
    customerId =
      typeof body?.customerId === "string" ? body.customerId : undefined;
    name = typeof body?.name === "string" ? body.name : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  try {
    const token = await signAutoLoginToken({ email, customerId, name });

    (async () => {
      try {
        const supabase = createServiceClient();
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        });
      } catch {
        // User may already exist
      }
    })();

    return NextResponse.json({ token });
  } catch (error) {
    console.error("[generate-auto-login-token] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
