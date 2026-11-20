import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import './ResultPopup.css'

interface ResultPopupProps {
  /** Formatted values, e.g. "128°". */
  guess: string
  target: string
  /** e.g. "9° (2.5%)". */
  offBy: string
  /** Burst confetti out of the pop-up when it appears (exact guess). */
  celebrate: boolean
  onAgain: () => void
}

function ResultPopup({ guess, target, offBy, celebrate, onAgain }: ResultPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!celebrate || !popupRef.current) return
    // The origin is a 0–1 fraction of the viewport: the pop-up's centre.
    const { left, top, width, height } = popupRef.current.getBoundingClientRect()
    void confetti({
      particleCount: 150,
      spread: 360,
      startVelocity: 35,
      origin: { x: (left + width / 2) / innerWidth, y: (top + height / 2) / innerHeight },
    })
  }, [celebrate])

  return (
    <div ref={popupRef} className="result-popup" role="dialog" aria-labelledby="result-popup-title">
      <h2 id="result-popup-title" className="result-popup__title">
        Result
      </h2>
      <dl className="result-popup__values">
        <div className="result-popup__value result-popup__value--guess">
          <dt>Your guess</dt>
          <dd>{guess}</dd>
        </div>
        <div className="result-popup__value result-popup__value--target">
          <dt>Target</dt>
          <dd>{target}</dd>
        </div>
      </dl>
      <p className="result-popup__off-by">
        Off by <strong>{offBy}</strong>
      </p>
      <button type="button" className="button" onClick={onAgain} autoFocus>
        Again
      </button>
    </div>
  )
}

export default ResultPopup
