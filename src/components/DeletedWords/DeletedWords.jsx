import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import DeletedWordsListContainer from './DeletedWordsListContainer/DeletedWordsListContainer';

import styles from './DeletedWords.module.scss';

export default function DeletedWords() {
    return (
        <div className={styles.main}>
            <UnitsList link={"dictionary/deleted"}/>
            <DeletedWordsListContainer/>
        </div>
    );
};
