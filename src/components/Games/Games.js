import React from "react";
import styles from "./Games.module.scss";
import Sprint from "./GamesList/Sprint/Sprint";
import Audiocall from "./GamesList/Audiocall/Audiocall";
import MakeAWord from "./GamesList/MakeAWord/MakeAWord";
import Savannah from "./GamesList/Savannah/Savannah";

export const gamesItems = [
    { name: "Спринт", linkTo: "games/sprint", page: <Sprint /> },
    { name: "Саванна", linkTo: "games/savannah", page: <Savannah /> },
    { name: "Аудиовызов", linkTo: "games/audiocall", page: <Audiocall /> },
    { name: "Составь слово", linkTo: "games/make-a-word", page: <MakeAWord /> },
  ];


export default function Games({ location, match, startGameHandler }) {
    const games = gamesItems.map(({ name, linkTo }) => {
        return (
            <li className={styles.item} key={name}>
                <div className={styles.link} onClick={() => startGameHandler(linkTo)}>
                    {name}
                </div>
            </li>
        );
    });

    let pages = games;

    return (
        <main className={styles.main}>
            <h3 className={styles.title}>Учись играя!</h3>
            <ul className={styles.list}>{pages}</ul>
        </main>
    );
}