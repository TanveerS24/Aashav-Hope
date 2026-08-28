import { NextRequest } from "next/server";

const DEFAULT_SECRET = "aashav2026";

export function getTimerSecret(): string {
  return process.env.TIMER_CONTROL_SECRET || DEFAULT_SECRET;
}

export function validateTimerAuth(req: NextRequest, bodySecret?: string): boolean {
  const configuredSecret = getTimerSecret();

  // 1. Check custom header x-timer-secret
  const headerSecret = req.headers.get("x-timer-secret");
  if (headerSecret && headerSecret === configuredSecret) {
    return true;
  }

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token === configuredSecret) {
      return true;
    }
  }

  // 3. Check secret in body if supplied
  if (bodySecret && bodySecret === configuredSecret) {
    return true;
  }

  return false;
}
