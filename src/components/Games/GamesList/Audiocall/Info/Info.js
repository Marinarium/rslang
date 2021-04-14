import React, {} from 'react';
// import {textToHtml} from '../../../../../helpers.js'
import styles from "./Info.module.scss";

export default function Info({correct, soundOn}) {

  return (
    <div className={styles.info}>
      <i onClick={soundOn} className="fas fa-volume-up"/>
      <span>{correct}</span>
      <div>
        {correct}
        {/*Описание, перевод и транскрипция*/}
      </div>
    </div>
  )
};
