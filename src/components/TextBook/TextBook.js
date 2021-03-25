import React from 'react';
import styles from './TextBook.module.scss';
import MainTitle from "../MainTitle/MainTitle";
import UnitsList from "../UnitsList/UnitsList";
import TextBookListContainer from '../TextBookListContainer/TextBookListContainer'

export default function TextBook() {
    return (
        <main className={styles.main}>
            <MainTitle text={"Электронный учебник"} icon={true}/>
            <UnitsList link={"text-book"}/>
            <TextBookListContainer/>
        </main>
    );
}
