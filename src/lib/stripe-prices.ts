/**
 * Stripe Price IDs per country/currency.
 *
 * How to get a Price ID:
 *   Stripe Dashboard → Products → [your product] → Pricing → Copy Price ID (price_xxx)
 *
 * Add entries here for each country or currency you want to support.
 * The checkout route uses the `x-vercel-ip-country` header to pick the right one.
 */

export interface PriceConfig {
  priceId: string;
  currency: string;
  label: string; // Human-readable, e.g. "USD 29.99/month"
}

// Map of ISO 3166-1 alpha-2 country codes → Stripe Price config
export const PRICES_BY_COUNTRY: Record<string, PriceConfig> = {
  // Spain
  ES: {
    priceId: "price_1TD8AGIiQJtaidhOVuTvAq14",
    currency: "EUR",
    label: "EUR 19.99 / mes",
  },
  TEST: {
    priceId: "price_1TD8B4IiQJtaidhOXAkoMP6e",
    currency: "USD",
    label: "USD 1 / mes",
  },
  DEFAULT: {
    priceId: "price_1TD7bOIiQJtaidhOG6KNvH5P",
    currency: "29.99 EUR",
    label: "EUR 29.99 / mes",
  },
};

/**
 * Resolve the right price config.
 *
 * Priority:
 *  1. explicitKey – from localStorage (set via ?pr= URL param, sent in POST body)
 *  2. countryCode – from Vercel x-vercel-ip-country header
 *  3. "DEFAULT" entry as final fallback
 */
export function getPriceForCountry(
  countryCode: string | null | undefined,
  explicitKey?: string | null
): PriceConfig {
  // 1. Explicit key from client (localStorage → sent in POST body)
  if (explicitKey && PRICES_BY_COUNTRY[explicitKey.toUpperCase()]) {
    return PRICES_BY_COUNTRY[explicitKey.toUpperCase()];
  }
  // 2. Geo-based match
  if (countryCode && PRICES_BY_COUNTRY[countryCode.toUpperCase()]) {
    return PRICES_BY_COUNTRY[countryCode.toUpperCase()];
  }
  // 3. DEFAULT fallback
  return PRICES_BY_COUNTRY["DEFAULT"];
}
