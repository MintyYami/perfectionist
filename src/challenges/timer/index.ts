import type { ChallengeDefinition } from '../types.ts'
import TimerChallenge, { MAX_TENTHS } from './TimerChallenge.tsx'

const formatSeconds = (tenths: number) => `${(tenths / 10).toFixed(1)}s`

/** Click to start a timer and again to stop it at a whole-second target (1–5s). */
export const timerChallenge: ChallengeDefinition = {
  targetRange: { min: 10, max: MAX_TENTHS, step: 10 },
  fullScale: MAX_TENTHS,
  instruction: (target) => `Start the timer, then stop it at ${target / 10} seconds`,
  formatValue: formatSeconds,
  Component: TimerChallenge,
}
