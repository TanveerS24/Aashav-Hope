import { NextRequest, NextResponse } from "next/server";
import { endTimer } from "@/lib/timer/timerStore";
import { validateTimerAuth } from "@/lib/timer/timerAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { secret } = body;

    if (!validateTimerAuth(req, secret)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid organizer PIN or secret." },
        { status: 401 }
      );
    }

    const updatedState = await endTimer();
    const now = new Date();

    return NextResponse.json({
      success: true,
      timer: updatedState,
      serverTime: now.toISOString(),
      remainingSeconds: 0,
      message: "Timer ended. Hackathon concluded.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to end timer" },
      { status: 400 }
    );
  }
}
