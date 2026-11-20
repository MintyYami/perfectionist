import { angleChallenge } from './angle/index.ts'
import { distanceChallenge } from './distance/index.ts'
import type { ChallengeDefinition } from './types.ts'
import { waterTankChallenge } from './water-tank/index.ts'

/**
 * Every challenge that can appear in the game. To add a challenge, import its
 * definition and list it here. The type requires at least one entry.
 */
export const challenges: readonly [ChallengeDefinition, ...ChallengeDefinition[]] = [
  angleChallenge,
  waterTankChallenge,
  distanceChallenge,
]
