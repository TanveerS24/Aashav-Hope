import { NextRequest, NextResponse } from "next/server";
import { resetTimer } from "@/lib/timer/timerStore";
import { validateTimerAuth } from "@/lib/timer/timerAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { durationSeconds, secret } = body;

    if (!validateTimerAuth(req, secret)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid organizer PIN or secret." },
        { status: 401 }
      );
    }

    const updatedState = await resetTimer(typeof durationSeconds === "number" ? durationSeconds : undefined);
    const now = new Date();

    return NextResponse.json({
      success: true,
      timer: updatedState,
      serverTime: now.toISOString(),
      remainingSeconds: updatedState.durationSeconds,
      message: "Timer reset successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to reset timer" },
      { status: 400 }
    );
  }
}
