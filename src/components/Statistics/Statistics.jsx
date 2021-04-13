import React, {useEffect} from "react";
import {getCount} from "../../redux/statReducer";
import {useDispatch, useSelector} from "react-redux";

export const Statistics = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const statistics = useSelector(state => state.stat);

    useEffect(() => {
        userId && dispatch(getCount({userId, token}));
    }, [userId, token]);

    return (
        <>
            <h2>Statistics</h2>
            <div>learned: {statistics.learned}</div>
            <div>difficult: {statistics.difficult}</div>
            <div>deleted: {statistics.deleted}</div>
            <div>gamesCount: {statistics.gamesCount}</div>
        </>
    )


}