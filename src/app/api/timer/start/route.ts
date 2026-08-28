import { NextRequest, NextResponse } from "next/server";
import { startTimer } from "@/lib/timer/timerStore";
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

    if (typeof durationSeconds !== "number" || isNaN(durationSeconds) || durationSeconds <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid duration. Please provide a positive duration in seconds." },
        { status: 400 }
      );
    }

    const updatedState = await startTimer(durationSeconds);
    const now = new Date();

    return NextResponse.json({
      success: true,
      timer: updatedState,
      serverTime: now.toISOString(),
      remainingSeconds: durationSeconds,
      message: "Timer started successfully.",
    });
  } catch (error: any) {
    const message = error?.message || "Failed to start timer";
    const status = message === "TIMER ALREADY RUNNING" ? 409 : 400;
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}
