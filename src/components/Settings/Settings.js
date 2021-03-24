
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsWordTranslated, setIsWordButtonsShown} from '../../redux/appReducer';

export default function Settings() {
    const dispatch = useDispatch();
    const isWordTranslated = useSelector(state => state.app.isWordTranslated);
    const isWordButtonsShown = useSelector(state => state.app.isWordButtonsShown);
    const checkHandler = (event) => {
        event.target.name === 'translation' && dispatch(setIsWordTranslated(!isWordTranslated));
        event.target.name === 'actionButtons' && dispatch(setIsWordButtonsShown(!isWordButtonsShown));

    }
    useEffect(() => {

        localStorage.setItem('wordSettings', JSON.stringify({isWordTranslated, isWordButtonsShown}));

    }, [isWordTranslated, isWordButtonsShown]);

    return (
        <>
            <h2>Настройки</h2>
            Показывать перевод?
            <input
                type="checkbox"
                name='translation'
                defaultChecked={isWordTranslated}
                onChange={checkHandler}
            />
            <br/>
            Показывать кнопки "Сложные слова" и "Удалённые слова"?
            <input
                type="checkbox"
                name='actionButtons'
                defaultChecked={isWordButtonsShown}
                onChange={checkHandler}
            />
        </>
    );
}
