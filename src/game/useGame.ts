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

/** Random challenge, never the same type as `previous` (unless it's the only one). */
function pickChallenge(previous?: ChallengeDefinition) {
  const others = challenges.filter((challenge) => challenge !== previous)
  return others.length > 0 ? randomItem(others) : challenges[0]
}

function newRound(previous?: ChallengeDefinition): Round {
  const challenge = pickChallenge(previous)
  const { min, max } = challenge.targetRange
  // Every challenge's control starts at 0.
  return { challenge, target: randomInt(min, max), guess: 0, phase: 'playing' }
}

/** Game flow: random challenge → adjust guess → submit → result → again. */
export function useGame() {
  const [round, setRound] = useState(() => newRound())

  return {
    ...round,
    setGuess: (guess: number) =>
      setRound((current) => (current.phase === 'playing' ? { ...current, guess } : current)),
    submit: () => setRound((current) => ({ ...current, phase: 'result' })),
    playAgain: () => setRound((current) => newRound(current.challenge)),
  }
}
