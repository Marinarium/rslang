import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {fetchWords} from '../../redux/wordsReducer';
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';

function WordsList({match}) {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState('0');

    const words = useSelector(state => state.words.items);

    useEffect(() => {

        dispatch(fetchWords({group: match.params.unit - 1, page: currentPage}));

    }, [dispatch, currentPage, match.params.unit]);

    const handlePageClick = (e) => {

        setCurrentPage(e.selected);

    };
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
                                    audio,
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
            <Pagination handlePageClick={handlePageClick}/>

        </>
    );
}

export default withRouter(WordsList)
