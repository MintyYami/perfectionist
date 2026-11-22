import { useRef, useState } from 'react'
import type { ChallengeProps } from '../types.ts'
import './TimerChallenge.css'

/** Tenths of a second on the full scale (5s). Values are in tenths of a second. */
export const MAX_TENTHS = 50

// SVG coordinate system for the revealed timeline: 0s on the left, 5s on the right.
const BAR = { x: 4, y: 8, width: 392, height: 24 }
const WIDTH = BAR.x * 2 + BAR.width
const HEIGHT = BAR.y * 2 + BAR.height

/** x coordinate on the timeline for `tenths` of a second. */
function xAt(tenths: number) {
  return BAR.x + (Math.min(tenths, MAX_TENTHS) / MAX_TENTHS) * BAR.width
}

function TimerChallenge({ value, onChange, revealedTarget }: ChallengeProps) {
  // performance.now() when the timer started, or null while stopped.
  const startedAt = useRef<number | null>(null)
  const [running, setRunning] = useState(false)
  const [stoppedOnce, setStoppedOnce] = useState(false)

  function toggle() {
    if (startedAt.current === null) {
      startedAt.current = performance.now()
      setRunning(true)
    } else {
      onChange(Math.round((performance.now() - startedAt.current) / 100))
      startedAt.current = null
      setRunning(false)
      setStoppedOnce(true)
    }
  }

  // The elapsed time stays hidden until the result is revealed.
  if (revealedTarget === null) {
    return (
      <button type="button" className="timer__button" onClick={toggle}>
        {running ? 'Stop' : stoppedOnce ? 'Restart' : 'Start'}
      </button>
    )
  }

  return (
    <div className="timer">
      <svg className="timer__svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Timeline">
        <rect className="timer__track" {...BAR} />
        <rect className="guess-fill" x={BAR.x} y={BAR.y} width={xAt(value) - BAR.x} height={BAR.height} />
        <line
          className="target-line"
          x1={xAt(revealedTarget)}
          y1={0}
          x2={xAt(revealedTarget)}
          y2={HEIGHT}
        />
      </svg>
      <p className="timer__scale">
        <span>0s</span>
        <span>{MAX_TENTHS / 10}s</span>
      </p>
    </div>
  )
}

export default TimerChallenge
