import React, {useState, useEffect, useRef} from 'react';
import {useGameData} from "../../../../hooks/gameDataHook";
import {useSelector} from "react-redux";
import {useInterval} from '../../../../helpers.js'
import styles from "./Audiocall.module.scss";

import Info from "./Info/Info";
// import Answer from "./Answer/Answer";
import ModalFinish from "../../ModalFinish/ModalFinish";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";
import ExitBtn from "../../ExitBtn/ExitBtn";
import Answer from "./Answer/Answer";

export default function Audiocall() {

  const [arrWords, setArrWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [wordComplete, setWordComplete] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [currentWordId, setCurrentWordId] = useState('');
  const [activeWord, setActiveWord] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const {goodCount, badCount} = useGameData();
  const words = useSelector((state) => state.words.items);
  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);

  useInterval(() => {
    if (seconds > 0) setSeconds((prev) => prev - 1)
  }, 1000);

  useEffect(() => {
    setArrWords(() => [...words])
  }, [words]);

  useEffect(() => {
    const activeWordObj = words.find(i => i.word === Object.keys(randomWords)[activeWord]);
    activeWordObj && setCurrentWordId(activeWordObj.id);
  }, [words, activeWord, randomWords]);

  useEffect(() => {
    setRandomWords(
      arrWords
        .reduce((result, el) => {
          const clonedArray = JSON.parse(JSON.stringify(arrWords));
          result[el.word] = [
            [el.wordTranslate, true, el.id],
            ...clonedArray
              .sort(() => 0.5 - Math.random())
              .filter((elF) => elF.word !== el.word)
              .slice(0, 4)
              .map((el) => {
                return [el.wordTranslate, false];
              }),
          ].sort(() => Math.random() - 0.5);
          return result;
        }, {})
    );
  }, [arrWords]);

  const chooseCorrect = (el) => {
    if (!el[1]) {
      isAuthenticated && badCount(userId, currentWordId, words, token);// записываем неправильный ответ
    } else {
      toNextWord();
      setTrueCount((prev) => prev + 1);
      isAuthenticated && goodCount(userId, currentWordId, words, token);// записываем правильный ответ
    }
  };

  function toNextWord() {
    console.log('правильно')
  }

  function soundOn() {
    console.log('soundOn')
  }

  const startNewGame = () => {
    setActiveWord(0);
    setWordComplete(() => true);
    setModalActive(() => false);
    setTrueCount(0);
  };

  return (
    <section className={styles.audiocall}>
      {seconds === 0 ? (
        <>
          <ExitBtn/>

          <div>
            {wordComplete ? <Info soundOn={soundOn}/> : <Info soundOn={soundOn}/>}
          </div>

          <div className={styles.answers}>
            {randomWords[Object.keys(randomWords)[activeWord]].map((el, index) => {
              return (
                <Answer
                  key={index}
                  el={el}
                  chooseCorrect={chooseCorrect}
                />
              );
            })}
          </div>

          <button onClick={toNextWord} className={styles.buttons_footer}>
            {wordComplete ? 'Сдаться :(' : 'Дальше'}
          </button>

          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ModalFinish
              trueCount={trueCount}
              looseCount={Object.keys(randomWords).length - trueCount}
              startGame={startNewGame}
            />
          </Modal>
        </>
      ) : (
        <Loader seconds={seconds}/>
      )}
    </section>
  )
};
