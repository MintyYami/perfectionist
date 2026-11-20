import type { PointerEvent } from 'react'
import type { ChallengeProps } from '../types.ts'
import './AngleChallenge.css'

// SVG coordinate system: a SIZE × SIZE square with the dial centred in it.
const SIZE = 300
const CENTER = SIZE / 2
const RADIUS = 120

/** Point on the dial at `degrees`, measured clockwise from 12 o'clock. */
function pointAt(degrees: number) {
  const radians = (degrees * Math.PI) / 180
  return {
    x: CENTER + RADIUS * Math.sin(radians),
    y: CENTER - RADIUS * Math.cos(radians),
  }
}

/** Filled pie slice from 12 o'clock clockwise to `degrees` (0–359). */
function sectorPath(degrees: number) {
  if (degrees === 0) return ''
  const start = pointAt(0)
  const end = pointAt(degrees)
  const largeArc = degrees > 180 ? 1 : 0
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
}

/** Line from the dial centre to its edge at `degrees`. */
function Arm({ className, degrees }: { className: string; degrees: number }) {
  const end = pointAt(degrees)
  return <line className={className} x1={CENTER} y1={CENTER} x2={end.x} y2={end.y} />
}

/** Whole-degree angle (0–359) of the pointer relative to the dial centre. */
function angleFromPointer(event: PointerEvent<SVGSVGElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * SIZE - CENTER
  const y = ((event.clientY - rect.top) / rect.height) * SIZE - CENTER
  const degrees = (Math.atan2(x, -y) * 180) / Math.PI
  return Math.round(degrees + 360) % 360
}

function AngleChallenge({ value, onChange, revealedTarget }: ChallengeProps) {
  const interactive = revealedTarget === null

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive) return
    event.currentTarget.setPointerCapture(event.pointerId)
    onChange(angleFromPointer(event))
  }

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!interactive || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    onChange(angleFromPointer(event))
  }

  const guess = pointAt(value)

  return (
    <svg
      className={interactive ? 'angle angle--interactive' : 'angle'}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Angle dial"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <circle className="angle__dial" cx={CENTER} cy={CENTER} r={RADIUS} />
      <path className="angle__sector" d={sectorPath(value)} />
      <Arm className="angle__baseline" degrees={0} />
      {revealedTarget !== null && <Arm className="angle__target-arm" degrees={revealedTarget} />}
      <Arm className="angle__guess-arm" degrees={value} />
      <circle className="angle__handle" cx={guess.x} cy={guess.y} r={10} />
      <circle className="angle__pivot" cx={CENTER} cy={CENTER} r={5} />
    </svg>
  )
}

export default AngleChallenge
