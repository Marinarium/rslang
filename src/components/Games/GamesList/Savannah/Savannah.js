import React, { useState, useEffect, useRef } from "react";
import styles from "./Savannah.module.scss";
import { Link } from "react-router-dom";
import crystal from "./images/crystal.svg";

export default function Savannah() {
  const [health, setHealth] = useState(5);
  const [activeWord, setActiveWord] = useState(0);
  const [moveWord, setMoveWord] = useState(0);
  const [numberWords, setNumberWords] = useState(15);
  const [arrWords, setArrWords] = useState([]);
  const [randomWords, setRandomWords] = useState([]);
  const [seconds, setSeconds] = useState(3);

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
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      setMoveWord(moveWord + 7);
    }
    if (moveWord > 60) {
      setMoveWord(-15);
      setHealth(health - 1);
      setActiveWord(activeWord + 1);
    }
  }, 1000);

  const clickButtonChoise = (el) => {
    if (!el[1]) {
      setHealth(health - 1);
    }
    setMoveWord(-15);
    setActiveWord(activeWord + 1);
  };

  console.log(Object.keys(randomWords).length);

  let hp = [];
  for (let i = 0; i < 5; i++) {
    hp.push(
      <div>
        {health > i ? (
          <img src="https://img.icons8.com/android/32/fa314a/hearts.png" />
        ) : (
          <img src="https://img.icons8.com/ios/32/fa314a/hearts--v1.png" />
        )}
      </div>
    );
  }

  return Object.keys(randomWords).length !== 0 ? (
    <div className={styles.savannah}>
      {seconds === 0 ? (
        health > 0 && activeWord < Object.keys(randomWords).length ? (
          <>
            <div className={styles.moveWord} style={{ top: `${moveWord}vh` }}>
              {Object.keys(randomWords)[activeWord]}
            </div>
            <div className={styles.top}>
              <div className={styles.top__health}>{hp}</div>
              <div className={styles.top__exit}>
                <Link to="/games">
                  <img src="https://img.icons8.com/plasticine/48/000000/close-window.png" />
                </Link>
              </div>
            </div>
            <div className={styles.center}>
              {randomWords[Object.keys(randomWords)[activeWord]].map((el) => {
                return (
                  <div
                    className={styles.button__choise}
                    onClick={() => clickButtonChoise(el)}
                  >
                    {el[0]}
                  </div>
                );
              })}
            </div>
            <div className={styles.bottom}>
              <img src={crystal} />
            </div>
          </>
        ) : (
          <h1>123</h1>
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
