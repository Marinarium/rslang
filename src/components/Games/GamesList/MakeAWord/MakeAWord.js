import React, {useState, useEffect, useRef} from 'react';
import styles from "./MakeAWord.module.scss";

import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";

export default function MakeAWord() {
  const [arrWords, setArrWords] = useState([]); // массив слов
  const [answer, setAnswer] = useState(''); // ответ для вывода и для toLose
  const [gameWord, setGameWord] = useState([]); // угадываемое слово
  const [correctLettersArr, setCorrectLettersArr] = useState([]); // правильное угадываемое слово в виде массива
  const [gameWordTranslate, setGameWordTranslate] = useState([]); // перевод угадываемого слова
  const [gameWordDescription, setGameWordDescription] = useState([]); // перевод угадываемого слова
  const [gameWordTranscription, setGameWordTranscription] = useState([]); // перевод угадываемого слова
  const [wordComplete, setWordComplete] = useState(false); // игра идёт или завершена
  const [gameActive, setGameActive] = useState(false); // игра создана или нет
  const arrRef = useRef(arrWords);
  const [totalDone, setTotalDone] = useState(false);

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
    console.log('shuffleLetters')
    return setGameWord((prev) => word
      .toLowerCase()
      .split('')
      .sort(() => 0.5 - Math.random()))
  }

  function shrinkArr() {
    console.log('shrinkArr')
    if (arrRef.current.length === 1) {
      console.log('FINISH')
      setWordComplete(() => false);
      setGameActive(() => false);
    }
    setAnswer(() => '');
    return arrRef.current = arrRef.current.slice(1);
  }

  function getLettersArr(word) {
    console.log('getLettersArr')
    return setCorrectLettersArr((prev) =>
      word.toLowerCase().split('')
    )
  }

  function concatenate(letter) {
    console.log('concatenate')
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
    console.log('endWord');
    console.log(arrRef.current[0].audio);
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
              setTotalDone(true);
              console.log(arrRef.current);
              shrinkArr();
              if (arrRef.current.length === 0) {
                anotherNewGame();
                return;
              }
              setWordComplete(() => false);
              // сбрасываются стили букв до btn_letter
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
