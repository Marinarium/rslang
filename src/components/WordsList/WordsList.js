import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styles from './WordsList.module.scss';
import WordItem from "../WordItem/WordItem";
import {fetchWords} from '../../redux/wordsReducer';
import {baseUrl} from '../../services/baseUrl/baseUrl';
import {Pagination} from '../Pagination/Pagination';
import {setCurrentPagesArray, setIsWordButtonsShown, setIsWordTranslated} from '../../redux/appReducer';
import {setCurrentPagesItem} from '../../redux/appReducer';


function WordsList({match}) {

    const dispatch = useDispatch();

    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentPagesArray[currentGroup]); // номер текущей страницы

    const words = useSelector(state => state.words.items);
    const currentPagesArray = useSelector(state => state.app.currentPagesArray);

    useEffect(() => {

        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem('currentPagesArray'))
        lSPagesArray && dispatch(setCurrentPagesArray(lSPagesArray))

        // Записываем настройки букв из LS в store
        const lSWordSettings = JSON.parse(localStorage.getItem('wordSettings'))
        lSWordSettings && dispatch(setIsWordTranslated(lSWordSettings.isWordTranslated))
        lSWordSettings && dispatch(setIsWordButtonsShown(lSWordSettings.isWordButtonsShown))

    }, [dispatch]);


    useEffect(() => { // Загружаем слова

        dispatch(fetchWords({group: currentGroup, page: currentPage}));

    }, [dispatch, currentPage, currentGroup]);

    useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении

        localStorage.setItem('currentPagesArray', JSON.stringify(currentPagesArray))

    }, [currentPagesArray]);


    const handlePageClick = (e) => { // Обработка нажатия на кнопку пагинации

        dispatch(setCurrentPagesItem({
            currentGroup: currentGroup,
            currentPage: e.selected.toString()
        }));

    };

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

export default withRouter(WordsList)
