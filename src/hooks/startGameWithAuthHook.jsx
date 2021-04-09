import {createUserWord, getAllUserWordsWithoutDeletedWords, updateUserWord} from "../redux/wordsReducer";
import {useDispatch, useSelector} from 'react-redux';


export const useStartGameWithAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const setUserWords = (words) => {
        isAuthenticated && words.map(async i => {
            const learned = i.userWord?.optional?.learned;
            !i.userWord && await dispatch(createUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count': {
                            'good': 0,
                            'bad': 0
                        }

                    }
                },
                token
            }));
            !learned && await dispatch(updateUserWord({
                userId,
                wordId: i.id,
                props: {
                    'optional': {
                        'learned': true,
                        'count': {
                            'good': 0,
                            'bad': 0
                        }
                    }
                },
                token
            }));

        })
    };
   const getWords = (page, currentGroup) => {
       isAuthenticated && dispatch(getAllUserWordsWithoutDeletedWords({
        group: currentGroup,
        page,
        userId,
        token
    }))
   };


    return {setUserWords, getWords}
}
