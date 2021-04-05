import React, {useState, useEffect, useRef} from 'react';
import styles from "./MakeAWord.module.scss";

import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";
import {useGameData} from "../../../../hooks/gameDataHook";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function MakeAWord() {
  const [arrWords, setArrWords] = useState([]);
  const [answer, setAnswer] = useState('');
  const [gameWord, setGameWord] = useState([]);
  const [correctLettersArr, setCorrectLettersArr] = useState([]);
  const [gameWordTranslate, setGameWordTranslate] = useState([]);
  const [gameWordDescription, setGameWordDescription] = useState([]);
  const [gameWordTranscription, setGameWordTranscription] = useState([]);
  const [wordComplete, setWordComplete] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [totalDone, setTotalDone] = useState(false);
  const [looseCount, setLooseCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const arrRef = useRef(arrWords);

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
    setWordComplete(() => true);
    setLooseCount(0);
    shuffleLetters(arrRef.current[0].word);
    getLettersArr(arrRef.current[0].word);
    getTranslate(arrRef.current[0].wordTranslate);
  }

  function shuffleLetters(word) {
    return setGameWord((prev) => word
      .toLowerCase()
      .split('')
      .sort(() => 0.5 - Math.random()))
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
    return setCorrectLettersArr((prev) => word.toLowerCase().split('')
    )
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
    setAnswer(() => arrRef.current[0].word);
    getDescription(arrRef.current[0].textMeaning);
    getTranscription(arrRef.current[0].transcription)
  }

  function endWord() {
    setTotalDone(true);
    getDescription(arrRef.current[0].textMeaning);
    getTranscription(arrRef.current[0].transcription)
  }

  return (
    <section className={styles.make_word}>
      <h3>Collect a word from letters</h3>

      <div>{trueCount} - true</div>
      <div>{looseCount} - loose</div>

      <button
        className={styles.start_make}
        onClick={startGame}
        disabled={gameActive ? "disabled" : null}
      >
        Start Game
      </button>

      <div className={gameActive ? styles.game_block_vis : null}>
        {gameActive ? (
          <>
            <div className={styles.word_description}>
              {gameWordTranslate}
            </div>

            <InputWord answer={answer}/>
            <p>{wordComplete ? gameWordTranscription : null}</p>

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
                  setTrueCount={setTrueCount}
                />
              ))}
            </div>

            <p>{wordComplete ? gameWordDescription : null}</p>

            <div className={styles.buttons_footer}>
              <button
                onClick={() => {
                  toLoose();
                  //setWordComplete(() => false);
                }}
                //disabled={wordComplete ? null : "disabled"}
              >
                Loose
              </button>

              <button
                onClick={() => {
                  shrinkArr();
                  if (arrRef.current.length === 0) {
                    anotherNewGame();
                    return;
                  }
                  setTotalDone(() => true);
                  setWordComplete(() => false);
                  shuffleLetters(arrRef.current[0].word);
                  getLettersArr(arrRef.current[0].word);
                  getTranslate(arrRef.current[0].wordTranslate);
                }}
              >
                Next word
              </button>
            </div>
          </>
        ) : (
          <div className={styles.endGame}>
            <div className={styles.endGame_body}>
              <div className={styles.endGame_body_top}>
                <h1>Круто,отличный результат!</h1>
                <h3>
                  {trueCount} слов изучено,
                  {looseCount} на изучении
                </h3>
              </div>
              <div className={styles.endGame_body_center}>
                <div className={styles.endGame_body_circle}>
                  <div className={styles.endGame_body_info}>
                    <p>Ваш счёт:</p>
                    {/*<p>{scoreGame}</p>*/}
                  </div>
                </div>
              </div>
              <div className={styles.endGame_body_bottom}>
                <button>
                  <Link to="/games">К списку тренировок</Link>
                </button>
                <button onClick={startGame}>Повторить тренировку</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
};
