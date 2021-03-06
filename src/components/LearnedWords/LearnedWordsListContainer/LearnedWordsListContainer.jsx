import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getLearnedWords} from '../../../redux/wordsReducer';
import {
    setCurrentLearnedPagesItem,
    setCurrentLearnedPagesArray,
} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';
import {useDictionaryPage} from '../../../hooks/dictionaryPageHook';


function LearnedWordsListContainer({match}) {

    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentLearnedPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.items);
    useDictionaryPage(
        'currentLearnedPagesArray',
        'currentLearnedPagesArray',
        setCurrentLearnedPagesArray,
        getLearnedWords,
        setCurrentLearnedPagesItem,
        match
    );

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

