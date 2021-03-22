import React, {useEffect} from 'react'
import {fetchWords, pageFormChange} from '../../redux/wordsReducer'
import {useDispatch, useSelector} from 'react-redux'
import {Card} from '../Card/Card'


export const CardList = () => {

    const dispatch = useDispatch()

    const words = useSelector(state => state.words.words)
    const group = useSelector(state => state.words.pageForm.group)
    const page = useSelector(state => state.words.pageForm.page)

    useEffect(() => {
        dispatch(fetchWords({group: '0', page: '0'}))
    },[dispatch])

    const changeHandler = (event) => {
        dispatch(pageFormChange({[event.target.name]: event.target.value}))
    }

    const submitHandler = () => {
        dispatch(fetchWords({group, page}
        ))
    }
    return (
        <div>
            Слова:<br/>
            Enter Group<br/>
            <input onChange={changeHandler} name='group' /><br/>
            Enter Page<br/>
            <input onChange={changeHandler} name='page'/><br/>
            <button onClick={submitHandler}>Load</button><br/>
            {words.map(word => <Card key={word.id} word={word}/>)}
        </div>
    )
}
