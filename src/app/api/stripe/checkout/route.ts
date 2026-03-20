import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { getPriceForCountry } from "@/lib/stripe-prices";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = createServiceClient();

    // Get existing subscription record to check for existing stripe_customer_id
    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let customerId = sub?.stripe_customer_id;

    // Create or reuse Stripe customer
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      // Save the customer ID immediately
      await supabaseAdmin
        .from("subscriptions")
        .update({ stripe_customer_id: customerId })
        .eq("user_id", user.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Read optional price key sent by the client (from localStorage, captured via ?pr= URL param)
    const body = await req.json().catch(() => ({}));
    const priceKey: string | null = body.priceKey ?? null;

    // Detect locale from referer or default to "es"
    const referer = req.headers.get("referer") || "";
    const localeMatch = referer.match(/\/(es|en|pt)\//);
    const locale = localeMatch?.[1] || "es";

    // Detect country via Vercel geo header (available in production on Vercel)
    const country = req.headers.get("x-vercel-ip-country") ?? null;

    // Priority: explicit key (localStorage) → geo → DEFAULT
    const priceConfig = getPriceForCountry(country, priceKey);


    // Create Stripe Checkout Session with 24h trial
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceConfig.priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 1, // 24-hour trial
      },
      success_url: `${appUrl}/${locale}/home?subscribed=true`,
      cancel_url: `${appUrl}/${locale}/subscribe?canceled=true`,
      customer_email: customerId ? undefined : user.email,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
