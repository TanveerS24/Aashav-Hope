export type TimerStatus = 'NOT_STARTED' | 'RUNNING' | 'PAUSED' | 'FINISHED';

export interface TimerState {
  id: string;
  status: TimerStatus;
  durationSeconds: number;
  startedAt: string | null; // ISO timestamp
  endsAt: string | null; // ISO timestamp
  pausedAt: string | null; // ISO timestamp when paused
  remainingSecondsOnPause: number | null; // snapshot remaining when paused
  updatedAt: string; // ISO timestamp
}

export interface TimerApiResponse {
  success: boolean;
  timer: TimerState;
  serverTime: string; // ISO timestamp for client clock skew compensation
  remainingSeconds: number;
  message?: string;
}

export interface TimerStartPayload {
  durationSeconds: number;
}
