import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import logo from "./images/logo.svg";
import styles from './Header.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, setIsAuthenticated} from '../../redux/authReducer';
import {baseUrl} from '../../services/baseUrl/baseUrl';

export default function Header() {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const avatar = useSelector(state => state.auth.avatar);
    const name = useSelector(state => state.auth.name);
    const menuItems = [
        {name: 'Электронный учебник', linkTo: '/text-book/1'},
        {name: 'Словарь', linkTo: '/dictionary'},
        {name: 'Игры', linkTo: '/games'},
        {name: 'Статистика', linkTo: '/statistic'},
        {name: 'Настройки', linkTo: '/settings'},
        {name: 'Выход', linkTo: '/'},
        {name: 'Вход', linkTo: '/login'},
        {name: 'Зарегистрироваться', linkTo: '/register'}
    ];

    useEffect(() => {
        const localStorageAuthData = JSON.parse(localStorage.getItem('userData'));
        localStorageAuthData && dispatch(setIsAuthenticated(localStorageAuthData));
    }, [dispatch]);


    const [menuState, setMenu] = useState(false);


    const logoutHandler = () => {
        dispatch(authLogout());
        localStorage.removeItem('userData');
    };

    const showMenu = () => {
        document.body.classList.toggle('overflow-hidden');
        setMenu(!menuState);
    };
    const removeMenuItem = (item, count) => {
        return menuItems.splice(menuItems.indexOf(menuItems.find(i => i.name === item)), count);
    };

    if (!isAuthenticated)  {
        removeMenuItem('Выход', 1);
        removeMenuItem('Статистика', 1);
        removeMenuItem('Словарь', 1);
    } else {
        removeMenuItem('Вход', 2);
    }

    const menu = menuItems.map(({name, linkTo}) => {
        return (
            <li className={styles.item} key={name}>
                {
                    (name === 'Выход')
                        ? <Link to={linkTo} className={styles.link} onClick={logoutHandler}>
                            {name}
                        </Link>
                        :
                        <Link to={linkTo} className={styles.link} onClick={menuState && showMenu}>
                            {name}
                        </Link>
                }
            </li>
        );
    });

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} alt="Logo RSLang" className={styles.logo}/>
            </Link>
            <nav className={styles.menu}>
                <div className={!menuState ? `${styles.burger}` : `${styles.burger} ${styles.active}`}
                     onClick={showMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={!menuState ? `${styles.list}` : `${styles.list} ${styles.active}`}>
                    {menu}
                </ul>
            </nav>
            {isAuthenticated &&
            <div className={styles.profinfo}>
                {avatar && <div className={styles.avatar}><img src={baseUrl + avatar} alt={'avatar'}/></div>}
                <div className={styles.name}>{name}</div>
            </div>
            }

        </header>
    );
}
