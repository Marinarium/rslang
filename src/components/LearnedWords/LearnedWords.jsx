import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import LearnedWordsListContainer from './LearnedWordsListContainer/LearnedWordsListContainer';

import styles from './LearnedWords.module.scss';

export default function LearnedWords() {
    return (
        <div className={styles.main}>
            <UnitsList link={"dictionary/learned"}/>
            <LearnedWordsListContainer/>
        </div>
    );
};
