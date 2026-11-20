import { useGame } from '../game/useGame.ts'
import ResultPopup from './ResultPopup.tsx'
import './GameArea.css'

function GameArea() {
  const { challenge, target, guess, offBy, offByPercent, phase, setGuess, submit, playAgain } =
    useGame()
  const { Component } = challenge
  const showingResult = phase === 'result'

  return (
    <div className="game">
      <main className="game-area">
        <p className="game-area__instruction">{challenge.instruction(target)}</p>

        <div className="game-area__challenge">
          <Component
            value={guess}
            onChange={setGuess}
            revealedTarget={showingResult ? target : null}
          />
        </div>

        <button type="button" className="button" onClick={submit} disabled={showingResult}>
          Submit
        </button>
      </main>

      {showingResult && (
        <ResultPopup
          guess={challenge.formatValue(guess)}
          target={challenge.formatValue(target)}
          offBy={`${challenge.formatValue(offBy)} (${offByPercent.toFixed(1)}%)`}
          celebrate={offBy === 0}
          onAgain={playAgain}
        />
      )}
    </div>
  )
}

export default GameArea
