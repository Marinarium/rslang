import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useGameData} from "../../../../hooks/gameDataHook";
import {textToHtml} from '../../../../helpers.js'
import {useInterval} from '../../../../helpers.js'
import styles from "./MakeAWord.module.scss";
import {useHistory} from 'react-router-dom';
import Letter from "./Letter/Letter";
import InputWord from "./InputWord/InputWord";
import ModalFinish from "../../ModalFinish/ModalFinish";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";
import ExitBtn from "../../ExitBtn/ExitBtn";
import {putStatistics} from "../../../../redux/statReducer";

export default function MakeAWord() {
    const [arrWords, setArrWords] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [answer, setAnswer] = useState('');
    const [gameWord, setGameWord] = useState([]);
    const [correctLettersArr, setCorrectLettersArr] = useState([]);
    const [gameWordTranslate, setGameWordTranslate] = useState('');
    const [gameWordDescription, setGameWordDescription] = useState('');
    const [gameWordTranscription, setGameWordTranscription] = useState('');
    const [wordComplete, setWordComplete] = useState(false);
    const [wordLoose, setWordLoose] = useState(false);
    const [gameActive, setGameActive] = useState(false);
    const [totalDone, setTotalDone] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [trueCount, setTrueCount] = useState(0);
    const [seconds, setSeconds] = useState(5);
    const [currentWord, setCurrentWord] = useState('');
    const { goodCount, badCount } = useGameData();
    const words = useSelector((state) => state.words.items);
    const gamesCount = useSelector((state) => state.stat.gamesCount);
    const userId = useSelector((state) => state.auth.userId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const token = useSelector(state => state.auth.token);
    const [currentWordId, setCurrentWordId] = useState('');
    const [randomWords, setRandomWords] = useState([]);
    const [activeWord, setActiveWord] = useState(0);

    useInterval(() => {
        if (seconds > 0) {
            setSeconds((prev) => prev - 1);
            startGame();
        }
    }, 1000);

    useEffect(() => {
        setArrWords(() => [...words])
    }, [words]);

    useEffect(() => {
        const activeWordObj = words.find(i => i.word === currentWord.word);
        activeWordObj && setCurrentWordId(activeWordObj.id)
    }, [words, activeWord, currentWord]);

    useEffect(() => {
        setRandomWords(() => arrWords.sort(() => 0.5 - Math.random()));
        // setRandomWords(() => arrWords);
    }, [arrWords]);

    function startGame() {

        setGameActive(() => true);
        setWordComplete(() => false);
        setWordLoose(() => false);
        setModalActive(() => false);
        setActiveWord(0);
        setTrueCount(0);
        if (randomWords[0]){
            setCurrentWord(randomWords[0]);
            shuffleLetters(randomWords[0].word);
            getLettersArr(randomWords[0].word);
            getTranslate(randomWords[0].wordTranslate);
            console.log(wordLoose, 'wordLoose')
        } else{
            history.push('/games')
        }
        token && dispatch(putStatistics({
            userId,
            stats: {
                "learnedWords": 0,
                "optional": {
                    gamesCount: (gamesCount + 1)
                }
            },
            token
        }));
    }

    function shuffleLetters(word) {
        word = word.toLowerCase().split('');
        let j, temp;
        for (let i = word.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = word[j];
            word[j] = word[i];
            word[i] = temp;
        }
        return setGameWord(() => word)
    }

    function shrinkArr() {

        if (randomWords.length === 0) {
            setWordComplete(() => false);
            setGameActive(() => false);
        }
        setAnswer(() => '');

        //return setRandomWords(() => randomWords.slice(1));
    }

    function getLettersArr(word) {
        return setCorrectLettersArr((prev) => word.toLowerCase().split(''))
    }

    function concatenate(letter) {
        return setAnswer((prev) => prev + letter)
    }

    function getTranslate(word) {
        return setGameWordTranslate(() => word);
    }

    function getDescription(word) {
        return setGameWordDescription(() => word);
    }

    function getTranscription(word) {
        return setGameWordTranscription(() => word);
    }

    function toLoose() {
        isAuthenticated && badCount(userId, currentWordId, words, token);
        setWordComplete(() => true);
        setWordLoose(() => true);
        setAnswer(() => randomWords[0].word);
        getDescription(randomWords[0].textMeaning);
        getTranscription(randomWords[0].transcription)
    }

    function nextBtn() {
        if (randomWords.length === 0) {
            setModalActive(() => true);
            return;
        }
        shrinkArr();
        setTotalDone(() => true);
        setWordComplete(() => false);
        setWordLoose(() => false);
        if (randomWords[0]){
            setCurrentWord(randomWords[0]);
            shuffleLetters(randomWords[0].word);
            getLettersArr(randomWords[0].word);
            getTranslate(randomWords[0].wordTranslate);
        } else {
            history.push('/games')
        }
    }

    function endWord() {
        setTotalDone(() => true);
        getDescription(randomWords[0].textMeaning);
        getTranscription(randomWords[0].transcription);
        setRandomWords(() => randomWords.slice(1));
    }

    return (
        <section className={styles.make_word}>
            {seconds === 0 ? (
                <>
                    <ExitBtn />

                    <h3>Собери слово <span>{gameWordTranslate ? gameWordTranslate : null}</span> из букв</h3>

                    {gameActive ? (
                        <main className={styles.make_word_game}>

                            <InputWord answer={answer}/>

                            {wordComplete ? (
                                <div>
                                    <div>Transcription: {gameWordTranscription}</div>
                                    <div>Meaning: {textToHtml(gameWordDescription)}</div>
                                </div>
                            ) : (
                                <div className={styles.word_letters}>
                                    {gameWord.map((letter, index) => (
                                        <Letter
                                            key={index}
                                            letter={letter}
                                            correctLettersArr={correctLettersArr}
                                            setCorrectLettersArr={setCorrectLettersArr}
                                            concatenate={concatenate}
                                            endWord={endWord}
                                            totalDone={totalDone}
                                            setTotalDone={setTotalDone}
                                            setWordComplete={setWordComplete}
                                            setWordLoose={setWordLoose}
                                            setTrueCount={setTrueCount}
                                            isAuthenticated={isAuthenticated}
                                            goodCount={goodCount}
                                            userId={userId}
                                            currentWordId={currentWordId}
                                            words={words}
                                            token={token}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className={styles.buttons_footer}>
                                <button onClick={toLoose} disabled={wordLoose ? 'disabled' : null}>
                                    Сдаться
                                </button>
                                <button onClick={nextBtn} disabled={wordLoose ? null : 'disabled'}>
                                    Дальше
                                </button>
                            </div>

                        </main>
                    ) : null}

                    <Modal modalActive={modalActive} setModalActive={setModalActive}>
                        <ModalFinish
                            trueCount={trueCount}
                            looseCount={arrWords.length - trueCount}
                        />
                    </Modal>

                </>
            ) : (
                <Loader seconds={seconds}/>
            )}
        </section>
    )
};
