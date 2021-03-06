import React from "react";
import styles from './ChessStructure.module.scss';

export default function ChessStructure({contentItems, title, appereance }) {
    const content = contentItems.map(({img, id, title, text}) => {
        return (
            <div className={appereance === 'dev' ? `${styles.box} ${styles.dev}` : styles.box} key={id}>
                <img className={styles.image} src={img} alt={title}/>
                <div className={styles.text_wrap}>
                    <h4 className={styles.title}>{title}</h4>
                    <div className={styles.text}>
                        {text.map((paragraph) => {
                            return (
                                <p className={styles.p} key={paragraph}>{paragraph}</p>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={styles.wrap}>
            <h3 className={styles.section_title}>{title}</h3>
            {content}
        </div>
    );


}