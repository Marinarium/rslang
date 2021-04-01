import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const usePageNumber = (pagesArray, storageName, setArray) => {

    const dispatch = useDispatch();

    const currentPagesArray = useSelector(state => state.app[pagesArray]);

    useEffect(() => {
        // Записываем массив текущих страниц из LS в store
        const lSPagesArray = JSON.parse(localStorage.getItem(storageName))
        lSPagesArray && dispatch(setArray(lSPagesArray))

    }, [dispatch]);

    useEffect(() => { // Переписываем массив текущих страниц в LS при его изменении

        localStorage.setItem(storageName, JSON.stringify(currentPagesArray));

    }, [currentPagesArray]);
}
