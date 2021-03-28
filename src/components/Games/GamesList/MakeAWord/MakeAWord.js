import React, {useState, useEffect} from 'react';
import styles from "./MakeAWord.module.scss";

import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";
// import ImgWord from "./ImgWord/ImgWord";

export default function MakeAWord() {
  const [arrWords, setArrWords] = useState([]); // массив слов
  const [answer, setAnswer] = useState(''); // ответ для вывода и для toLose
  const [gameWord, setGameWord] = useState([]); // угадываемое слово
  const [lettersArr, setLettersArr] = useState([]); // угадываемое слово в виде массива
  const [gameStatus, setGameStatus] = useState(false); // игра идёт или завершена

  useEffect(() => {
    fetch("https://react-lang-app.herokuapp.com/words")
      .then((data) => data.json())
      .then((data) => {
        setArrWords(data);
        return data;
      });
  }, []);

  useEffect(() => {
    setArrWords((prev) => arrWords
      .sort(() => 0.5 - Math.random()));
  }, [arrWords]);

  function startGame() {
    shuffleLetters(arrWords[0].word); //--------------------- DATA
    getWordArr(arrWords[0].word); //--------------------- DATA
    setGameStatus(() => true)
  }

  function shuffleLetters(letters) {
    return setGameWord((prev) => letters
      .toLowerCase()
      .split('')
      .sort(() => 0.5 - Math.random()))
  }

  function getWordArr(word) {
    return setLettersArr(() =>
      word.toLowerCase().split('')
    )
  }

  function concatenate(letter) {
    return setAnswer((prev) => prev + letter)
  }

  function wordPlay() {
    console.log('sound can be play')
  }

  function deleteWord() {
    console.log('delete Word from dictionary')
  }

  function toLose() {
    setAnswer(() => arrWords[0].word); //--------------------- DATA
    setGameStatus(() => false)
  }

  function endGame() {
    console.log('WIN');
    setGameStatus(() => false)
  }

  return (
    <section className={styles.make__word}>
      <button
        className={styles.start__make}
        onClick={startGame}
        disabled={gameStatus ? "disabled" : null}
      >
        Start Game
      </button>

      <div className={styles.word__description}>
        <span
          onClick={gameStatus ? null : wordPlay()}
        >
          {gameStatus ? null : <i className="fas fa-volume-up"/>}
        </span>
        <div>
          <div>{gameStatus ? arrWords[0].wordTranslate : 'Слово'}</div>   {/*--------------------- DATA */}
          <p>Collect a word from letters</p>
        </div>
      </div>

      <InputWord answer={answer}/>

      <div className={styles.word__letters}>
        {gameWord.map((letter, index) => (
          <Letter
            key={index}
            letter={letter}
            lettersArr={lettersArr}
            setLettersArr={setLettersArr}
            concatenate={concatenate}
            endGame={endGame}
          />
        ))}
      </div>

      <div className={styles.buttons__footer}>
        <span onClick={deleteWord}><i className="fas fa-trash-alt"/></span>
        <button onClick={toLose}>Enter</button>
        <button onClick={startGame}>{gameStatus ? 'skip :(' : 'next'}</button>
      </div>

    </section>
  )
};
