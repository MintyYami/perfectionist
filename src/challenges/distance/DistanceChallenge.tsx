import { dragHandlers, pointerInViewBox, toScale } from '../drag.ts'
import type { ChallengeProps } from '../types.ts'
import './DistanceChallenge.css'

/** Metres along the whole road. */
export const ROAD_LENGTH = 300

// SVG coordinate system: poles standing on a horizontal road. The distance is
// measured between the poles' facing edges: the fixed pole stands just before
// the road start, the dragged pole just after its position, so at 0m they touch
// side by side. The side margins leave room for a pole beyond either road end.
const POLE = { width: 10, height: 70 }
const ROAD = { x: POLE.width, y: 86, width: 480, height: 16 }
const WIDTH = ROAD.x * 2 + ROAD.width
const HEIGHT = ROAD.y + ROAD.height
const POLE_TOP = ROAD.y - POLE.height

/** x coordinate on the road for `metres` from the start. */
function xAt(metres: number) {
  return ROAD.x + (metres / ROAD_LENGTH) * ROAD.width
}

function DistanceChallenge({ value, onChange, revealedTarget }: ChallengeProps) {
  const interactive = revealedTarget === null

  return (
    <div className="distance">
      <svg
        className={interactive ? 'distance__svg draggable' : 'distance__svg'}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Road with two poles"
        {...dragHandlers(interactive, (event) => {
          const { x } = pointerInViewBox(event, WIDTH, HEIGHT)
          onChange(toScale(x - ROAD.x, ROAD.width, ROAD_LENGTH))
        })}
      >
        <rect className="distance__road" {...ROAD} />
        <rect className="distance__pole" x={0} y={POLE_TOP} {...POLE} />
        {revealedTarget !== null && (
          <line
            className="target-line"
            x1={xAt(revealedTarget)}
            y1={POLE_TOP}
            x2={xAt(revealedTarget)}
            y2={HEIGHT}
          />
        )}
        <rect
          className="guess-fill"
          x={xAt(value)}
          y={POLE_TOP}
          {...POLE}
        />
      </svg>

      <p className="distance__length">Road Length: {ROAD_LENGTH}m</p>
    </div>
  )
}

export default DistanceChallenge
