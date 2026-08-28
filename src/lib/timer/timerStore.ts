import fs from "fs";
import path from "path";
import { TimerState, TimerStatus } from "@/types/timer";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb";

const TIMER_ID = "hackathon-2026";
const DEFAULT_DURATION = 18000; // 5 hours in seconds
const COLLECTION_NAME = "timer_state";

// In-memory state cache
let memoryTimerState: TimerState = {
  id: TIMER_ID,
  status: "NOT_STARTED",
  durationSeconds: DEFAULT_DURATION,
  startedAt: null,
  endsAt: null,
  pausedAt: null,
  remainingSecondsOnPause: null,
  updatedAt: new Date().toISOString(),
};

function getDataFilePath(): string {
  return path.join(process.cwd(), "data", "timer-state.json");
}

function loadLocalFileState(): TimerState {
  try {
    const filePath = getDataFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && parsed.id === TIMER_ID) {
        memoryTimerState = parsed;
        return memoryTimerState;
      }
    }
  } catch (error) {
    console.warn("Could not read timer state from disk:", error);
  }
  return memoryTimerState;
}

function persistLocalFileState(state: TimerState): void {
  memoryTimerState = state;
  try {
    const filePath = getDataFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), "utf-8");
  } catch (error) {
    console.warn("Could not persist timer state to disk, state remains in memory:", error);
  }
}

async function fetchFromDb(): Promise<TimerState> {
  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb();
      if (db) {
        const doc = await db.collection<TimerState>(COLLECTION_NAME).findOne({ id: TIMER_ID });
        if (doc) {
          const { _id, ...cleanState } = doc as any;
          memoryTimerState = cleanState as TimerState;
          return memoryTimerState;
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed, falling back to local storage:", err);
    }
  }
  return loadLocalFileState();
}

async function saveToDb(state: TimerState): Promise<void> {
  memoryTimerState = state;
  persistLocalFileState(state);

  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb();
      if (db) {
        await db.collection(COLLECTION_NAME).updateOne(
          { id: TIMER_ID },
          { $set: state },
          { upsert: true }
        );
      }
    } catch (err) {
      console.warn("MongoDB write failed, state saved locally:", err);
    }
  }
}

// Calculate remaining seconds cleanly from endsAt or pause state
export function calculateRemainingSeconds(state: TimerState, serverTime: Date = new Date()): number {
  if (state.status === "NOT_STARTED") {
    return state.durationSeconds;
  }

  if (state.status === "FINISHED") {
    return 0;
  }

  if (state.status === "PAUSED") {
    return state.remainingSecondsOnPause ?? 0;
  }

  if (state.status === "RUNNING") {
    if (!state.endsAt) return 0;
    const endsMs = new Date(state.endsAt).getTime();
    const nowMs = serverTime.getTime();
    const diffSeconds = Math.ceil((endsMs - nowMs) / 1000);
    return Math.max(0, diffSeconds);
  }

  return 0;
}

export async function getTimerState(): Promise<{ state: TimerState; serverTime: string; remainingSeconds: number }> {
  const currentState = await fetchFromDb();
  const now = new Date();

  // If status is RUNNING but endsAt is in the past, transition to FINISHED
  if (currentState.status === "RUNNING" && currentState.endsAt) {
    const endsMs = new Date(currentState.endsAt).getTime();
    if (now.getTime() >= endsMs) {
      const finishedState: TimerState = {
        ...currentState,
        status: "FINISHED",
        remainingSecondsOnPause: 0,
        updatedAt: now.toISOString(),
      };
      await saveToDb(finishedState);
      return {
        state: finishedState,
        serverTime: now.toISOString(),
        remainingSeconds: 0,
      };
    }
  }

  const remaining = calculateRemainingSeconds(currentState, now);

  return {
    state: currentState,
    serverTime: now.toISOString(),
    remainingSeconds: remaining,
  };
}

