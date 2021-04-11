import React from 'react'
import styles from './Loader.module.scss'

export default function Loader({seconds}) {
  return (
    <div className={styles.loader}>
      <h1>{seconds}</h1>
    </div>
  )
};
