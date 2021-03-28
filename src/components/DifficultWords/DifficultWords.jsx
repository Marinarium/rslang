import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import DifficultWordsListContainer from './DifficultWordsListContainer/DifficultWordsListContainer';

export default function DifficultWords() {
    return (
        <div className={''}>
            <UnitsList link={"dictionary/difficult"}/>
            <DifficultWordsListContainer/>
        </div>
    );
};
