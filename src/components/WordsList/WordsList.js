import React from 'react';
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

    const userId = useSelector(state => state.auth.userId);


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

    const startGameHandler = async (linkTo) => {
        await words.map(i => {
             !i.userWord && dispatch(createUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count':{
                            'good': 0,
                            'bad': 0
                        }

                    }
                }
            }));
            const learned = i.userWord && i.userWord.optional && i.userWord.optional.learned
             !learned && dispatch(updateUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count':{
                            'good': 0,
                            'bad': 0
                        }

                    }
                }
            }));
        })
        setTimeout(()=> {//!!!!!!!!!!!!!!!!!!!!!!!!!!!
            dispatch(getAllUserWordsWithoutDeletedWords({group: currentGroup, page: currentPage, userId}));
        },3000)

        history.push(`/${linkTo}`)
    };
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
                <h3>слов на странице: 4</h3>
                <h3>общий результат страницы: 33/23</h3>
            </section>
            <div className={styles.words}>
                {allWords}
            </div>

        </>
    );
}



