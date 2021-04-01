import React, {useState} from 'react';
import styles from './WordItem.module.scss';
import speaker from './images/speaker.svg';
import {playAudios} from '../../services/utils/playAudio';
import {useDispatch, useSelector} from 'react-redux';
import {
    createUserWord, deleteUserWord, getLearnedWords,
    getAllUserWordsWithoutDeletedWords, getDeletedWords, getDifficultWords, updateUserWord
} from '../../redux/wordsReducer';

export default function WordItem({
                                     id,
                                     word,
                                     image,
                                     audio,
                                     audioMeaning,
                                     audioExample,
                                     textMeaning,
                                     textMeaningTranslate,
                                     transcription,
                                     textExample,
                                     textExampleTranslate,
                                     wordTranslate,
                                     currentPage,
                                     currentGroup,
                                     container,
                                     difficulty,
                                     userWord


                                 }) {


    const dispatch = useDispatch();
    const getWordsByContainer = () => {
        container === 'text-book' && dispatch(getAllUserWordsWithoutDeletedWords({group: currentGroup, page: currentPage, userId}));
        container === 'Learned' && dispatch(getLearnedWords({group: currentGroup, page: currentPage, userId}));
        container === 'Deleted' && dispatch(getDeletedWords({group: currentGroup, page: currentPage, userId}));
        container === 'Difficult' && dispatch(getDifficultWords({group: currentGroup, page: currentPage, userId}));
    }
    const activeUnit = useSelector(state => state.app.activeUnit);
    const isWordTranslated = useSelector(state => state.app.isWordTranslated);
    const isWordButtonsShown = useSelector(state => state.app.isWordButtonsShown);
    const userId = useSelector(state => state.auth.userId);
    const goodGameResults  = userWord?.optional?.count?.good || 0;
    const badGameResults  =  userWord?.optional?.count?.bad || 0;

    const playHandler = () => {
        playAudios(audio, audioMeaning, audioExample);
    };
    const classes = [];
    const classesAlt = [];

    switch (activeUnit.name) { //тут сократить, думаю, как-то можно, или по-другому сделать и в CSS по норм сделать
        case '1 раздел' :// и вообще без массива, через переменную, но пока оставляю так, может по-другому будет
            classes.push(styles.unit1)
            classesAlt.push(styles.unit1_alt)
            break
        case '2 раздел' :
            classes.push(styles.unit2)
            classesAlt.push(styles.unit2_alt)
            break
        case '3 раздел' :
            classes.push(styles.unit3)
            classesAlt.push(styles.unit3_alt)
            break
        case '4 раздел' :
            classes.push(styles.unit4)
            classesAlt.push(styles.unit4_alt)
            break
        case '5 раздел' :
            classes.push(styles.unit5)
            classesAlt.push(styles.unit5_alt)
            break
        case '6 раздел' :
            classes.push(styles.unit6)
            classesAlt.push(styles.unit6_alt)
            break
        default:
            break
    }
    const difficultButtonHandler = async () => {
        if (userWord) {
            await dispatch(updateUserWord({
                userId,
                wordId: id,
                props: {
                    "difficulty": "hard"
                }
            }));
        } else {
            await dispatch(createUserWord({
                userId,
                wordId: id,
                props: {
                    "difficulty": "hard"
                }
            }));
        }
        getWordsByContainer();

    };
    const deleteButtonHandler = async () => {
        if (userWord) {
            await dispatch(updateUserWord({
                userId,
                wordId: id,
                props: {
                    "optional": {
                        "deleted": true
                    }
                }
            }));
        } else {
            await dispatch(createUserWord({
                userId,
                wordId: id,
                props: {
                    "optional": {
                        "deleted": true
                    }
                }
            }));
        }
        getWordsByContainer();
    };
    const restoreButtonHandler = () => {
        dispatch(deleteUserWord({userId, wordId: id}));
        getWordsByContainer();
    };

    return (

        <section className={styles.card}>
            <header className={`${styles.head} ${classes.join(' ')}`}>
                <p>{goodGameResults}/{badGameResults}</p>

            </header>
            <main className={styles.main}>
                <div className={styles.main_info}>
                    <img src={image} alt={word} className={styles.image}/>
                    <div className={styles.about_word}>
                        <img src={speaker} alt="audio" className={styles.speaker} onClick={playHandler}/>
                        <h4 className={`${styles.word} ${classesAlt.join(' ')}`}>{word}</h4>
                        <span className={styles.transcription}>{transcription}</span>

                        {difficulty === 'hard' && <p style={{color: 'red', marginLeft: 50}}>СЛОЖНОЕ СЛОВО</p>}


                        {isWordTranslated && <span className={styles.translation}>{wordTranslate}</span>}
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.meaning}>
                        <p className={styles.meaning_eng}>{textMeaning}</p>
                        {isWordTranslated && <p className={styles.meaning_ru}>{textMeaningTranslate}</p>}
                    </div>
                    <div className={styles.example}>
                        <p className={styles.example_eng}>{textExample}</p>
                        {isWordTranslated && <p className={styles.example_ru}>{textExampleTranslate}</p>}
                    </div>
                </div>
                <div className={styles.buttons}>
                    {
                        container === 'text-book'
                        && isWordButtonsShown
                        && difficulty !== 'hard'
                        && <>
                            <button
                                className={`${styles.button} ${classesAlt.join(' ')}`}
                                type="button"
                                onClick={deleteButtonHandler}
                            >
                                В удалённые слова
                            </button>
                            <button
                                className={`${styles.button} ${classes.join(' ')}`}
                                type="button"
                                onClick={difficultButtonHandler}
                            >
                                В сложные слова
                            </button>

                        </>
                    }

                    {container === 'Deleted' && <button
                        className={`${styles.button} ${classes.join(' ')}`}
                        type="button"
                        onClick={restoreButtonHandler}
                    >
                        Восстановить
                    </button>}

                    {(container === 'Difficult' || difficulty === 'hard') && <button
                        className={`${styles.button} ${classes.join(' ')}`}
                        type="button"
                        onClick={restoreButtonHandler}
                    >
                        Убрать из сложных
                    </button>}
                </div>
            </main>
        </section>
    );
};
