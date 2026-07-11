import Stripe from "stripe";

/** Una sola suscripción billable por customer/email: active / trialing / past_due. */
export const BILLABLE_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
]);

export function isBillableSubscriptionStatus(status: string): boolean {
  return BILLABLE_SUBSCRIPTION_STATUSES.has(status);
}

/** True si el customer (o cualquier customer con el mismo email) ya tiene sub billable. */
export async function customerHasBillableSubscription(
  stripe: Stripe,
  params: { customerId?: string | null; email?: string | null }
): Promise<{ hasBillable: boolean; subscriptionId?: string }> {
  const { customerId, email } = params;

  if (customerId) {
    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      limit: 100,
    });
    const billable = subs.data.find((s) => isBillableSubscriptionStatus(s.status));
    if (billable) {
      return { hasBillable: true, subscriptionId: billable.id };
    }
  }

  if (email) {
    const customers = await stripe.customers.list({
      email: email.toLowerCase().trim(),
      limit: 100,
    });
    for (const customer of customers.data) {
      if (customer.id === customerId) continue;
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "all",
        limit: 100,
      });
      const billable = subs.data.find((s) =>
        isBillableSubscriptionStatus(s.status)
      );
      if (billable) {
        return { hasBillable: true, subscriptionId: billable.id };
      }
    }
  }

  return { hasBillable: false };
}
