import { NextRequest, NextResponse } from "next/server";
import { pauseTimer, resumeTimer, calculateRemainingSeconds } from "@/lib/timer/timerStore";
import { validateTimerAuth } from "@/lib/timer/timerAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action, secret } = body;

    if (!validateTimerAuth(req, secret)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid organizer PIN or secret." },
        { status: 401 }
      );
    }

    let updatedState;
    if (action === "resume") {
      updatedState = await resumeTimer();
    } else {
      updatedState = await pauseTimer();
    }

    const now = new Date();
    const remaining = calculateRemainingSeconds(updatedState, now);

    return NextResponse.json({
      success: true,
      timer: updatedState,
      serverTime: now.toISOString(),
      remainingSeconds: remaining,
      message: action === "resume" ? "Timer resumed." : "Timer paused.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to pause/resume timer" },
      { status: 400 }
    );
  }
}
