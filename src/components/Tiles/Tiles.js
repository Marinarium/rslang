import React from "react";

import styles from "./Tiles.module.scss"

export default function Tiles() {

    const tileItems = [
        {
            img: './images/book.svg',
            id: 1,
            title: 'Доступность',
            text: 'приложение доступно кажому желающему, просто зарегистрируетесь:)'
        },
        {
            img: './images/puzzle.svg',
            id: 2,
            title: 'Интерактивность',
            text: 'интерактивные и отзывчивые элементы, анимации и звуки - позволят полностью погрузиться в изучение'
        },
        {
            img: './images/chromatic.svg',
            id: 3,
            title: 'Красочность',
            text: 'яркий, но не навязчивый дизайн не даст вам заскучать и сделает нужные акценты на важном'
        },
        {
            img: './images/crown.svg',
            id: 4,
            title: 'Индивидуальность',
            text: 'после регитрации у вас будет свой собственный словарь и статистика, которые помгут следить за прогрессом'
        }
    ];

    const tiles = tileItems.map(({img, id, title, text}) => {
        return (
            <li className={styles.tile} key={id}>
                <img className={styles.image} src={img} alt={title}/>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.text}>{text}</p>
            </li>
        );
    });


    return (
        <ul className={styles.tiles}>
            {tiles}
        </ul>
    );
}
