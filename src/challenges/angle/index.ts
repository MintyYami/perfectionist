import type { ChallengeDefinition } from '../types.ts'
import AngleChallenge from './AngleChallenge.tsx'

const formatDegrees = (degrees: number) => `${degrees}°`

/** Full circle (360°), measured clockwise from 12 o'clock. */
export const angleChallenge: ChallengeDefinition = {
  targetRange: { min: 1, max: 359 },
  instruction: (target) => `Drag to make an angle of ${formatDegrees(target)}`,
  formatValue: formatDegrees,
  Component: AngleChallenge,
}
