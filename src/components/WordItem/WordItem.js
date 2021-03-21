import React from 'react';

import styles from './WordItem.module.scss';

export default function WordItem({word}) {
    return (
        <section>
            <h4>{word}</h4>
        </section>
    );
}
