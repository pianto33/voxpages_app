"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "sv_price_key";

/**
 * Invisible component. Place in the root layout.
 * If the URL contains ?pr=xxx, saves it to localStorage for later use during checkout.
 * Example: summaryvox.com?pr=test  or  summaryvox.com/es?pr=es
 */
export function PriceKeyCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pr = searchParams.get("pr");
    if (pr) {
      localStorage.setItem(STORAGE_KEY, pr.toUpperCase());
    }
  }, [searchParams]);

  return null;
}

/** Read the stored price key (call from checkout components) */
export function getStoredPriceKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}
