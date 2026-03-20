import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Look up the user by email in auth.users via the subscriptions table
    // We join to auth.users through user_id
    const { data: authUser } = await supabase.auth.admin.listUsers();
    const user = authUser?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json({ found: false });
    }

    // Get their subscription record
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("stripe_subscription_id, status")
      .eq("user_id", user.id)
      .single();

    // No active subscription
    const isActive =
      sub &&
      (sub.status === "active" || sub.status === "trialing") &&
      sub.stripe_subscription_id;

    if (!isActive) {
      return NextResponse.json({ found: false });
    }

    // Cancel the subscription in Stripe immediately
    await stripe.subscriptions.cancel(sub.stripe_subscription_id);

    // Optimistically update Supabase (webhook will also fire)
    await supabase
      .from("subscriptions")
      .update({
        status: "canceled",
        plan: "free",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    return NextResponse.json({ found: true });
  } catch (error) {
    console.error("[stripe/cancel] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
