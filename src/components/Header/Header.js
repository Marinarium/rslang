import React from 'react';
import {Link} from 'react-router-dom'

import logo from "./images/logo.svg";
import styles from './Header.module.scss';

export default function Header() {
    const menuItems = [
        {name: 'Электронный учебник', linkTo: '/text-book'},
        {name: 'Словарь', linkTo: '/dictionary'},
        {name: 'Игры', linkTo: '/games'},
        {name: 'Статистика', linkTo: '/statistic'},
        {name: 'Настройки', linkTo: '/settings'},
        {name: 'Выход', linkTo: '/exit'}
    ];

    const menu = menuItems.map(({name, linkTo}) => {
        return (
            <li className={styles.item} key={name}>
                <Link to={linkTo} className={styles.link}>
                    {name}
                </Link>
            </li>
        );
    });

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="Logo RSLang" className={styles.logo} />
            </Link>
            <nav className={styles.menu}>
                <div className={styles.burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.list}>
                    {menu}
                </ul>
            </nav>
        </header>
    );
}
