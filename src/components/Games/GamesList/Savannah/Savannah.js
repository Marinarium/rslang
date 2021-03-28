import React, { useState, useEffect, useRef } from "react";
import styles from "./Savannah.module.scss";
import { Link } from "react-router-dom";
import crystal from "./images/crystal.svg";

const SPEED_WORD = 4;
const LIMIT_WORD = 60;
const RETURN_START_WORD = -20;

export default function Savannah() {
  const [health, setHealth] = useState(5);
  const [activeWord, setActiveWord] = useState(0);
  const [moveWord, setMoveWord] = useState(0);
  const [numberWords, setNumberWords] = useState(15);
  const [arrWords, setArrWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [seconds, setSeconds] = useState(5);
  const [trueAnswer, setTrueAnswer] = useState(0);
  const [newWord, setNewWord] = useState(false);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useEffect(() => {
    fetch("https://react-lang-app.herokuapp.com/words")
      .then((data) => data.json())
      .then((data) => {
        setArrWords(data);
        return data;
      });
  }, []);

  useEffect(() => {
    setRandomWords(
      arrWords
        .sort(() => Math.random() - 0.5)
        .reduce((result, el) => {
          result[el.word] = [
            [el.wordTranslate, true],
            ...arrWords
              .sort(() => 0.5 - Math.random())
              .filter((elF) => elF.word !== el.word)
              .slice(0, 3)
              .map((el) => {
                return [el.wordTranslate, false];
              }),
          ].sort(() => Math.random() - 0.5);

          return result;
        }, {})
    );
  }, [arrWords]);

  useInterval(() => {
    if (seconds <= 0) {
      setMoveWord(moveWord + SPEED_WORD);
    }
    if (moveWord > LIMIT_WORD) {
      setMoveWord(RETURN_START_WORD);
      setHealth(health - 1);
      setNewWord(true);
      setTimeout(() => {
        setActiveWord(activeWord + 1);
      }, 500);
      setTimeout(() => {
        setNewWord(false);
        setActiveWord(activeWord + 1);
      }, 1000);
    }
  }, 500);

		useInterval(() => {
    if (seconds > 0) {
      if (Object.keys(randomWords).length !== 0) {
        setSeconds(seconds - 1);
      }
    }
  }, 1000);

  const clickButtonChoise = (el) => {
    if (!el[1]) {
      setHealth(health - 1);
    } else {
      setTrueAnswer(trueAnswer + 1);
    }
    setNewWord(true);
    setMoveWord(RETURN_START_WORD);
    setTimeout(() => {
      setActiveWord(activeWord + 1);
    }, 500);
    setTimeout(() => {
      setNewWord(false);
    }, 1000);
  };

  let hp = [];
  for (let i = 0; i < 5; i++) {
    hp.push(
      <div>
        {health > i ? (
          <img src="https://img.icons8.com/android/32/fa314a/hearts.png"  alt=''/>
        ) : (
          <img src="https://img.icons8.com/ios/32/fa314a/hearts--v1.png"  alt=''/>
        )}
      </div>
    );
  }

  const startNewGame = () => {
    setHealth(5);
    setActiveWord(0);
    setMoveWord(0);
    setNumberWords(15);
    setSeconds(5);
    setTrueAnswer(0);
  };

  return Object.keys(randomWords).length !== 0 ? (
    <div className={styles.savannah}>
      {seconds === 0 ? (
        health > 0 && activeWord < Object.keys(randomWords).length ? (
          <>
            <div className={styles.moveWord} style={{ top: `${moveWord}vh`, transform: newWord ? "scale(0)" : "scale(1)" }}>
              {Object.keys(randomWords)[activeWord]}
            </div>
            <div className={styles.top}>
              <div className={styles.top__health}>{hp}</div>
              <div className={styles.top__exit}>
                <Link to="/games">
                  <img src="https://img.icons8.com/plasticine/48/000000/close-window.png"  alt=''/>
                </Link>
              </div>
            </div>
            <div className={styles.center}>
              {randomWords[Object.keys(randomWords)[activeWord]].map((el) => {
                return (
                  <div
                    style={{ transform: newWord ? "scale(0)" : "scale(1)" }}
                    key={el[0]}
                    className={styles.button__choise}
                    onClick={() => clickButtonChoise(el)}
                  >
                    {el[0]}
                  </div>
                );
              })}
            </div>
            <div className={styles.bottom}>
              <img src={crystal}  alt=''/>
            </div>
          </>
        ) : (
          <div className={styles.endGame}>
            <div className={styles.endGame_body}>
              <div className={styles.endGame_body_top}>
                <h1>Круто,отличный результат!</h1>
                <h3>
                  {trueAnswer} слов изучено,
                  {Object.keys(randomWords).length - trueAnswer} на изучении
                </h3>
              </div>
              <div className={styles.endGame_body_center}>
                <div className={styles.endGame_body_circle}>
                  <div className={styles.endGame_body_info}>
                    <p>
                      {Math.floor(
                        (100 / Object.keys(randomWords).length) * trueAnswer
                      )}
                      %
                    </p>
                    <p>Правильных ответов</p>
                  </div>
                </div>
              </div>
              <div className={styles.endGame_body_bottom}>
                <button>
                  <Link to="/games">К списку тренировок</Link>
                </button>
                <button onClick={startNewGame}>Повторить тренировку</button>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className={styles.timer}>
          <h1>{seconds}</h1>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
