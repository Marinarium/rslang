import React from 'react';

import styles from './MainTitle.module.scss';
import SettingsIcon from "../SettingsIcon/SettingsIcon";

export default function MainTitle({text, icon}) {
    return (
        <>
            <h1 className={styles.title}>{text}{icon ? <SettingsIcon/> : null}</h1>
        </>
    );
}
