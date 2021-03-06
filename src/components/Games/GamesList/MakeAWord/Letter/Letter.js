import React, {useEffect, useState} from 'react';
import styles from "../Letter/Letter.module.scss";

export default function Letter({letter, correctLettersArr,
                                   setCorrectLettersArr, concatenate,
                                   endWord, totalDone, setTotalDone,
                                   setWordComplete, setWordLoose,
                                   setTrueCount, goodCount, isAuthenticated,
                                   userId, currentWordId, words, token}) {

    const [done, setDone] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const classes = [styles.btn_letter];

    useEffect(() => {
        totalDone && setDone(false)
    }, [totalDone]);

    if (done) {
        classes.push(styles.done)
    }

    if (incorrect) {
        classes.push(styles.incorrect)
    }

    function checkDone(el) {

        if (el === correctLettersArr[0]) {
            setDone(() => true);
            concatenate(el);
            setCorrectLettersArr((wordArr) => wordArr.slice(1));
            if (correctLettersArr.length === 1) {
                endWord();
                setWordComplete(() => true);
                setWordLoose(() => true);
                setTrueCount((prev) => prev + 1);
                isAuthenticated && goodCount(userId, currentWordId, words, token);
            }
        } else showIncorrect();
        setTotalDone(false);
    }

    function showIncorrect() {
        setIncorrect(() => true);
        setTimeout(() => {
            setIncorrect(() => false);
        }, 250)
    }

    return (
        <button
            className={classes.join(' ')}
            onClick={() => checkDone(letter)}
        >
            {letter}
        </button>
    )
}
