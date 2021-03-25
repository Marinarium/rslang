import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import LearnedWordsListContainer from './LearnedWordsListContainer/LearnedWordsListContainer';

export default function LearnedWords() {
    return (
        <div className={''}>
            <UnitsList link={"learned"}/>
            <LearnedWordsListContainer/>
        </div>
    );
};
