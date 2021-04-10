import React, {} from 'react';
import styles from "./Info.module.scss";

export default function Info({correct, soundOn}) {

  return (
    <div>
      <i onClick={soundOn} className="fas fa-volume-up"/>
      <span>{correct}</span>
      <div>
        {correct}
        {/*Описание, перевод и транскрипция*/}
      </div>
    </div>
  )
};
