import React, {useState, useEffect} from 'react';
import styles from "../MakeAWord.module.scss";

export default function Letter({letter, correctLettersArr, setCorrectLettersArr, concatenate, endWord}) {

  const [done, setDone] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const classes = [styles.btn_letter];
  const doneCls = [styles.done];

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
      if (correctLettersArr.length === 1) endWord();
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
      className={done ? doneCls : classes}
      onClick={() => checkDone(letter)}
    >
      {letter}
    </button>
  )
}
