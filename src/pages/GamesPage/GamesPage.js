import React from "react";
import Games from "../../components/Games/Games";

import styles from "./GamesPage.module.scss";

export default function GamesPage({ location, match }) {
  return (
    <main className={styles.main}>
      <Games location={location} match={match} />
    </main>
  );
}
