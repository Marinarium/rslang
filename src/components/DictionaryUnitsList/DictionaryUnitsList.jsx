import React, {useEffect} from 'react';
import {Link, withRouter, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setActiveDictionaryUnit} from '../../redux/dictionaryReducer';

import styles from './DictionaryUnitsList.module.scss';

const DictionaryUnitsList = () => {

    const dictionaryItems = [
        {name: 'Изучаемые слова', unit: 'learned'},
        {name: 'Сложные слова', unit: 'difficult'},
        {name: 'Удалённые Слова', unit: 'deleted'}
    ];

    const dispatch = useDispatch();

    const {pathname} = useLocation();
    const activeDictionaryUnit = dictionaryItems.find(i => pathname.includes(i.unit)) || dictionaryItems[0];

    useEffect(() => {
        dispatch(setActiveDictionaryUnit(activeDictionaryUnit));
    }, [activeDictionaryUnit, dispatch]);

    const units = dictionaryItems.map(({name, unit}) => {
        return (
            <li className={styles.unit} key={unit}>
                <Link to={`/dictionary/${unit}/1`} className={styles.link}>
                    {name}
                </Link>
            </li>
        );
    });

    return (
        <div>
            <>
                <ul className={styles.units}>
                    {units}
                </ul>
                <h2 className={styles.title}>Список слов —&nbsp;
                    <span className={styles.current_unit}>{activeDictionaryUnit.name}</span>
                </h2>
            </>
        </div>
    )
};

export default withRouter(DictionaryUnitsList);
