import React from 'react'
import styles from './Modal.module.scss'

export default function Modal({modalActive, setModalActive, children}) {

  const modal = [styles.modal];
  const modalContent = [styles.modal_content];

  if (modalActive) {
    modal.push(styles.active);
    modalContent.push(styles.content_active);
  }

  return (
    <div className={modal.join(' ')}
         onClick={() => setModalActive(false)}>
      <div
        className={modalContent.join(' ')}
        onClick={(event) => event.stopPropagation()}>

        {children}

      </div>
    </div>
  )
};
