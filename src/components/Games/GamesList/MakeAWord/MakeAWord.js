import React, {useState, useEffect} from 'react';
import Letter from "./Letter/Letter";
import Input from "./Input/Input";
// import styles from "./MakeAWord.module.scss";

const API_word = 'game';

export default function MakeAWord() {
  const [answer, setAnswer] = useState('');
  const [word, setWord] = useState([]);
  const [wordArr, setWordArr] = useState([]);
  const [gameStatus, setGameStatus] = useState(true);

  useEffect(() => {
    startGame();
  }, []);

  function startGame(word) {
    shuffle(API_word);
    getWordArr(API_word);
    setGameStatus(() => true)
  }

  function shuffle(letters) {
    return setWord((prev) => letters
      .toLowerCase()
      .split('')
      .sort(() => 0.5 - Math.random()))
  }

  function getWordArr(word) {
    return setWordArr(() =>
      word.toLowerCase().split('')
    )
  }

  function concatenate(letter) {
    return setAnswer((prev) => prev + letter)
  }

  function wordPlay() {
    console.log('sound will play')
  }

  function deleteWord() {
    console.log('delete Word from dictionary')
  }

  function toLose() {
    setAnswer(() => API_word);
    setGameStatus(() => false)
  }

  function endGame() {
    console.log('WIN');
    setGameStatus(() => false)
  }

  return (
    <section>

      <h1>игра</h1> {/*перевод слова*/}
      <h3>Collect a word from letters</h3>

      <span onClick={gameStatus ? null : wordPlay()}>
        {gameStatus ? 'OFF' : 'ON'}
      </span>

      <Input answer={answer} />

      {word.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          wordArr={wordArr}
          setWordArr={setWordArr}
          concatenate={concatenate}
          endGame={endGame}
        />
      ))}
      <br/>

      <button onClick={deleteWord}>
        Trash
      </button>
      <br/>

      <button onClick={toLose}>
        Enter
      </button>
      <br/>

      <button onClick={startGame}>
        {gameStatus ? 'skip :(' : 'next'}
      </button>

    </section>
  )
};
