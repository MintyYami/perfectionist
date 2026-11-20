import type { ChallengeDefinition } from '../types.ts'
import AngleChallenge from './AngleChallenge.tsx'

const FULL_CIRCLE = 360

const formatDegrees = (degrees: number) => `${degrees}°`

/** Full circle (360°), measured clockwise from 12 o'clock. */
export const angleChallenge: ChallengeDefinition = {
  targetRange: { min: 1, max: FULL_CIRCLE - 1 },
  fullScale: FULL_CIRCLE,
  // Shortest way round the dial, e.g. 2° vs 359° is 3° apart.
  offBy: (guess, target) => {
    const difference = Math.abs(guess - target) % FULL_CIRCLE
    return Math.min(difference, FULL_CIRCLE - difference)
  },
  instruction: (target) => `Drag to make an angle of ${formatDegrees(target)}`,
  formatValue: formatDegrees,
  Component: AngleChallenge,
}
