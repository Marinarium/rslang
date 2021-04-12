import React from 'react';
import TextBook from "../../components/TextBook/TextBook";
import Games from "../../components/Games/Games";

import styles from './TextBookPage.module.scss';

export default function TextBookPage() {
    return (
        <main className={styles.main}>
            <TextBook/>
        </main>
    );
}
