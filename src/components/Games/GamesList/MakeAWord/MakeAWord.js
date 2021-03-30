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
  const [gameStatus, setGameStatus] = useState(false); // игра идёт или завершена
  const [reset, setReset] = useState(false);
  const arrRef = useRef(arrWords);

  // let qqq = true;

  useEffect(() => {
    fetch("https://react-lang-app.herokuapp.com/words")
      .then((data) => data.json())
      .then((data) => {
        if (data !== null) {
          data = data.sort(() => 0.5 - Math.random());
          setArrWords(data);
          arrRef.current = data;
          return data;
        } else console.log('ERROR!!!!!!!!!')
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
      setGameStatus(() => false);
    }
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

  function endGame() {
    console.log('endGame');
    setGameStatus(() => false);
  }

  return (
    <section className={styles.make_word}>
      <button
        className={styles.start_make}
        onClick={() => {
          shuffleLetters(arrRef.current[0].word);
          getLettersArr(arrRef.current[0].word);
          getTranslate(arrRef.current[0].wordTranslate);
          setGameStatus(() => true)
        }}
        disabled={gameStatus ? "disabled" : null}
      >Start Game
      </button>

      <div>
        <div className={styles.word_description}>
          <div>
            <div>{gameStatus ? gameWordTranslate : null}</div>
          </div>
        </div>

        <InputWord answer={answer}/>

        <div className={styles.word_letters}>
          {gameWord.map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              reset={reset}
              correctLettersArr={correctLettersArr}
              setCorrectLettersArr={setCorrectLettersArr}
              concatenate={concatenate}
              endGame={endGame}
            />
          ))}
        </div>

        <div className={styles.buttons_footer}>
          <button
            onClick={() => {
              shrinkArr();
              console.log(arrRef.current)
              if (arrRef.current.length === 0) {
                anotherNewGame();
                return;
              }
              // сбрасываются стили буковок до btn_letter
              setReset(() => true)
              shuffleLetters(arrRef.current[0].word);
              getLettersArr(arrRef.current[0].word);
              getTranslate(arrRef.current[0].wordTranslate);
            }}
          >{gameStatus ? 'skip :(' : 'next'}</button>
        </div>

        {/*        <button
          onClick={() => {qqq = false;this.forceUpdate();}}
          className={styles.btn_letter} style={{visibility: qqq ? 'visible' : 'hidden' }}>
          TEST
        </button>*/}

      </div>

    </section>
  )
};
