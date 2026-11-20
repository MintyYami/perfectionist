import './ResultPopup.css'

interface ResultPopupProps {
  /** Formatted values, e.g. "128°". */
  guess: string
  target: string
  onAgain: () => void
}

function ResultPopup({ guess, target, onAgain }: ResultPopupProps) {
  return (
    <div className="result-popup" role="dialog" aria-labelledby="result-popup-title">
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
      <button type="button" className="button" onClick={onAgain} autoFocus>
        Again
      </button>
    </div>
  )
}

export default ResultPopup
