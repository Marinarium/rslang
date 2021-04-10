import React, {} from 'react';
import styles from "./Answer.module.scss";

export default function Answer({word, chooseCorrect}) {

  return (
    <div
      className={styles.answer_btn}
      onClick={chooseCorrect}
    >
      {word}
    </div>
  )
};
