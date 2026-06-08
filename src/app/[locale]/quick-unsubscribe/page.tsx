import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { createServiceClient } from "@/lib/supabase/service";
import { stripe } from "@/lib/stripe";
import { verifyUnsubscribeToken } from "@/lib/webhook-auth";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}

type UnsubscribeState = "invalid" | "not_found" | "success" | "error";

async function cancelSubscriptionForCustomer(
  email: string,
  customerId: string
): Promise<Exclude<UnsubscribeState, "invalid">> {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 10,
  });

  const activeSubscription = subscriptions.data.find((subscription) =>
    ["active", "trialing", "past_due"].includes(subscription.status)
  );

  if (!activeSubscription) {
    return "not_found";
  }

  await stripe.subscriptions.cancel(activeSubscription.id);

  const supabase = createServiceClient();
  const { data: authUser } = await supabase.auth.admin.listUsers();
  const user = authUser?.users?.find(
    (candidate) => candidate.email?.toLowerCase() === email.toLowerCase()
  );

  if (user) {
    await supabase
      .from("subscriptions")
      .update({
        status: "canceled",
        plan: "free",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);
  }

  return "success";
}

export default async function QuickUnsubscribePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { token } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Cancel" });

  let state: UnsubscribeState = "invalid";

  if (token) {
    try {
      const { email, customerId } = await verifyUnsubscribeToken(token);
      state = await cancelSubscriptionForCustomer(email, customerId);
    } catch (error) {
      console.error("[quick-unsubscribe] error:", error);
      state = "error";
    }
  }

  const title =
    state === "success"
      ? t("cancelSuccess")
      : state === "not_found"
        ? t("notFound")
        : state === "error"
          ? t("errorGeneric")
          : t("title");

  const description =
    state === "success"
      ? t("cancelSuccessDesc")
      : state === "invalid"
        ? t("desc2")
        : state === "not_found"
          ? t("notFound")
          : t("errorGeneric");

  return (
    <div
      className="container"
      style={{
        padding: "4rem 1rem",
        maxWidth: "640px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="glass-card mb-4" style={{ padding: "3rem 2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          {state === "success" ? "✅" : state === "invalid" ? "⚠️" : "❌"}
        </div>
        <h1
          className="mb-2"
          style={{ fontSize: "2rem", color: "var(--brand-primary)" }}
        >
          {title}
        </h1>
        <p
          className="mb-4"
          style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}
        >
          {description}
        </p>
        <Link href="/" className="btn btn-outline" style={{ padding: "0.9rem 2rem" }}>
          {t("btnHome")}
        </Link>
      </div>
    </div>
  );
}
