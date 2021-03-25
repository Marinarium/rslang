import React from 'react';
import UnitsList from "../UnitsList/UnitsList";
import DeletedWordsListContainer from './DeletedWordsListContainer/DeletedWordsListContainer';

export default function DeletedWords() {
    return (
        <div className={''}>
            <UnitsList link={"deleted"}/>
            <DeletedWordsListContainer/>
        </div>
    );
};
