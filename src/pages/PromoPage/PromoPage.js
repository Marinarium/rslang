import React from "react";

import styles from "./PromoPage.module.scss";
import MainTitle from "../../components/MainTitle/MainTitle";
import Tiles from "../../components/Tiles/Tiles";
import ChessStructure from "../../components/ChessStructure/ChessStructure";

export default function PromoPage() {
    const gamesInfo = [
        {
            id: 1,
            img: './images/savanna.png',
            title: 'Саванна',
            text: ['какой-то абзац', 'какой-то второй абзац']
        }
    ];

    return (
        <main className={styles.main}>
            <MainTitle text={'О приложении'}/>
            <Tiles/>
            <ChessStructure contentItems={gamesInfo}/>
        </main>
    );
}
