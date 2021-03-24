import React from 'react';
import styles from './WordItem.module.scss';
import speaker from './images/speaker.svg'
import {playAudios} from '../../services/utils/playAudio'

export default function WordItem({
                                     word,
                                     image,
                                     audio,
                                     audioMeaning,
                                     audioExample,
                                     textMeaning,
                                     textMeaningTranslate,
                                     transcription,
                                     textExample,
                                     textExampleTranslate,
                                     wordTranslate
                                 }) {

    const playHandler = () => {
        playAudios(audio, audioMeaning, audioExample);
    };

    return (

        <section className={styles.card}>
            <header className={styles.head}>7/3</header>
            <main className={styles.main}>
                <div className={styles.main_info}>
                    <img src={image} alt={word} className={styles.image}/>
                    <div className={styles.about_word}>
                        <img src={speaker} alt="audio" className={styles.speaker} onClick={playHandler}/>
                        <h4 className={styles.word}>{word}</h4>
                        <span className={styles.transcription}>{transcription}</span>
                        <span className={styles.translation}>{wordTranslate}</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.meaning}>
                        <p className={styles.meaning_eng}>{textMeaning}</p>
                        <p className={styles.meaning_ru}>{textMeaningTranslate}</p>
                    </div>
                    <div className={styles.example}>
                        <p className={styles.example_eng}>{textExample}</p>
                        <p className={styles.example_ru}>{textExampleTranslate}</p>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} type="button">В сложные слова</button>
                    <button className={`${styles.button} ${styles.button_empty}`} type="button">В удалённые слова
                    </button>
                </div>
            </main>
        </section>
    );
}
