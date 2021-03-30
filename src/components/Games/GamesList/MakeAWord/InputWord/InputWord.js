import React, {} from 'react';
import styles from "../MakeAWord.module.scss";

export default function InputWord({answer}) {

  return (
    <div className={styles.input_word}>
      {answer}
    </div>
  )
};
