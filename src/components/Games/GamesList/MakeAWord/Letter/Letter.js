import React, {useState} from 'react';
import styles from "../MakeAWord.module.scss";

export default function Letter({letter, reset, correctLettersArr, setCorrectLettersArr, concatenate, endGame}) {

  const [done, setDone] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const classes = [styles.btn_letter];
  if (done) {
    classes.push(styles.done)
  }
  if (incorrect) {
    classes.push(styles.incorrect)
  }

  function checkDone(el) {
    if (el === correctLettersArr[0]) {
      setDone(() => true);
      concatenate(el);
      setCorrectLettersArr((wordArr) => wordArr.slice(1));
      if (correctLettersArr.length === 1) endGame();
    } else showIncorrect();
  }

  function showIncorrect() {
    setIncorrect(() => true);
    setTimeout(() => {
      setIncorrect(() => false);
    }, 250)
  }

  return (
    <button
      className={reset ? classes : classes.join(' ')}
      onClick={() => checkDone(letter)}
    >
      {letter}
    </button>
  )
};
