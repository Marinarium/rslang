import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchWords, getAllUserWordsWithoutDeletedWords} from '../../redux/wordsReducer';
import {setCurrentPagesArray, setIsWordButtonsShown, setIsWordTranslated} from '../../redux/appReducer';
import {setCurrentPagesItem} from '../../redux/appReducer';
import {WordsList} from '../WordsList/WordsList';


function TextBookListContainer({location, match}) {

    const dispatch = useDispatch();

    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentPagesArray[currentGroup]); // номер текущей страницы
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const words = useSelector(state => state.words.items);
    const currentPagesArray = useSelector(state => state.app.currentPagesArray);
    useEffect(() => {
        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem('currentPagesArray'));
        lSPagesArray && dispatch(setCurrentPagesArray(lSPagesArray));
        // Записываем настройки букв из LS в store
        const lSWordSettings = JSON.parse(localStorage.getItem('wordSettings'));
        lSWordSettings && dispatch(setIsWordTranslated(lSWordSettings.isWordTranslated));
        lSWordSettings && dispatch(setIsWordButtonsShown(lSWordSettings.isWordButtonsShown))

    }, [dispatch]);

    useEffect(() => { // Загружаем слова
        !userId && dispatch(fetchWords({group: currentGroup, page: currentPage}));
        userId && dispatch(getAllUserWordsWithoutDeletedWords({group: currentGroup, page: currentPage, userId, token}));
    }, [dispatch, userId,  currentGroup, currentPage, token]);

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

         <WordsList
            location={location}
            match={match}
            container={'text-book'}
            words={words}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            currentGroup={currentGroup}
        />
    );
}

export default withRouter(TextBookListContainer);

