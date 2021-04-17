import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDeletedWords} from '../../../redux/wordsReducer';
import {
    setCurrentDeletedPagesArray,
    setCurrentDeletedPagesItem,
} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';
import {useDictionaryPage} from '../../../hooks/dictionaryPageHook';


function DeletedWordsListContainer({match}) {
    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentDeletedPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.items);

    useDictionaryPage(
        'currentDeletedPagesArray',
        'currentDeletedPagesArray',
        setCurrentDeletedPagesArray,
        getDeletedWords,
        setCurrentDeletedPagesItem,
        match
    );

    const handlePageClick = (e) => { // Обработка нажатия на кнопку пагинации
        dispatch(setCurrentDeletedPagesItem({
            currentGroup: currentGroup,
            currentPage: e.selected.toString()
        }));
    };

    return (
        <WordsList
            container={'Deleted'}
            words={words}
            handlePageClick={handlePageClick}
            currentPage={currentPage}
            currentGroup={currentGroup}
        />
    );
}

export default withRouter(DeletedWordsListContainer);

