import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const EMAIL_LINK_TTL = "7d";

function getWebhookSecret(): string {
  const secret =
    process.env.AUTO_LOGIN_JWT_SECRET || process.env.JWT_LANDING_SECRET;
  if (!secret) {
    throw new Error(
      "AUTO_LOGIN_JWT_SECRET or JWT_LANDING_SECRET must be configured"
    );
  }
  return secret;
}

function getSecretKey() {
  return new TextEncoder().encode(getWebhookSecret());
}

export function validateWebhookApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key");
  const secret =
    process.env.AUTO_LOGIN_JWT_SECRET || process.env.JWT_LANDING_SECRET;
  return !!secret && apiKey === secret;
}

export async function signAutoLoginToken(payload: {
  email: string;
  customerId?: string;
  name?: string;
}): Promise<string> {
  const email = payload.email.trim().toLowerCase();

  return new SignJWT({
    email,
    ...(payload.customerId ? { customerId: payload.customerId } : {}),
    ...(payload.name ? { name: payload.name } : {}),
    purpose: "auto-login",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EMAIL_LINK_TTL)
    .sign(getSecretKey());
}

export async function signUnsubscribeToken(payload: {
  email: string;
  customerId: string;
}): Promise<string> {
  const email = payload.email.trim().toLowerCase();

  return new SignJWT({
    email,
    customerId: payload.customerId,
    purpose: "unsubscribe",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EMAIL_LINK_TTL)
    .sign(getSecretKey());
}

export async function verifyAutoLoginToken(token: string): Promise<{
  email: string;
  customerId?: string;
  name?: string;
}> {
  const { payload } = await jwtVerify(token, getSecretKey());

  if (payload.purpose !== "auto-login") {
    throw new Error("Invalid token purpose");
  }

  if (!payload.email || typeof payload.email !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    email: payload.email.trim().toLowerCase(),
    customerId:
      typeof payload.customerId === "string" ? payload.customerId : undefined,
    name: typeof payload.name === "string" ? payload.name : undefined,
  };
}

export async function verifyUnsubscribeToken(token: string): Promise<{
  email: string;
  customerId: string;
}> {
  const { payload } = await jwtVerify(token, getSecretKey());

  if (payload.purpose !== "unsubscribe") {
    throw new Error("Invalid token purpose");
  }

  if (!payload.email || typeof payload.email !== "string") {
    throw new Error("Invalid token payload");
  }

  if (!payload.customerId || typeof payload.customerId !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    email: payload.email.trim().toLowerCase(),
    customerId: payload.customerId,
  };
}

export function resolveCallbackPath(callbackUrl: string | undefined, locale: string): string {
  const rawPath = (callbackUrl || "/home").split("?")[0] || "/home";

  if (rawPath === "/dashboard" || rawPath === "/home") {
    return `/${locale}/home`;
  }

  if (rawPath === "/pricing") {
    return `/${locale}/subscribe`;
  }

  if (rawPath.startsWith(`/${locale}/`)) {
    return rawPath;
  }

  if (rawPath.startsWith("/")) {
    return `/${locale}${rawPath}`;
  }

  return `/${locale}/${rawPath}`;
}
