import React from 'react';

import styles from './TextBook.module.scss';
import MainTitle from "../MainTitle/MainTitle";
import UnitsList from "../UnitsList/UnitsList";
import WordsList from "../WordsList/WordsList";

export default function TextBook() {
    return (
        <main className={styles.main}>
            <MainTitle text={"Электронный учебник"} icon={true}/>
            <UnitsList/>
            <WordsList/>
        </main>
    );
}
