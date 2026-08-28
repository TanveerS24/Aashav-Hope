import { NextRequest, NextResponse } from "next/server";
import { validateTimerAuth } from "@/lib/timer/timerAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { secret } = body;

    const isValid = validateTimerAuth(req, secret);
    if (!isValid) {
      return NextResponse.json(
        { success: false, valid: false, message: "Invalid PIN / Secret." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: "Authentication successful.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, valid: false, message: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
