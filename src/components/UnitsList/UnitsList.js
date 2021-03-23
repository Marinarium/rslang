import React from 'react';
import {Link} from "react-router-dom";

import styles from './UnitsList.module.scss'

export default function UnitsList() {
    const bgColors = {
        firsColor: '#1380EE',
        secondColor: '#6970EC',
        thirdColor: '#8D62D5',
        fourthColor: '#A353BD',
        fifthColor: '#E15CB2',
        sixthColor: '#B53C8A',
        accentColor: '#F13765'
    }

    const unitItems = [
        {name: '1 раздел', linkTo: '/text-book/1', color: bgColors.firsColor},
        {name: '2 раздел', linkTo: '/text-book/2', color: bgColors.secondColor},
        {name: '3 раздел', linkTo: '/text-book/3', color: bgColors.thirdColor},
        {name: '4 раздел', linkTo: '/text-book/4', color: bgColors.fourthColor},
        {name: '5 раздел', linkTo: '/text-book/5', color: bgColors.fifthColor},
        {name: '6 раздел', linkTo: '/text-book/6', color: bgColors.sixthColor}
    ];



    const units = unitItems.map(({name, linkTo, color}) => {
        return (
            <li className={styles.unit} key={linkTo}  style={{backgroundColor: `${color}`}}>
                <Link to={linkTo} className={styles.link}>
                    {name}
                </Link>
            </li>
        );
    });

    return (
        <>
        <ul className={styles.units}>
            {units}
        </ul>
        <h2 className={styles.title}>Список слов — <span className={styles.current_unit} style={{color: `${bgColors.thirdColor}`}}>3 раздел</span></h2>
        </>
    );
}
