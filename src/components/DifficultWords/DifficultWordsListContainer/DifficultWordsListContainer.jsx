import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDifficultWords} from '../../../redux/wordsReducer';
import {setCurrentDifficultPagesArray} from '../../../redux/appReducer';
import { setCurrentDifficultPagesItem} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';


function DifficultWordsListContainer({match}) {

    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentDifficultPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.items);
    const currentDifficultPagesArray = useSelector(state => state.app.currentDifficultPagesArray);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {

        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem('currentDifficultPagesArray'))
        lSPagesArray && dispatch(setCurrentDifficultPagesArray(lSPagesArray))


    }, [dispatch]);
    useEffect(() => { // Загружаем сложные слова

        userId && dispatch(getDifficultWords({group: currentGroup, page: currentPage, userId}));

    }, [dispatch, userId, currentGroup, currentPage]);

    useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении

        localStorage.setItem('currentDifficultPagesArray', JSON.stringify(currentDifficultPagesArray));

    }, [currentDifficultPagesArray]);

    const handlePageClick = (e) => { // Обработка нажатия на кнопку пагинации

        dispatch(setCurrentDifficultPagesItem({
            currentGroup: currentGroup,
            currentPage: e.selected.toString()
        }));

    };

    return (
        <WordsList
            container={'Difficult'}
            words={words}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            currentGroup={currentGroup}
        />
    );
}

export default withRouter(DifficultWordsListContainer);

