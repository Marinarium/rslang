import React, {useState, useEffect} from 'react';
import {useGameData} from "../../../../hooks/gameDataHook";
// import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useInterval} from '../../../../helpers.js'
import {putStatistics} from "../../../../redux/statReducer";
import styles from "./Audiocall.module.scss";

import Info from "./Info/Info";
import ModalFinish from "../../ModalFinish/ModalFinish";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";
import ExitBtn from "../../ExitBtn/ExitBtn";
import Answer from "./Answer/Answer";
import {baseUrl} from "../../../../services/baseUrl/baseUrl";

export default function Audiocall() {

  const [arrWords, setArrWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [infoActiveArr, setInfoActiveArr] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [currentWordId, setCurrentWordId] = useState('');
  const [activeWord, setActiveWord] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const dispatch = useDispatch();
  const {goodCount, badCount} = useGameData();
  const words = useSelector((state) => state.words.items);
  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);
  const gamesCount = useSelector(state => state.stat.gamesCount);
  // const history = useHistory();

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
            [el.wordTranslate, true, el.id, el.audio, el.word, el.transcription, el.textMeaning],
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

  const startGame = () => {
    setActiveWord(0);
    setWordComplete(() => false);
    setModalActive(() => false);
    setTrueCount(0);
    token && dispatch(putStatistics({
      userId,
      stats: {
        "learnedWords": 0,
        "optional": {
          gamesCount: (gamesCount + 1)
        }
      },
      token
    }));
  };

  function toNextWord() {
    //console.log(randomWords)
    setWordComplete(() => false);
    setRandomWords(() => randomWords[Object.keys(randomWords)[activeWord+1]])
  }

  function soundOn() {
    const answer = retAnswer();
    const audio = new Audio(baseUrl + answer[3]);
    audio.play();
  }

  function retAnswer() {
    return randomWords[Object.keys(randomWords)[activeWord]].find(i => i.includes(true));
  }

  return (
    <section className={styles.audiocall}>
      {seconds === 0 ? (
        <>
          <ExitBtn/>
          <div className={styles.audiocall_inner}>
            <div>
              <Info
                soundOn={soundOn}
                retAnswer={retAnswer}
                wordComplete={wordComplete}
              />
            </div>
            <div className={styles.answers}>
              {randomWords[Object.keys(randomWords)[activeWord]].map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    answer={answer}
                    setWordComplete={setWordComplete}
                    setTrueCount={setTrueCount}
                    isAuthenticated={isAuthenticated}
                    goodCount={goodCount}
                    badCount={badCount}
                    userId={userId}
                    currentWordId={currentWordId}
                    words={words}
                    token={token}
                  />
                );
              })}
            </div>
            <button onClick={toNextWord} className={styles.buttons_footer}>
              {wordComplete ? 'Дальше' : 'Сдаться :('}
            </button>

            <Modal modalActive={modalActive} setModalActive={setModalActive}>
              <ModalFinish
                trueCount={trueCount}
                looseCount={Object.keys(randomWords).length - trueCount}
                startGame={startGame}
              />
            </Modal>
          </div>
        </>
      ) : (
        <Loader seconds={seconds}/>
      )}
    </section>
  )
};
