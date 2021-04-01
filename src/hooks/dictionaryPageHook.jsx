import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


export const useDictionaryPage = (pagesArray, storageName, setArray, getWords, setItem, match) => {

    const dispatch = useDispatch();
    const currentPagesArray = useSelector(state => state.app[pagesArray]);
    const currentGroup = match.params.unit - 1; // номер текущей группы
    const currentPage = useSelector(state => state.app[pagesArray][currentGroup]); // номер текущей страницы
    const userId = useSelector(state => state.auth.userId);
    useEffect(() => {
        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem(storageName))
        lSPagesArray && dispatch(setArray(lSPagesArray))

    }, [dispatch]);

    useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении

        localStorage.setItem(storageName, JSON.stringify(currentPagesArray));

    }, [currentPagesArray]);

    useEffect(() => { // Загружаем сложные слова

        userId && dispatch(getWords({group: currentGroup, page: currentPage, userId}));

    }, [dispatch, userId, currentGroup, currentPage]);



}
