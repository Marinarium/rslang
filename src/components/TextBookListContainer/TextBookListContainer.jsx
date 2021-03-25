import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchWords} from '../../redux/wordsReducer';
import {setCurrentPagesArray, setIsWordButtonsShown, setIsWordTranslated} from '../../redux/appReducer';
import {setCurrentPagesItem} from '../../redux/appReducer';
import {WordsList} from '../WordsList/WordsList'


function TextBookListContainer({match}) {

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

    return (
        <WordsList words={words} handlePageClick={handlePageClick} currentPage={currentPage}/>
    );
}

export default withRouter(TextBookListContainer)

