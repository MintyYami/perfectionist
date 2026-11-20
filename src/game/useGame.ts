import { useState } from 'react'
import { challenges } from '../challenges/registry.ts'
import type { ChallengeDefinition } from '../challenges/types.ts'
import { randomInt, randomItem } from './random.ts'

interface Round {
  challenge: ChallengeDefinition
  target: number
  guess: number
  /** 'playing': adjusting the guess. 'result': the pop-up is showing. */
  phase: 'playing' | 'result'
}

function newRound(): Round {
  const challenge = randomItem(challenges)
  const { min, max } = challenge.targetRange
  // Every challenge's control starts at 0.
  return { challenge, target: randomInt(min, max), guess: 0, phase: 'playing' }
}

/** Game flow: random challenge → adjust guess → submit → result → again. */
export function useGame() {
  const [round, setRound] = useState(newRound)

  return {
    ...round,
    setGuess: (guess: number) =>
      setRound((current) => (current.phase === 'playing' ? { ...current, guess } : current)),
    submit: () => setRound((current) => ({ ...current, phase: 'result' })),
    playAgain: () => setRound(newRound()),
  }
}
