import { NextResponse } from "next/server";
import { getTimerState } from "@/lib/timer/timerStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const { state, serverTime, remainingSeconds } = await getTimerState();
    return NextResponse.json({
      success: true,
      timer: state,
      serverTime,
      remainingSeconds,
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch timer state",
      },
      { status: 500 }
    );
  }
}
