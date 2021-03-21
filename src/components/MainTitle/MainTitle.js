import React from 'react';

import styles from './MainTitle.module.scss';

export default function MainTitle({text}) {
    return (
        <h1 className={styles.title}>{text}</h1>
    );
}
