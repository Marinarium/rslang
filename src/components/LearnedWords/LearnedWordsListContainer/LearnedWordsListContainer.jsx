import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDeletedWords, getLearnedWords} from '../../../redux/wordsReducer';
import {
    setCurrentLearnedPagesItem, setCurrentLearnedPagesArray,
} from '../../../redux/appReducer';

import {WordsList} from '../../WordsList/WordsList'


function LearnedWordsListContainer({match}) {
    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentLearnedPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.userItems);
    const currentLearnedPagesArray = useSelector(state => state.app.currentLearnedPagesArray);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {

        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem('currentLearnedPagesArray'))
        lSPagesArray && dispatch(setCurrentLearnedPagesArray(lSPagesArray))


    }, [dispatch]);
    useEffect(() => { // Загружаем изучаемые слова

        userId && dispatch(getLearnedWords({group: currentGroup, page: currentPage, userId}));

    }, [dispatch, userId, currentGroup, currentPage]);

    useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении

        localStorage.setItem('currentLearnedPagesArray', JSON.stringify(currentLearnedPagesArray));

    }, [currentLearnedPagesArray]);

    const handlePageClick = (e) => { // Обработка нажатия на кнопку пагинации

        dispatch(setCurrentLearnedPagesItem({
            currentGroup: currentGroup,
            currentPage: e.selected.toString()
        }));

    };

    return (
        <WordsList
            container={'Learned'}
            words={words}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            currentGroup={currentGroup}
        />
    );
}

export default withRouter(LearnedWordsListContainer);

