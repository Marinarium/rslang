import React, {useEffect} from 'react';
import WordItem from "../WordItem/WordItem";
import {useLocation, withRouter} from 'react-router-dom';
import styles from './WordsList.module.scss';
import {fetchWords} from '../../redux/wordsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl} from '../../services/baseUrl/baseUrl';

function WordsList({match}) {

    const location = useLocation();
    const dispatch = useDispatch();

    const words = useSelector(state => state.words.items);

    useEffect(() => {
        dispatch(fetchWords({group: match.params.unit - 1, page: '0'}));
    },[location, dispatch]);

    // const words = [
    //     {
    //         id: "5e9f5ee35eb9e72bc21af4a0",
    //         group: 3,
    //         page: 0,
    //         word: "alcohol",
    //         image: "files/01_0002.jpg",
    //         audio: "files/01_0002.mp3",
    //         audioMeaning: "files/01_0002_meaning.mp3",
    //         audioExample: "files/01_0002_example.mp3",
    //         textMeaning: "<i>Alcohol</i> is a type of drink that can make people drunk.",
    //         textExample: "A person should not drive a car after he or she has been drinking <b>alcohol</b>.",
    //         transcription: "[ǽlkəhɔ̀ːl]",
    //         textExampleTranslate: "Человек не должен водить машину после того, как он выпил алкоголь",
    //         textMeaningTranslate: "Алкоголь - это тип напитка, который может сделать людей пьяными",
    //         wordTranslate: "алкоголь"
    //     },

    // ]

    const allWords = words.map(({
                                    id,
                                    group,
                                    word,
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

export default withRouter(WordsList)
