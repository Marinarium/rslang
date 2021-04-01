import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getDeletedWords} from '../../../redux/wordsReducer';
import {
    setCurrentDeletedPagesArray,
    setCurrentDeletedPagesItem,
} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';
import {usePageNumber} from '../../../hooks/pageNumberHook'


function DeletedWordsListContainer({match}) {
    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentDeletedPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.items);
    //const currentDeletedPagesArray = useSelector(state => state.app.currentDeletedPagesArray);
    const userId = useSelector(state => state.auth.userId);
    usePageNumber(
        'currentDeletedPagesArray',
        'currentDeletedPagesArray',
        setCurrentDeletedPagesArray
    );
    // useEffect(() => {
    //
    //     // Записываем массив текущих страниц из LS в store
    //     const lSPagesArray = JSON.parse(localStorage.getItem('currentDeletedPagesArray'))
    //     lSPagesArray && dispatch(setCurrentDeletedPagesArray(lSPagesArray))
    //
    //
    // }, [dispatch]);
    useEffect(() => { // Загружаем удаленные слова

        userId && dispatch(getDeletedWords({group: currentGroup, page: currentPage, userId}));

    }, [dispatch, userId, currentGroup, currentPage]);

    // useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении
    //
    //     localStorage.setItem('currentDeletedPagesArray', JSON.stringify(currentDeletedPagesArray));
    //
    // }, [currentDeletedPagesArray]);

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

