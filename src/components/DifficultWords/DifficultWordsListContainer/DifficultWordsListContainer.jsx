import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAllUserAggregatedWords} from '../../../redux/wordsReducer';
import {setCurrentPagesArray, setIsWordButtonsShown, setIsWordTranslated} from '../../../redux/appReducer';
import {setCurrentPagesItem} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList';


function DifficultWordsListContainer({match}) {

    const dispatch = useDispatch();
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app.currentPagesArray[currentGroup]); // номер текущей страницы
    const words = useSelector(state => state.words.userItems);
    const currentPagesArray = useSelector(state => state.app.currentPagesArray);
    const userId = useSelector(state => state.auth.userId);


    useEffect(() => { // Загружаем сложные слова

        userId && dispatch(getAllUserAggregatedWords(userId));

    }, [dispatch, userId]);



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

export default withRouter(DifficultWordsListContainer)

