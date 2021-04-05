import React, {useState, useEffect, useRef} from 'react';
import styles from "./MakeAWord.module.scss";

import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";

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
  const arrRef = useRef(arrWords);

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
    return setCorrectLettersArr((prev) =>
      word.toLowerCase().split('')
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

  function endWord() {
    setTotalDone(true);
    const audio = new Audio(arrRef.current[0].audio);
    audio.play();
    getDescription(arrRef.current[0].textMeaning);
    getTranscription(arrRef.current[0].transcription)
  }

  return (
    <section className={styles.make_word}>
      <h3>Collect a word from letters</h3>

      <button
        className={styles.start_make}
        onClick={() => {
          setGameActive(() => true);
          setWordComplete(() => true);
          shuffleLetters(arrRef.current[0].word);
          getLettersArr(arrRef.current[0].word);
          getTranslate(arrRef.current[0].wordTranslate);
        }}
        disabled={wordComplete ? "disabled" : null}
      >
        Start Game
      </button>

      <div className={gameActive ? styles.game_block_vis : styles.game_block_none}>

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
            />
          ))}
        </div>

        <p>{wordComplete ? gameWordDescription : null}</p>

        <div className={styles.buttons_footer}>
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

      </div>
    </section>
  )
};
