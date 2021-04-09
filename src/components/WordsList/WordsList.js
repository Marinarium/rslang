import React, {useEffect, useState} from 'react';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';
import {useHistory} from 'react-router-dom';
import Games from '../Games/Games';
import {useStartGameWithAuth} from "../../hooks/startGameWithAuthHook";

export function WordsList({words, handlePageClick, currentPage, currentGroup, container, location, match}) {
    const history = useHistory();
    const [totalPageResult, setTotalPageResult] = useState({})
    const {setUserWords, getWords} = useStartGameWithAuth();

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
                userWord={userWord}
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

    const startGameHandler = (linkTo) => {
        setUserWords(words);
        (container === 'text-book') && getWords(currentPage, currentGroup)
        history.push(`/${linkTo}`)
    };

    useEffect(() => {

        const totalGoodResult = words.reduce((acc, current) => {
            let good = (current.userWord?.optional?.count?.good === undefined) ? 0 : current.userWord?.optional?.count?.good;
            return acc + good;
        }, 0);

        const totalBadResult = words.reduce((acc, current) => {
            let bad = (current.userWord?.optional?.count?.bad === undefined) ? 0 : current.userWord?.optional?.count?.bad;
            return acc + bad;
        }, 0);

        setTotalPageResult(prevState => {
            return {
                ...prevState,
                good: totalGoodResult,
                bad: totalBadResult
            }
        });
    }, [words])

    return (
        <>
            <Games startGameHandler={startGameHandler}/>
            <Pagination handlePageClick={handlePageClick} currentPage={currentPage}/>
            <section className={styles.statistic_page}>
                <h3>слов на странице: {words.length}</h3>
                <h3>общий результат страницы: {totalPageResult.good}/{totalPageResult.bad}</h3>
            </section>
            <div className={styles.words}>
                {allWords}
            </div>
        </>
    );
}



