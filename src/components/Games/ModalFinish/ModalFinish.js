import React from "react";
import styles from "./ModalFinish.module.scss";
import {Link} from "react-router-dom";

export default function ModalFinish({trueCount, looseCount}) {
  return (
    <div className={styles.endGame}>
      <div className={styles.endGame_body}>
        <div className={styles.endGame_body_top}>
          <h1>Круто, отличный результат!</h1>
          <h3>
            {trueCount} слов изучено, {looseCount} на изучении
          </h3>
        </div>
        <div className={styles.endGame_body_bottom}>
          <button>
            <Link to="/games">К списку тренировок</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
