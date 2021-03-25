import React from 'react';

import MainTitle from "../MainTitle/MainTitle";
import DictionaryUnitsList from "../DictionaryUnitsList/DictionaryUnitsList";
//import WordsList from "../WordsList/WordsList";

export default function Dictionary() {
    return (
        <main className={''}>
            <MainTitle text={"Cловарь"} icon={false}/>
            <DictionaryUnitsList/>
            {/*<WordsList/>*/}
        </main>
    );
}
