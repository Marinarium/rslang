import React from 'react';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';
import {useHistory} from 'react-router-dom';

import {gamesItems} from '../Games/Games';

export function WordsList({words, handlePageClick, currentPage, currentGroup, container, location, match}) {
    const history = useHistory();

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
                                    wordTranslate,
                                    userWord
                                }) => {
        return (
            <WordItem
                difficulty={userWord && userWord.difficulty}
                container={container}
                key={id}
                id={id}
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
                currentPage={currentPage}
                currentGroup={currentGroup}
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
            {gamesItems.map(({name, linkTo}) => <div
                    key={name}
                    onClick={() => history.push(`/${linkTo}`)}>
                    {name}
                </div>
            )
            }
        </>
    );
}



