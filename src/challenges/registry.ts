import { angleChallenge } from './angle/index.ts'
import type { ChallengeDefinition } from './types.ts'

/**
 * Every challenge that can appear in the game. To add a challenge, import its
 * definition and list it here. The type requires at least one entry.
 */
export const challenges: readonly [ChallengeDefinition, ...ChallengeDefinition[]] = [
  angleChallenge,
]
