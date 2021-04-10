import React, {useState, useEffect, useRef} from 'react';
import styles from "./Audiocall.module.scss";
// import {useGameData} from "../../../../hooks/gameDataHook";
// import {useSelector} from "react-redux";

import Info from "./Info/Info";
import Answer from "./Answer/Answer";

const a = 'первый';
const b = 'второй';
const c = 'третий';
const d = 'четвёртый';
const e = 'ПРАВИЛЬНОЕ';

const correct = 'ПРАВИЛЬНОЕ';

export default function Audiocall() {

  const [answers, setAnswers] = useState([]);
  const [wordComplete, setWordComplete] = useState(true);
  const [seconds, setSeconds] = useState(5);

  /*  const { goodCount, badCount } = useGameData();
    const words = useSelector((state) => state.words.items); //!!!слова берем из уже имеющихся в сторе,
    const userId = useSelector((state) => state.auth.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);*/

  useEffect(() => {
    startGame();
  }, []);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (seconds > 0) {
      setSeconds((prev) => prev - 1);
    }
  }, 1000);

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
    <section className={styles.audiocall}>
      {seconds === 0 ? (
        <>
          <div>
            {wordComplete ? <Info soundOn={soundOn}/> : <Info soundOn={soundOn} correct={correct}/>}
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

          <button onClick={startGame} className={styles.buttons_footer}>
            {wordComplete ? 'Сдаться :(' : 'Дальше'}
          </button>
        </>
      ) : (
        <div className={styles.timer}>
          <h1>{seconds}</h1>
        </div>
      )}
    </section>
  )
};
