import React, {useState, useEffect, useRef} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import {useSelector} from "react-redux";
// import {useGameData} from "../../../../hooks/gameDataHook";
import {textToHtml} from '../../../../helpers.js'
import styles from "./MakeAWord.module.scss";

import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";
import ModalFinish from "../../ModalFinish/ModalFinish";

export default function MakeAWord() {
  const [arrWords, setArrWords] = useState([]);
  const [answer, setAnswer] = useState('');
  const [gameWord, setGameWord] = useState([]);
  const [correctLettersArr, setCorrectLettersArr] = useState([]);
  const [gameWordTranslate, setGameWordTranslate] = useState('');
  const [gameWordDescription, setGameWordDescription] = useState('');
  const [gameWordTranscription, setGameWordTranscription] = useState('');
  const [wordComplete, setWordComplete] = useState(false);
  const [wordLoose, setWordLoose] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [totalDone, setTotalDone] = useState(false);
  const [looseCount, setLooseCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const arrRef = useRef(arrWords);
  const handle = useFullScreenHandle();

  /* const {goodCount, badCount} = useGameData();
   const words = useSelector(state => state.words.items);
   const userId = useSelector(state => state.auth.userId);*/

  useEffect(() => {
    fetch("https://react-lang-app.herokuapp.com/words")
      .then((data) => data.json())
      .then((data) => {
        data = data.sort(() => 0.5 - Math.random());
        setArrWords(data);
        arrRef.current = data;
        return data;
      })
  }, []);

  function anotherNewGame() {
    fetch("https://react-lang-app.herokuapp.com/words")
      .then((data) => data.json())
      .then((data) => {
        data = data.sort(() => 0.5 - Math.random());
        setArrWords(data);
        arrRef.current = data;
      });
  }

  function startGame() {
    setGameActive(() => true);
    setWordComplete(() => false);
    setLooseCount(0);
    setTrueCount(0);
    shuffleLetters(arrRef.current[0].word);
    getLettersArr(arrRef.current[0].word);
    getTranslate(arrRef.current[0].wordTranslate);
  }

  function shuffleLetters(word) {
    word = word.toLowerCase().split('');
    let j, temp;
    for (let i = word.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = word[j];
      word[j] = word[i];
      word[i] = temp;
    }
    return setGameWord(() => word)
  }

  function shrinkArr() {
    if (arrRef.current.length === 1) {
      setWordComplete(() => false);
      setGameActive(() => false);
    }
    setAnswer(() => '');
    return arrRef.current = arrRef.current.slice(1);
  }

  function getLettersArr(word) {
    return setCorrectLettersArr((prev) => word.toLowerCase().split(''))
  }

  function concatenate(letter) {
    return setAnswer((prev) => prev + letter)
  }

  function getTranslate(word) {
    return setGameWordTranslate(() => word);
  }

  function getDescription(word) {
    return setGameWordDescription(() => word);
  }

  function getTranscription(word) {
    return setGameWordTranscription(() => word);
  }

  function toLoose() {
    setLooseCount((prev) => prev + 1);
    setWordComplete(() => true);
    setWordLoose(() => true);
    setAnswer(() => arrRef.current[0].word);
    getDescription(arrRef.current[0].textMeaning);
    getTranscription(arrRef.current[0].transcription)
  }

  function nextBtn() {
    shrinkArr();
    if (arrRef.current.length === 0) {
      anotherNewGame();
      return;
    }
    setTotalDone(() => true);
    setWordComplete(() => false);
    setWordLoose(() => false);
    shuffleLetters(arrRef.current[0].word);
    getLettersArr(arrRef.current[0].word);
    getTranslate(arrRef.current[0].wordTranslate);
  }

  function endWord() {
    setTotalDone(() => true);
    getDescription(arrRef.current[0].textMeaning);
    getTranscription(arrRef.current[0].transcription)
  }

  return (
    <section className={styles.make_word}>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle}>
        <button
          className={gameActive ? styles.start_make_dis : styles.start_make}
          onClick={startGame}
          disabled={gameActive ? "disabled" : null}
        >
          Начать тренировку
        </button>

        <h3>Собери слово <span>{gameWordTranslate ? gameWordTranslate : null}</span> из букв</h3>

        {gameActive ? (
          <main className={styles.make_word_game}>
            <InputWord answer={answer}/>
            {wordComplete ? (
              <div>
                <div>Transcription: {gameWordTranscription}</div>
                <div>Meaning: {textToHtml(gameWordDescription)}</div>
              </div>
            ) : (
              <div className={styles.word_letters}>
                {gameWord.map((letter, index) => (
                  <Letter
                    key={index}
                    letter={letter}
                    correctLettersArr={correctLettersArr}
                    setCorrectLettersArr={setCorrectLettersArr}
                    concatenate={concatenate}
                    endWord={endWord}
                    totalDone={totalDone}
                    setTotalDone={setTotalDone}
                    setWordComplete={setWordComplete}
                    setWordLoose={setWordLoose}
                    setTrueCount={setTrueCount}
                  />
                ))}
              </div>
            )}
            <div className={styles.buttons_footer}>
              <button onClick={toLoose} disabled={wordLoose ? 'disabled' : null}>
                Сдаться
              </button>

              <button onClick={nextBtn} disabled={wordLoose ? null : 'disabled'}>
                Дальше
              </button>
            </div>
          </main>
        ) : (
          <ModalFinish
            trueCount={trueCount}
            looseCount={looseCount}
            startGame={startGame}
          />
        )}
      </FullScreen>

    </section>
  )
};
