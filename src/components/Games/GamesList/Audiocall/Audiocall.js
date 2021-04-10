import React, {useState, useEffect} from 'react';
import Answer from "./Answer/Answer";
import styles from "./Audiocall.module.scss";
import Info from "./Info/Info";
// import {useGameData} from "../../../../hooks/gameDataHook";
// import {useSelector} from "react-redux";

const a = 'первый';
const b = 'второй';
const c = 'третий';
const d = 'четвёртый';
const e = 'ПРАВИЛЬНОЕ';

const correct = 'ПРАВИЛЬНОЕ';

export default function Audiocall() {

  const [answers, setAnswers] = useState([]);
  const [wordComplete, setWordComplete] = useState(true);

/*  const {goodCount, badCount} = useGameData();
  const words = useSelector(state => state.words.items);//!!!слова берем из уже имеющихся в сторе,
  const userId = useSelector(state => state.auth.userId);*/

  useEffect(() => {
    startGame();
  }, []);

  function startGame() {
    setAnswers((answers) => [a, b, c, d, e].sort(() => 0.5 - Math.random()));
    setWordComplete(() => true)
  }

  function chooseCorrect(event) {
    if (correct === event.target.innerText) {
      endGame()
    }
  }

  function soundOn() {
    console.log('soundOn')
  }

  function endGame() {
    console.log('WIN');
    setWordComplete(() => false)
  }

  return (
    <section>

      <div>
        {wordComplete ? <Info soundOn={soundOn} /> : <Info soundOn={soundOn} correct={correct} />}
      </div>

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
        {wordComplete ? 'Сдаться :(' : 'Дальше'}
      </button>

    </section>
  )
};
