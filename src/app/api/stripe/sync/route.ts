import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

/**
 * POST /api/stripe/sync
 * Syncs the current user's Stripe subscription status into Supabase.
 * Called from the success redirect after checkout when webhooks may not have fired yet.
 */
export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createServiceClient();

    // Get their subscription record from Supabase
    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    if (!sub?.stripe_customer_id) {
      return NextResponse.json({ synced: false, reason: "no_customer" });
    }

    // Fetch active subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: sub.stripe_customer_id,
      status: "all",
      limit: 1,
    });

    const stripeSub = subscriptions.data[0];

    if (!stripeSub) {
      return NextResponse.json({ synced: false, reason: "no_subscription" });
    }

    const status = stripeSub.status;
    const plan = status === "active" || status === "trialing" ? "premium" : "free";
    const currentPeriodEnd = new Date(
      (stripeSub as unknown as { current_period_end: number }).current_period_end * 1000
    ).toISOString();

    await supabaseAdmin
      .from("subscriptions")
      .update({
        status,
        plan,
        stripe_subscription_id: stripeSub.id,
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    return NextResponse.json({ synced: true, status, plan });
  } catch (error) {
    console.error("[stripe/sync] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
