import React from 'react';
import TextBook from "../../components/TextBook/TextBook";


import styles from './TextBookPage.module.scss';
import {Loader} from "../../components/Loader/Loader";
import {useSelector} from "react-redux";

export default function TextBookPage() {
    const isLoading = useSelector(state => state.words.isLoading);
    return (
        <main className={styles.main}>
           <TextBook/>
        </main>
    );
}
