import React from 'react'
import styles from './ExitBtn.module.scss'
import {Link} from "react-router-dom";

export default function ExitBtn() {
  return (
    <div className={styles.exit_btn}>
      <Link to="/games">
        <img src="https://img.icons8.com/plasticine/48/000000/close-window.png" alt=''/>
      </Link>
    </div>
  )
};
