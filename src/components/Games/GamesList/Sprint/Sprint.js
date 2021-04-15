import React, { useState, useEffect } from "react";
import styles from "./Sprint.module.scss";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useGameData } from "../../../../hooks/gameDataHook";
import {useInterval} from '../../../../helpers.js'
import Loader from "../../Loader/Loader";
import {putStatistics} from "../../../../redux/statReducer";

const colorArray = ['#1380EE', '#6970EC', '#8D62D5',
	'#A353BD', '#E15CB2', '#B53C8A', '#F13765'];


export default function Sprint() {
	const { goodCount, badCount } = useGameData();
    const dispatch = useDispatch();
	const words = useSelector((state) => state.words.items);
	const gamesCount = useSelector(state => state.stat.gamesCount);
	const userId = useSelector((state) => state.auth.userId);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const token = useSelector(state => state.auth.token);
	const [currentWordId, setCurrentWordId] = useState("");
	const [boost, setBoost] = useState(0);
	const [activeWord, setActiveWord] = useState(0);
	const [arrWords, setArrWords] = useState([]);
	const [randomWords, setRandomWords] = useState([]);
	const [seconds, setSeconds] = useState(5);
	const [scoreGame, setScoreGame] = useState(0);
	const [trueAnswer, setTrueAnswer] = useState(0);
	const [timer, setTimer] = useState(60);
	const [randomColor, setRandomColor] = useState(1);

	useEffect(() => {
		setArrWords([...words]);
	}, [words]);

	useEffect(() => {
		// вытаскиваем id слова, чтоб апдейтить слово в БД
		const activeWordObj = words.find((i) => {
			const word = randomWords[activeWord]?.word;
			return i.word === word;
		}
		);
		activeWordObj && setCurrentWordId(activeWordObj.id);
	}, [words, activeWord, randomWords]);

	useEffect(() => {
		dispatch(putStatistics({
			userId,
			stats: {
				"learnedWords": 0,
				"optional": {
					gamesCount: (gamesCount + 1)
				}
			},
			token
		}));
		setRandomWords(
			arrWords
				.reduce((result, el) => {
					let addRes = {};
					if (Math.floor(Math.random() * 2)) {
						addRes['word'] = el.word;
						addRes['wordTranslate'] = el.wordTranslate;
						addRes['right'] = true;
						addRes['id'] = el.id;
					} else {
						const newArr = arrWords.filter(elem => elem.word !== el.word);
						const element = newArr[Math.floor(Math.random() * ((newArr.length - 1) - 0 + 1)) + 0];
						addRes['word'] = el.word;
						addRes['wordTranslate'] = element.wordTranslate;
						addRes['right'] = false;
						addRes['id'] = element.id;
					}

					result.push(addRes);
					return result;
				}, []).sort(() => 0.5 - Math.random())
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrWords]);

	let trueLevel = [];
	for (let i = 0; i < 3; i++) {
		trueLevel.push(<div key={i}>{boost % 4 > i ? <div className={styles.sprint__center_level_full}/>
			: <div className={styles.sprint__center_level_clear}/>}</div>);
	}
	const clickChoice = (click) => {
		if (click === randomWords[activeWord]['right']) {
			setBoost(boost + 1);
			setActiveWord(activeWord + 1);
			setScoreGame(scoreGame + (Math.floor(boost / 4) * 20 + 10));
			setTrueAnswer(trueAnswer + 1);
			isAuthenticated && goodCount(userId, currentWordId, words, token);
		} else {
			setBoost(0);
			setActiveWord(activeWord + 1);
			isAuthenticated && badCount(userId, currentWordId, words, token);
		}

	};

	useInterval(() => {
		if (seconds > 0) {
			if (randomWords.length !== 0) {
				setSeconds(seconds - 1);
			}
		} else {
			setTimer(timer - 1);
		}
	}, 1000);

	useInterval(() => {
		setRandomColor(Math.floor(Math.random() * ((colorArray.length - 1) - 0 + 1)) + 0)
	}, 5000);


	useEffect(() => {
		const onKeypress = (e) => {
			if (e.code === "KeyD" || e.code === "ArrowRight") {
				e.preventDefault();
				clickChoice(false);
			} else if (e.code === "KeyA" || e.code === "ArrowLeft") {
				e.preventDefault();
				clickChoice(true);
			}
		};

		document.addEventListener("keyup", onKeypress);

		return () => {
			document.removeEventListener("keyup", onKeypress);
		};
	});

	return randomWords.length !== 0 ? (
		<div className={styles.sprint} style={{ border: `20px solid ${colorArray[randomColor]}` }}>
			{seconds === 0 ? (
				activeWord < randomWords.length && timer > 0 ? (
					<>
						<div className={styles.sprint__top}>
							<div className={styles.sprint__top_score}>{scoreGame}</div>
							<div className={styles.sprint__top_timer} style={{ borderColor: colorArray[Math.floor(boost / 4)] }}>{timer}</div>
						</div>
						<div className={styles.sprint__center}>
							<div className={styles.sprint__center_level}>
								<div className={styles.sprint__center_level_true} style={{ backgroundColor: colorArray[Math.floor(boost / 4)] }}>{trueLevel}</div>
								<div className={styles.sprint__center_level_upScore}>+{Math.floor(boost / 4) * 20 + 10} очков за слово</div>
							</div>
							<div className={styles.sprint__center_word}>
								<h1>{randomWords[activeWord].word}</h1>
								<h3>{randomWords[activeWord].wordTranslate}</h3>
							</div>
							<div className={styles.sprint__center_choice}>
								<div className={styles.sprint__center_choice_agree} onClick={() => clickChoice(true)}><h4>Верно</h4></div>
								<div className={styles.sprint__center_choice_refuse} onClick={() => clickChoice(false)}><h4>Неверно</h4></div>
							</div>

						</div>
						<div className={styles.sprint__bottom}>
							<p className={styles.sprint__tip}>Вы можете использовать клавиатуру</p>
							<img src="https://img.icons8.com/bubbles/75/000000/left.png" onClick={() => clickChoice(true)} alt=''/>
							<img src="https://img.icons8.com/bubbles/75/000000/right.png" onClick={() => clickChoice(false)} alt=''/>
						</div>
					</>
				) : (
					<div className={styles.endGame}>
						<div className={styles.endGame_body}>
							<div className={styles.endGame_body_top}>
								<h1>Круто,отличный результат!</h1>
								<h3>
									{trueAnswer} слов изучено, {randomWords.length - trueAnswer} на изучении
               					 </h3>
							</div>
							<div className={styles.endGame_body_center}>
								<div className={styles.endGame_body_circle}>
									<div className={styles.endGame_body_info}>
										<p>Ваш счёт:</p>
										<p>{scoreGame}</p>
									</div>
								</div>
							</div>
							<div className={styles.endGame_body_bottom}>
								<button>
									<Link to="/games">К списку тренировок</Link>
								</button>
							</div>
						</div>
					</div>
				)
			) : (
				<Loader seconds={seconds}/>
			)}
		</div>
	) : (
		<h1 className={styles.main}>Loading...</h1>
	);
}
