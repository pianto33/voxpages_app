import { NextRequest, NextResponse } from "next/server";
import {
  signUnsubscribeToken,
  validateWebhookApiKey,
} from "@/lib/webhook-auth";

export async function POST(req: NextRequest) {
  if (!validateWebhookApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let email: string;
  let customerId: string;

  try {
    const body = await req.json();
    email = (body?.email ?? "").trim().toLowerCase();
    customerId = (body?.customerId ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (!customerId) {
    return NextResponse.json({ error: "customerId is required" }, { status: 400 });
  }

  try {
    const token = await signUnsubscribeToken({ email, customerId });
    return NextResponse.json({ token });
  } catch (error) {
    console.error("[generate-unsubscribe-token] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
