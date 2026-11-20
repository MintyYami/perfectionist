import { useGame } from '../game/useGame.ts'
import ResultPopup from './ResultPopup.tsx'
import './GameArea.css'

function GameArea() {
  const { challenge, target, guess, phase, setGuess, submit, playAgain } = useGame()
  const { Component } = challenge
  const showingResult = phase === 'result'
  const offBy = challenge.offBy?.(guess, target) ?? Math.abs(guess - target)
  const offByPercent = ((offBy / challenge.fullScale) * 100).toFixed(1)

  return (
    <main className="game-area">
      <p className="game-area__instruction">{challenge.instruction(target)}</p>

      <div className="game-area__challenge">
        <Component
          value={guess}
          onChange={setGuess}
          revealedTarget={showingResult ? target : null}
        />
      </div>

      {showingResult ? (
        <ResultPopup
          guess={challenge.formatValue(guess)}
          target={challenge.formatValue(target)}
          offBy={`${challenge.formatValue(offBy)} (${offByPercent}%)`}
          onAgain={playAgain}
        />
      ) : (
        <button type="button" className="button" onClick={submit}>
          Submit
        </button>
      )}
    </main>
  )
}

export default GameArea
