import React, {useEffect, useState} from 'react';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';
import {useHistory} from 'react-router-dom';
import {gamesItems} from '../Games/Games';
import {createUserWord, getAllUserWordsWithoutDeletedWords, updateUserWord} from '../../redux/wordsReducer';
import {useDispatch, useSelector} from 'react-redux';

export function WordsList({words, handlePageClick, currentPage, currentGroup, container, location, match}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [totalPageResult, setTotalPageResult] = useState({})
    const userId = useSelector(state => state.auth.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


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
        isAuthenticated && words.map(async i => {
            const learned = i.userWord?.optional?.learned;
            !i.userWord && await dispatch(createUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count': {
                            'good': 0,
                            'bad': 0
                        }

                    }
                }
            }));
            !learned && await dispatch(updateUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count': {
                            'good': 0,
                            'bad': 0
                        }
                    }
                }
            }));

        })
        isAuthenticated  && (container === 'text-book') && dispatch(getAllUserWordsWithoutDeletedWords({
            group: currentGroup,
            page: currentPage,
            userId
        }));
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
            {gamesItems.map(({name, linkTo}) => <div
                    key={name}
                    onClick={() => startGameHandler(linkTo)}>
                    {name}
                </div>
            )
            }
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



