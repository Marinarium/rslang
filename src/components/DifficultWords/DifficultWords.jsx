import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import DifficultWordsListContainer from './DifficultWordsListContainer/DifficultWordsListContainer';

import styles from './DifficultWords.module.scss';

export default function DifficultWords() {
    return (
        <div className={styles.main}>
            <UnitsList link={"dictionary/difficult"}/>
            <DifficultWordsListContainer/>
        </div>
    );
};
