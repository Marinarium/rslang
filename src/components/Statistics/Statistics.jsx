import React, {useEffect} from "react";
import {getCount, getStatistics} from "../../redux/statReducer";
import {useDispatch, useSelector} from "react-redux";

import styles from './Statistics.module.scss';
import MainTitle from "../MainTitle/MainTitle";

export const Statistics = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const statistics = useSelector(state => state.stat);

    useEffect(() => {
        userId && dispatch(getCount({userId, token}));
        userId && dispatch(getStatistics({userId, token}));
    }, [dispatch, userId, token]);

    return (
        <main className={styles.main}>
            <MainTitle text={'Статистика'}/>
            <div className={styles.box}>
                <h3 className={styles.subtitle}>На изучении:</h3>
                <span className={styles.number}>{statistics.learned}</span>
            </div>
            <div className={styles.box}>
                <h3 className={styles.subtitle}>Сложные слова:</h3>
                <span className={styles.number}>{statistics.difficult}</span>
            </div>
            <div className={styles.box}>
                <h3 className={styles.subtitle}>Удаленные слова:</h3>
                <span className={styles.number}>{statistics.deleted}</span>
            </div>
            <div className={styles.box}>
                <h3 className={styles.subtitle}>Кол-во сыгранных игр:</h3>
                <span className={styles.number}>{statistics.gamesCount}</span>
            </div>
        </main>
    )

};