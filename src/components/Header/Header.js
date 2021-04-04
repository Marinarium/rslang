import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import logo from "./images/logo.svg";
import styles from './Header.module.scss';
import {useDispatch} from 'react-redux'
import {setIsAuthenticated} from '../../redux/authReducer'

export default function Header() {

    const menuItems = [
        {name: 'Электронный учебник', linkTo: '/text-book/1'},
        {name: 'Словарь', linkTo: '/dictionary'},
        {name: 'Игры', linkTo: '/games'},
        {name: 'Статистика', linkTo: '/statistic'},
        {name: 'Настройки', linkTo: '/settings'},
        {name: 'Выход', linkTo: '/exit'}
    ];
    const dispatch = useDispatch()

    //авторизация из LocalStorage. Потом перенесём в другое место (наверное)

    useEffect(() => {
        const localStorageAuthData = JSON.parse(localStorage.getItem('userData') )
        localStorageAuthData && dispatch(setIsAuthenticated(localStorageAuthData))
    }, [dispatch])

    const [menuState, setMenu] = useState(false);

    const changeOverflow = () => {
        menuState ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    };

    const showMenu = () => {
        document.body.classList.toggle('overflow-hidden');
        setMenu(!menuState);
    };

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
                <div className={!menuState ? `${styles.burger}` : `${styles.burger} ${styles.active}`} onClick={showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={!menuState ? `${styles.list}` : `${styles.list} ${styles.active}`}>
                    {menu}
                </ul>
            </nav>
        </header>
    );
}
