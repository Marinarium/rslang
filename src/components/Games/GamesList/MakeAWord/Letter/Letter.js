import React, {useState} from 'react';
import styles from "../MakeAWord.module.scss";

export default function Letter({letter, lettersArr, setLettersArr, concatenate, endGame}) {

  const [done, setDone] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const classes = [styles.btn__letter];
  if (done) {
    classes.push(styles.done)
  }
  if (incorrect) {
    classes.push(styles.incorrect)
  }

  function checkDone(el) {
    console.log(lettersArr);
    if (el === lettersArr[0]) {
      setDone(() => true);
      concatenate(el);
      setLettersArr((wordArr) => wordArr.slice(1));
      if (lettersArr.length === 1) endGame();
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
      className={classes.join(' ')}
      onClick={() => checkDone(letter)}
    >
      {letter}
    </button>
  )
};
