import React, {} from 'react';
import styles from "../MakeAWord.module.scss";

export default function InputWord({answer}) {

  return (
    <div className={styles.input__word}>
      {answer}
    </div>
  )
};
