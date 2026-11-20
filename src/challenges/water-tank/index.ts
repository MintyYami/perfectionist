import type { ChallengeDefinition } from '../types.ts'
import WaterTankChallenge, { TANK_CAPACITY } from './WaterTankChallenge.tsx'

const formatLitres = (litres: number) => `${litres}L`

/** Fill a 2500L tank by dragging the water line up and down. */
export const waterTankChallenge: ChallengeDefinition = {
  targetRange: { min: 1, max: TANK_CAPACITY - 1 },
  fullScale: TANK_CAPACITY,
  instruction: (target) => `Fill the tank with ${formatLitres(target)} of water`,
  formatValue: formatLitres,
  Component: WaterTankChallenge,
}
