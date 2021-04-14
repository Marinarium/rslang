import React, {} from 'react';
import {textToHtml} from '../../../../../helpers.js'
import styles from "./Info.module.scss";

export default function Info({soundOn, retAnswer, wordComplete}) {
  const answer = retAnswer();

  return (
    <section className={styles.info}>
      <div>
        <i onClick={soundOn} className="fas fa-volume-up"/>
        <span> {wordComplete ? answer[4] : null}</span>
      </div>
      <div>
        <div>{wordComplete ? (<><span>Транскрипция</span>: {answer[5]}</>) : null}</div>
        <div>{wordComplete ? (<><span>Обозначение</span>: {textToHtml(answer[6])}</>) : null}</div>
      </div>
    </section>
  )
};
