import React from 'react';
import Settings from "../../components/Settings/Settings";

import styles from "./SettingsPage.module.scss";

export default function SettingsPage() {
    return (
        <main className={styles.main}>
            <Settings/>
        </main>
    );
}