export async function setTimerDuration(durationSeconds: number): Promise<TimerState> {
  const currentState = await fetchFromDb();
  const now = new Date();

  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    throw new Error("Invalid duration. Duration must be greater than 0 seconds.");
  }

  if (durationSeconds > 864000) {
    throw new Error("Duration exceeds maximum allowable limit (10 days).");
  }

  // If running, we don't disrupt running countdown unless explicitly reset
  const newState: TimerState = {
    ...currentState,
    status: currentState.status === "RUNNING" ? currentState.status : "NOT_STARTED",
    durationSeconds,
    startedAt: currentState.status === "RUNNING" ? currentState.startedAt : null,
    endsAt: currentState.status === "RUNNING" ? currentState.endsAt : null,
    pausedAt: null,
    remainingSecondsOnPause: null,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}

export async function startTimer(durationSeconds?: number): Promise<TimerState> {
  const currentState = await fetchFromDb();
  const now = new Date();

  // Check duplicate start protection
  if (currentState.status === "RUNNING") {
    if (currentState.endsAt && new Date(currentState.endsAt).getTime() > now.getTime()) {
      throw new Error("TIMER ALREADY RUNNING");
    }
  }

  const effectiveDuration = durationSeconds && durationSeconds > 0
    ? durationSeconds
    : currentState.durationSeconds > 0
      ? currentState.durationSeconds
      : DEFAULT_DURATION;

  // Validate duration
  if (!Number.isFinite(effectiveDuration) || effectiveDuration <= 0) {
    throw new Error("Invalid duration. Duration must be greater than 0 seconds.");
  }

  if (effectiveDuration > 864000) {
    throw new Error("Duration exceeds maximum allowable limit (10 days).");
  }

  const startedAt = now.toISOString();
  const endsAt = new Date(now.getTime() + effectiveDuration * 1000).toISOString();

  const newState: TimerState = {
    id: TIMER_ID,
    status: "RUNNING",
    durationSeconds: effectiveDuration,
    startedAt,
    endsAt,
    pausedAt: null,
    remainingSecondsOnPause: null,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}

export async function pauseTimer(): Promise<TimerState> {
  const currentState = await fetchFromDb();
  const now = new Date();

  if (currentState.status !== "RUNNING") {
    throw new Error("Cannot pause: Timer is not running.");
  }

  const remaining = calculateRemainingSeconds(currentState, now);

  const newState: TimerState = {
    ...currentState,
    status: "PAUSED",
    pausedAt: now.toISOString(),
    remainingSecondsOnPause: remaining,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}

export async function resumeTimer(): Promise<TimerState> {
  const currentState = await fetchFromDb();
  const now = new Date();

  if (currentState.status !== "PAUSED") {
    throw new Error("Cannot resume: Timer is not paused.");
  }

  const remainingSeconds = currentState.remainingSecondsOnPause ?? currentState.durationSeconds;
  if (remainingSeconds <= 0) {
    const finishedState: TimerState = {
      ...currentState,
      status: "FINISHED",
      remainingSecondsOnPause: 0,
      updatedAt: now.toISOString(),
    };
    await saveToDb(finishedState);
    return finishedState;
  }

  const startedAt = now.toISOString();
  const endsAt = new Date(now.getTime() + remainingSeconds * 1000).toISOString();

  const newState: TimerState = {
    ...currentState,
    status: "RUNNING",
    durationSeconds: remainingSeconds,
    startedAt,
    endsAt,
    pausedAt: null,
    remainingSecondsOnPause: null,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}

export async function resetTimer(defaultDuration?: number): Promise<TimerState> {
  const now = new Date();
  const targetDuration = (defaultDuration && defaultDuration > 0) ? defaultDuration : DEFAULT_DURATION;

  const newState: TimerState = {
    id: TIMER_ID,
    status: "NOT_STARTED",
    durationSeconds: targetDuration,
    startedAt: null,
    endsAt: null,
    pausedAt: null,
    remainingSecondsOnPause: null,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}

export async function endTimer(): Promise<TimerState> {
  const currentState = await fetchFromDb();
  const now = new Date();

  const newState: TimerState = {
    ...currentState,
    status: "FINISHED",
    endsAt: now.toISOString(),
    pausedAt: null,
    remainingSecondsOnPause: 0,
    updatedAt: now.toISOString(),
  };

  await saveToDb(newState);
  return newState;
}
