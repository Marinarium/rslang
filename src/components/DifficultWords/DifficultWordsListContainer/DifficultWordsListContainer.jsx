import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDifficultWords} from '../../../redux/wordsReducer';
import {setCurrentDifficultPagesArray, setCurrentDifficultPagesItem} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';
import {useDictionaryPage} from '../../../hooks/dictionaryPageHook';



function DifficultWordsListContainer({match}) {

    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentDifficultPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.items);

    useDictionaryPage(
        'currentDifficultPagesArray',
        'currentDifficultPagesArray',
        setCurrentDifficultPagesArray,
        getDifficultWords,
        setCurrentDifficultPagesItem,
        match
        );

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

