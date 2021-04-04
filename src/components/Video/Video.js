import React from "react";

import styles from "./Video.module.scss"

export default function Video() {
    return (
        <section className={styles.video}>
            <h3 className={styles.title}>Демонстрация работы приложения</h3>
            <div>
                <video className={styles.player} width="320" height="240" controls>
                    <source
                        src={`video/france.mp4`}
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                    />
                </video>
            </div>
        </section>
    );
}