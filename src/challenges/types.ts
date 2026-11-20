import type { ComponentType } from 'react'

/** Props every challenge component receives. Values are whole numbers in the challenge's unit. */
export interface ChallengeProps {
  /** The player's current guess. */
  value: number
  onChange: (value: number) => void
  /**
   * null while the player is guessing. After Submit it holds the target: the
   * challenge should stop accepting input and draw the target next to the guess
   * (using the guess-line / guess-fill / target-line CSS classes in index.css).
   */
  revealedTarget: number | null
}

/**
 * One type of challenge. To add a challenge: create a folder in src/challenges/,
 * export one of these from its index.ts, and list it in registry.ts.
 */
export interface ChallengeDefinition {
  /** Inclusive range for the random whole-number target. */
  targetRange: { min: number; max: number }
  /** The whole scale (e.g. 360°, 2500L), used for the "Off by" percentage. */
  fullScale: number
  /** How far the guess is from the target. Defaults to the plain numeric difference. */
  offBy?: (guess: number, target: number) => number
  /** Instruction shown above the challenge, e.g. "Drag to make an angle of 137°". */
  instruction: (target: number) => string
  /** Formats a value in this challenge's unit, e.g. 137 → "137°". */
  formatValue: (value: number) => string
  Component: ComponentType<ChallengeProps>
}
