import React, {} from 'react';
import {textToHtml} from '../../../../../helpers.js'
import styles from "./Info.module.scss";

export default function Info({soundOn, currentAnswer, wordComplete}) {


  return (
    <section className={styles.info}>
      <div>
        <i onClick={soundOn} className="fas fa-volume-up"/>
        <span> {wordComplete ? currentAnswer[4] : null}</span>
      </div>
      <div>
        <div>{wordComplete ? (<><span>Транскрипция</span>: {currentAnswer[5]}</>) : null}</div>
        <div>{wordComplete ? (<><span>Обозначение</span>: {textToHtml(currentAnswer[6])}</>) : null}</div>
      </div>
    </section>
  )
};
