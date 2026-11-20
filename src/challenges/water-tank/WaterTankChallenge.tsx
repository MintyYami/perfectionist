import { useId } from 'react'
import { dragHandlers, pointerInViewBox } from '../drag.ts'
import type { ChallengeProps } from '../types.ts'
import './WaterTankChallenge.css'

/** Litres in a full tank. */
export const TANK_CAPACITY = 2500

// SVG coordinate system: the tank with a small margin so its outline isn't clipped.
const TANK = { x: 4, y: 4, width: 160, height: 240, rx: 12 }
const TANK_BOTTOM = TANK.y + TANK.height
const WIDTH = TANK.x * 2 + TANK.width
const HEIGHT = TANK.y * 2 + TANK.height

/** y coordinate of the water surface for `litres`. */
function levelAt(litres: number) {
  return TANK_BOTTOM - (litres / TANK_CAPACITY) * TANK.height
}

/** Horizontal line across the tank at `litres`. */
function Level({ className, litres }: { className: string; litres: number }) {
  const y = levelAt(litres)
  return <line className={className} x1={TANK.x} y1={y} x2={TANK.x + TANK.width} y2={y} />
}

function WaterTankChallenge({ value, onChange, revealedTarget }: ChallengeProps) {
  const interactive = revealedTarget === null
  const clipId = useId()
  const surface = levelAt(value)

  return (
    <div className="tank">
      <svg
        className={interactive ? 'tank__svg draggable' : 'tank__svg'}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Water tank"
        {...dragHandlers(interactive, (event) => {
          // Whole litres at the pointer's height, clamped to the tank.
          const { y } = pointerInViewBox(event, WIDTH, HEIGHT)
          const fraction = Math.min(1, Math.max(0, (TANK_BOTTOM - y) / TANK.height))
          onChange(Math.round(fraction * TANK_CAPACITY))
        })}
      >
        <defs>
          <clipPath id={clipId}>
            <rect {...TANK} />
          </clipPath>
        </defs>

        <rect className="tank__body" {...TANK} />
        <rect
          className="tank__water"
          x={TANK.x}
          y={surface}
          width={TANK.width}
          height={TANK_BOTTOM - surface}
          clipPath={`url(#${clipId})`}
        />
        {revealedTarget !== null && <Level className="target-line" litres={revealedTarget} />}
        <Level className="guess-line" litres={value} />
        <rect className="tank__outline" {...TANK} />
      </svg>

      <p className="tank__capacity">Water tank capacity: {TANK_CAPACITY}L</p>
    </div>
  )
}

export default WaterTankChallenge
