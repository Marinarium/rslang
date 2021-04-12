import React, {useEffect, useMemo, useState} from "react";
import Games from "../../components/Games/Games";
import {useHistory} from 'react-router-dom';
import styles from "./GamesPage.module.scss";
import {fetchWords, getAllUserWordsWithoutDeletedWords, updateUserWord} from "../../redux/wordsReducer";
import {useDispatch, useSelector} from "react-redux";
import {useStartGameWithAuth} from "../../hooks/startGameWithAuthHook";

export default function GamesPage({location, match}) {
    const history = useHistory();
    const page = useMemo(() => Math.ceil(Math.random() * 19), []);
    console.log('page', page)
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [link, setLink] = useState(null);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const words = useSelector(state => state.words.items);
    const [currentGroup, setCurrentGroup ] = useState(null);
    const {setUserWords, getWords} = useStartGameWithAuth();
    const bgColors = {
        firsColor: '#1380EE',
        secondColor: '#6970EC',
        thirdColor: '#8D62D5',
        fourthColor: '#A353BD',
        fifthColor: '#E15CB2',
        sixthColor: '#B53C8A',
        accentColor: '#F13765'
    };

    const unitItems = [
        {group: '1', color: bgColors.firsColor},
        {group: '2', color: bgColors.secondColor},
        {group: '3', color: bgColors.thirdColor},
        {group: '4', color: bgColors.fourthColor},
        {group: '5', color: bgColors.fifthColor},
        {group: '6', color: bgColors.sixthColor}
    ];

    const buttonHandler = (group) => {
        setCurrentGroup(group)
        isAuthenticated
            ?
            dispatch(getAllUserWordsWithoutDeletedWords({
                group: group,
                page: page,
                userId,
                token
            }))
            :
            dispatch(fetchWords({
                group: group,
                page: page
            }))

    };

    const confirmHandler =  () => {
        setUserWords(words);
        getWords(page, currentGroup);
        setModalIsVisible(false);
        link && history.push(`/${link}`);
    };
    const startGameHandler = (linkTo) => {
        setModalIsVisible(true);
        setLink(linkTo);
    };
    return (
        <>
            {
                modalIsVisible && <div className={styles.wrap}>
                    <h4 className={styles.title}>Выберите сложность игры</h4>
                    <div className={styles.list}>
                    {
                        unitItems.map(i => <button
                            className={styles.button}
                            key={i.group}
                            style={{backgroundColor: i.color}}
                            onClick={() => buttonHandler(i.group - 1)}>{i.group}
                        </button>)
                    }
                    </div>
                    <button onClick={confirmHandler} className={styles.start}>Начать</button>
                </div>
            }
            <main className={styles.main}>
                <Games location={location} match={match} startGameHandler={startGameHandler}/>
            </main>
        </>
    );
}
