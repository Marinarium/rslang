import React from "react";
import { Link } from "react-router-dom";
import styles from "./Games.module.scss";
import Sprint from "./GamesList/Sprint/Spint";
import Audiocall from "./GamesList/Audiocall/Audiocall";
import Listening from "./GamesList/Listening/Listening";
import Savannah from "./GamesList/Savannah/Savannah";

export const gamesItems = [
  { name: "Спринт", linkTo: "games/sprint", page: <Sprint /> },
  { name: "Саванна", linkTo: "games/savannah", page: <Savannah /> },
  { name: "Аудиовызов", linkTo: "games/audiocall", page: <Audiocall /> },
  { name: "Аудирование", linkTo: "games/listening", page: <Listening /> },
];

export default function Games({ location, match }) {


  const games = gamesItems.map(({ name, linkTo }) => {
    return (
      <li className={styles.item} key={name}>
        <Link to={linkTo} className={styles.link}>
          {name}
        </Link>
      </li>
    );
  });

  let pages = games;

  switch (location.pathname) {
    case "/games":
      pages = games;
      break;
    case `/${gamesItems[0].linkTo}`:
      pages = gamesItems[0].page;
      break;
    case `/${gamesItems[1].linkTo}`:
      pages = gamesItems[1].page;
      break;
    case `/${gamesItems[2].linkTo}`:
      pages = gamesItems[2].page;
      break;
    case `/${gamesItems[3].linkTo}`:
      pages = gamesItems[3].page;
      break;
    default:
      pages = <h1>Не найдено</h1>;
  }

  return <main className={styles.main}>{pages}</main>;
}
