import React from 'react';
import {Link} from "react-router-dom";

import styles from './UnitsList.module.scss'

export default function UnitsList() {
    const unitItems = [
        {name: '1 раздел', linkTo: '/1'},
        {name: '2 раздел', linkTo: '/2'},
        {name: '3 раздел', linkTo: '/3'},
        {name: '4 раздел', linkTo: '/4'},
        {name: '5 раздел', linkTo: '/5'},
        {name: '6 раздел', linkTo: '/6'}
    ];

    const units = unitItems.map(({name, linkTo}) => {
        return (
            <li className={styles.unit} key={linkTo}>
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
        <h2>Список слов — 3 раздел </h2>
        </>
    );
}
