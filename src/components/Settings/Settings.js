import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsWordTranslated, setIsWordButtonsShown} from '../../redux/appReducer';

import styles from './Settings.module.scss'
import MainTitle from "../MainTitle/MainTitle";

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
            <div className={styles.wrap}>
                <MainTitle text={'Настройки'}/>
                <label htmlFor='translation' className={styles.label}>
                    Показывать перевод:</label>
                <input
                    id='translation'
                    type="checkbox"
                    name='translation'
                    defaultChecked={isWordTranslated}
                    onChange={checkHandler}
                    className={styles.input}
                />
            </div>
            <div className={styles.wrap}>
                <label htmlFor='buttons' className={styles.label}>
                    Показывать кнопки "Сложные слова" и "Удалённые слова":</label>
                <input
                    id='buttons'
                    type="checkbox"
                    name='actionButtons'
                    defaultChecked={isWordButtonsShown}
                    onChange={checkHandler}
                    className={styles.input}
                />
            </div>
        </>
    );
}
