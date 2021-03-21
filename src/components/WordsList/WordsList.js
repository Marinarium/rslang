import React from 'react';
import WordItem from "../WordItem/WordItem";

import styles from './WordsList.module.scss';

export default function WordsList() {
    const words = [
        {word: 'different'}
    ]

    const allWords = words.map(({word}) => {
        return (
            <WordItem
                key={word}
                word={word}
            />
        );
    });

    return (
        <>
            <section>
                <h3>слов на странице: 4</h3>
                <h3>общий результат страницы: 33/23</h3>
            </section>

            {allWords}
        </>
    );
}
