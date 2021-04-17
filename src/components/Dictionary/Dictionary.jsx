import React from 'react';
import MainTitle from "../MainTitle/MainTitle";
import DictionaryUnitsList from "../DictionaryUnitsList/DictionaryUnitsList";

export default function Dictionary() {
    return (
        <main className={''}>
            <MainTitle text={"Cловарь"} icon={false}/>
            <DictionaryUnitsList/>
        </main>
    );
};
