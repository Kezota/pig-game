import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [winnerPlayer, setWinnerPlayer] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Current, setPlayer1Current] = useState(0);
  const [player2Current, setPlayer2Current] = useState(0);
  const [dice, setDice] = useState(0);
  const winScore = 20;

  useEffect(function () {
    document.title = "Pig Game";
  }, []);

  function handleRollDice() {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);

    if (currentPlayer === 1) setPlayer1Current(player1Current + roll);
    else setPlayer2Current(player2Current + roll);

    if (roll === 1) changePlayer();
  }

  function handleHold() {
    if (currentPlayer === 1) setPlayer1Score(player1Current + player1Score);
    else setPlayer2Score(player2Current + player2Score);

    checkWinner();
    if (!winnerPlayer) changePlayer();
  }

  function changePlayer() {
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
      setPlayer1Current(0);
    } else {
      setCurrentPlayer(1);
      setPlayer2Current(0);
    }
  }

  function checkWinner() {
    if (currentPlayer === 1 && player1Score + player1Current >= winScore)
      setWinnerPlayer(1);
    else if (currentPlayer === 2 && player2Score + player2Current >= winScore)
      setWinnerPlayer(2);
  }

  function handleReset() {
    setCurrentPlayer(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Current(0);
    setPlayer2Current(0);
    setDice(0);
    setWinnerPlayer(0);
  }

  return (
    <main>
      <Player
        playerNum={1}
        playerScore={player1Score}
        playerCurrent={player1Current}
        currentPlayer={currentPlayer}
        winnerPlayer={winnerPlayer}
      />
      <Player
        playerNum={2}
        playerScore={player2Score}
        playerCurrent={player2Current}
        currentPlayer={currentPlayer}
        winnerPlayer={winnerPlayer}
      />

      <DiceImage imgSrcNum={dice} />
      <Button addClass="new" onClick={handleReset}>
        🔄 New game
      </Button>
      <Button addClass="roll" onClick={handleRollDice} won={winnerPlayer}>
        🎲 Roll dice
      </Button>
      <Button addClass="hold" onClick={handleHold} won={winnerPlayer}>
        📥 Hold
      </Button>
    </main>
  );
}

function Player({
  playerNum,
  playerScore,
  playerCurrent,
  currentPlayer,
  winnerPlayer,
}) {
  let isActive = false;
  let isWinner = false;

  if (currentPlayer === playerNum) isActive = true;
  if (winnerPlayer === playerNum) isWinner = true;

  return (
    <section
      className={`player player--${playerNum} ${
        isActive ? "player--active" : ""
      } ${isWinner ? "player--winner" : ""}`}
    >
      <h2 className="name" id="name">
        Player {playerNum}
      </h2>
      <p className="score" id="score">
        {playerScore}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id="current">
          {playerCurrent}
        </p>
      </div>
    </section>
  );
}

function DiceImage({ imgSrcNum }) {
  return (
    <div>
      {imgSrcNum && (
        <img
          src={require(`./image/dice-${imgSrcNum}.png`)}
          alt="Playing dice"
          className="dice"
        />
      )}
    </div>
  );
}

function Button({ children, addClass, onClick, won }) {
  if (won) onClick = null;

  return (
    <button className={`btn btn--${addClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
