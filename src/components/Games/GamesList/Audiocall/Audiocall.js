import React, {useState, useEffect, useRef} from 'react';
// import {useGameData} from "../../../../hooks/gameDataHook";
// import {useSelector} from "react-redux";
import {useInterval} from '../../../../helpers.js'
import styles from "./Audiocall.module.scss";

import Info from "./Info/Info";
import Answer from "./Answer/Answer";
import ModalFinish from "../../ModalFinish/ModalFinish";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";
import ExitBtn from "../../ExitBtn/ExitBtn";

const a = 'первый';
const b = 'второй';
const c = 'третий';
const d = 'четвёртый';
const e = 'ПРАВИЛЬНОЕ';

const correct = 'ПРАВИЛЬНОЕ';

export default function Audiocall() {

  const [answers, setAnswers] = useState([]);
  const [wordComplete, setWordComplete] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [looseCount, setLooseCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [seconds, setSeconds] = useState(5);

  /*  const { goodCount, badCount } = useGameData();
    const words = useSelector((state) => state.words.items); //!!!слова берем из уже имеющихся в сторе,
    const userId = useSelector((state) => state.auth.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);*/

  useEffect(() => {
    startGame();
  }, []);

  useInterval(() => {
    if (seconds > 0) setSeconds((prev) => prev - 1)
  }, 1000);

  function startGame() {
    setAnswers((answers) => [a, b, c, d, e].sort(() => 0.5 - Math.random()));
    setWordComplete(() => true);
    setModalActive(() => false);
    setLooseCount(0);
    setTrueCount(0);
  }

  function chooseCorrect(event) {
    if (correct === event.target.innerText) {
      setTrueCount((prev) => prev + 1);
      endGame();
    }
  }

  function soundOn() {
    console.log('soundOn')
  }

  function endGame() {
    console.log('WIN');
    setWordComplete(() => false);
    setModalActive(() => true);
  }

  return (
    <section className={styles.audiocall}>
      {seconds === 0 ? (
        <>
          <ExitBtn />

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

          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ModalFinish
              trueCount={trueCount}
              looseCount={looseCount}
              startGame={startGame}
            />
          </Modal>
        </>
      ) : (
        <Loader seconds={seconds}/>
      )}
    </section>
  )
};
