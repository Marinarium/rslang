import React, {} from 'react';
import styles from "./Answer.module.scss";

export default function Answer({el, chooseCorrect}) {

  return (
    <div
      className={styles.answer_btn}
      onClick={() => chooseCorrect(el)}
    >
      {el[0]}
    </div>
  )
};
