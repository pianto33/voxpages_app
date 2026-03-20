import { SupabaseClient } from "@supabase/supabase-js";

export async function hasActiveSubscription(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", userId)
    .single();

  if (error || !data) return false;

  if (data.status === "active" || data.status === "trialing") {
    // If there's a period end date, check it hasn't passed
    if (data.current_period_end) {
      return new Date(data.current_period_end) > new Date();
    }
    return true;
  }

  return false;
}
