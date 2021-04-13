import React from 'react';
import Dictionary from '../../components/Dictionary/Dictionary';
import styles from './DictionaryPage.module.scss';

export default function DictionaryPage() {

    return (
        <main className={styles.main}>
            <Dictionary/>
        </main>
    );
}
