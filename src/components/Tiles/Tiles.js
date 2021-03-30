import React from "react";

import styles from "./Tiles.module.scss"

export default function Tiles() {

    const tileItems = [
        {
            img: './images/book.svg',
            id: 1,
            title: 'Доступность',
            text: 'состояние информации, при котором субъекты, имеющие права доступа, могут реализовывать их беспрепятственно'
        },
        {
            img: './images/puzzle.svg',
            id: 2,
            title: 'Интерактивность',
            text: 'состояние информации, при котором субъекты, имеющие права доступа, могут реализовывать их беспрепятственно'
        },
        {
            img: './images/chromatic.svg',
            id: 3,
            title: 'Красочность',
            text: 'состояние информации, при котором субъекты, имеющие права доступа, могут реализовывать их беспрепятственно'
        },
        {
            img: './images/crown.svg',
            id: 4,
            title: 'Индивидуальность',
            text: 'состояние информации, при котором субъекты, имеющие права доступа, могут реализовывать их беспрепятственно'
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
