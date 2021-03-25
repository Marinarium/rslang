import React from 'react';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';

export function WordsList({words, handlePageClick, currentPage}) {

    const allWords = words.map(({
                                    id,
                                    group,
                                    word,
                                    audio,
                                    audioMeaning,
                                    audioExample,
                                    image,
                                    textMeaning,
                                    textMeaningTranslate,
                                    transcription,
                                    textExample,
                                    textExampleTranslate,
                                    wordTranslate
                                }) => {
        return (
            <WordItem
                key={id}
                group={group}
                word={word}
                audio={baseUrl + audio}
                audioMeaning={baseUrl + audioMeaning}
                audioExample={baseUrl + audioExample}
                image={baseUrl + image}
                textMeaning={textMeaning}
                textMeaningTranslate={textMeaningTranslate}
                transcription={transcription}
                textExample={textExample}
                textExampleTranslate={textExampleTranslate}
                wordTranslate={wordTranslate}
            />
        );
    });

    return (
        <>
            <Pagination handlePageClick={handlePageClick} currentPage={currentPage}/>
            <section className={styles.statistic_page}>
                <h3>слов на странице: 4</h3>
                <h3>общий результат страницы: 33/23</h3>
            </section>
            <div className={styles.words}>
                {allWords}
            </div>
        </>
    );
}



