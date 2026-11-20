import type { ChallengeDefinition } from '../types.ts'
import DistanceChallenge, { ROAD_LENGTH } from './DistanceChallenge.tsx'

const formatMetres = (metres: number) => `${metres}m`

/** Drag the second pole along a 300m road to set the distance between the poles. */
export const distanceChallenge: ChallengeDefinition = {
  targetRange: { min: 1, max: ROAD_LENGTH - 1 },
  fullScale: ROAD_LENGTH,
  instruction: (target) => `Drag the pole so the poles are ${formatMetres(target)} apart`,
  formatValue: formatMetres,
  Component: DistanceChallenge,
}
