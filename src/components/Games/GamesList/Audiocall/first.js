import React, {useState, useEffect} from 'react';
import Answer from "./Answer/Answer";
import styles from "./Audiocall.module.scss";

const a = 'первый';
const b = 'второй';
const c = 'третий';
const d = 'четвёртый';
const e = 'ПРАВИЛЬНОЕ';

const correct = 'ПРАВИЛЬНОЕ';

export default function Audiocall() {

  const [answers, setAnswers] = useState([]);
  const [gameStatus, setGameStatus] = useState(true);

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    setAnswers((answers) => [a, b, c, d, e].sort(() => 0.5 - Math.random()));
    setGameStatus(() => true)
  }

  function chooseCorrect(event) {
    if (correct === event.target.innerText) {
      endGame()
    }
  }

  function endGame() {
    console.log('WIN');
    setGameStatus(() => false)
  }

  return (
    <section>

      <div>
        {gameStatus ? 'no descr' : 'IMG'}
      </div>

      <span>Sound</span>

      <div className={styles.answers}>
        {answers.map((word, index) => (
          <Answer
            key={index}
            word={word}
            chooseCorrect={chooseCorrect}
          />
        ))}
      </div>

      <button onClick={startGame}>
        {gameStatus ? 'skip :(' : 'next'}
      </button>

    </section>
  )
};
