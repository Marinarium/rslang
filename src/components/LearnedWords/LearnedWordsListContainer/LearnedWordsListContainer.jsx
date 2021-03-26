import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchWords} from '../../../redux/wordsReducer';
import {setCurrentPagesArray, setIsWordButtonsShown, setIsWordTranslated} from '../../../redux/appReducer';
import {setCurrentPagesItem} from '../../../redux/appReducer';
import {WordsList} from '../../WordsList/WordsList'


function LearnedWordsListContainer({match}) {

}

export default withRouter(LearnedWordsListContainer)

