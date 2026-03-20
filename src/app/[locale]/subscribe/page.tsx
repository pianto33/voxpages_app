import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubscribeCheckout } from "@/components/subscribe-checkout";

export default async function SubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Must be logged in to see this page
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // If they already have an active subscription, send them to the library
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const isActive =
    sub &&
    (sub.status === "active" || sub.status === "trialing") &&
    (!sub.current_period_end || new Date(sub.current_period_end) > new Date());

  if (isActive) redirect(`/${locale}/home`);

  const userName = user.email?.split("@")[0] || "there";

  return <SubscribeCheckout userName={userName} />;
}
