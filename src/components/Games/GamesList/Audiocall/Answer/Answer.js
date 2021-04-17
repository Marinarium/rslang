import React, {useState} from 'react';
import styles from "./Answer.module.scss";

export default function Answer({answer, setWordComplete, setTrueCount,
                                 goodCount, badCount, isAuthenticated,
                                 userId, currentWordId, words, token, done, setDone}) {


  const [incorrect, setIncorrect] = useState(false);
  const classes = [styles.answer_btn];


  if (done && answer.includes(true) ) {
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
    }
  }

  function showIncorrect() {
    setIncorrect(() => true);
    setTimeout(() => {
      setIncorrect(() => false);
    }, 250)
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
