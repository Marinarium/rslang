import React, {useEffect} from 'react';
import styles from '../UnitsList/UnitsList.module.scss';
import {Link, withRouter, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setActiveDictionaryUnit} from '../../redux/dictionaryReducer';
import DifficultWords from '../DifficultWords/DifficultWords'
import LearnedWords from '../LearnedWords/LearnedWords'
import DeletedWords from '../DeletedWords/DeletedWords'

const DictionaryUnitsList = () => {
    const dictionaryItems = [
        {name: 'Изучаемые слова', linkTo: '/dictionary/learned'},
        {name: 'Сложные слова', linkTo: '/dictionary/difficult'},
        {name: 'Удалённые Слова', linkTo: '/dictionary/deleted'}
    ];
    const {pathname} = useLocation();
    const activeDictionaryUnit = dictionaryItems.find(i =>pathname.includes(i.linkTo)) || dictionaryItems[0];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveDictionaryUnit(activeDictionaryUnit));
    }, [activeDictionaryUnit, dispatch])

    const units = dictionaryItems.map(({name, linkTo}) => {
        return (
            <li className={''} key={linkTo}>
                <Link to={linkTo} className={''}>
                    {name}
                </Link>
            </li>
        );
    });
    return (
        <div>
            <>
                <ul className={''}>
                    {units}
                </ul>
                <h2 className={''}>Список слов —&nbsp;
                    <span className={styles.current_unit}>{activeDictionaryUnit.name}</span>
                </h2>
            </>
        </div>
    )
};

export default withRouter(DictionaryUnitsList)
