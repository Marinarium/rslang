import React from 'react'

export const Card = ({word}) => {
    return (
        <div>
           <b>id:</b>  {word.id}<br/>
            <b>group:</b>  {word.group}<br/>
            <b>page:</b> {word.page}<br/>
            <b>word:</b> {word.word}<br/>
            <b>image:</b> {word.image}<br/>
            <b>audio:</b> {word.audio}<br/>
            <b>audioMeaning:</b> {word.audioMeaning}<br/>
            <b>audioExample:</b> {word.audioExample}<br/>
            <b>textMeaning:</b> {word.textMeaning}<br/>
            <b>textExample:</b> {word.textExample}<br/>
            <b>transcription:</b> {word.transcription}<br/>
            <b>wordTranslate:</b> {word.wordTranslate}<br/>
            <b>textMeaningTranslate:</b> {word.textMeaningTranslate}<br/>
            <b>textExampleTranslate:</b> {word.textExampleTranslate}
            <hr/>
        </div>
    )
}
