import React from 'react';

import styles from './TextBook.module.scss';
import MainTitle from "../../components/MainTitle/MainTitle";
import UnitsList from "../../components/UnitsList/UnitsList";
import WordsList from "../../components/WordsList/WordsList";

export default function TextBook() {
    return (
        <main className={styles.main}>
            <MainTitle text={"Электронный учебник"}/>
            <UnitsList/>
            <WordsList/>
        </main>
    );
}
