import React, {useState} from 'react';
import styles from "./Answer.module.scss";
import {baseUrl} from "../../../../../services/baseUrl/baseUrl";

export default function Answer({answer, setWordComplete, setTrueCount, goodCount, badCount, isAuthenticated,
                                 userId, currentWordId, words, token}) {

  const [done, setDone] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const classes = [styles.answer_btn];
/*
  useEffect(() => {
    totalDone && setDone(false)
  }, [totalDone]);*/

  if (done) {
    classes.push(styles.done)
  }

  if (incorrect) {
    classes.push(styles.incorrect)
  }

  function chooseCorrect(el) {
    if (!el[1]) {
      showIncorrect();
      isAuthenticated && badCount(userId, currentWordId, words, token);
    } else {
      setDone(() => true);
      setWordComplete(() => true);
      setTrueCount((prev) => prev + 1);
      isAuthenticated && goodCount(userId, currentWordId, words, token);

      soundOn()

      // shrinkArr();
      // if (randomWords.length === 0) {
      //   setModalActive(() => true);
      // }
    }
  }

  function showIncorrect() {
    setIncorrect(() => true);
    setTimeout(() => {
      setIncorrect(() => false);
    }, 250)
  }

  function soundOn() {
    const audio = new Audio(baseUrl + answer[3]);
    audio.play();
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={() => chooseCorrect(answer)}
    >
      {answer[0]}
    </div>
  )
};
