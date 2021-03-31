import React from "react";

import styles from "./PromoPage.module.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Tiles from "../../components/Tiles/Tiles";
import ChessStructure from "../../components/ChessStructure/ChessStructure";
import Video from "../../components/Video/Video";

export default function PromoPage() {
    const gamesInfo = [
        {
            id: 1,
            img: './images/savanna.png',
            title: 'Саванна',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 2,
            img: './images/savanna.png',
            title: 'Саванна',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 3,
            img: './images/savanna.png',
            title: 'Саванна',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 4,
            img: './images/savanna.png',
            title: 'Саванна',
            text: ['какой-то абзац', 'какой-то второй абзац']
        }
    ];

    const devInfo = [
        {
            id: 1,
            img: './images/alina.jpg',
            title: 'Алина Иванова',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 2,
            img: './images/marina.jpg',
            title: 'Марина Швабауэр',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 3,
            img: './images/savanna.png',
            title: 'Евгений',
            text: ['какой-то абзац', 'какой-то второй абзац']
        },
        {
            id: 4,
            img: './images/roman.jpg',
            title: 'Роман Круглянский',
            text: ['какой-то абзац', 'какой-то второй абзац']
        }
    ];

    return (
        <main className={styles.main}>
            <MainTitle text={'О приложении'}/>
            <Tiles/>
            <ChessStructure contentItems={gamesInfo} title={'Описание игр'}/>
            <Video/>
            <ChessStructure contentItems={devInfo} title={'О команде'}/>
        </main>
    );
}
