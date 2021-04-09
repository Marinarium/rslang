import {useDispatch} from 'react-redux';
import {updateUserWord} from '../redux/wordsReducer';

export const useGameData = () => {
    const dispatch = useDispatch();
    const badCount = (userId, currentWordId, words, token) => dispatch(updateUserWord({
            userId,
            wordId: currentWordId,
            props: {
                'optional': {
                    'learned': true,
                    'count': {
                        'good': words.find(i => i.id === currentWordId).userWord?.optional?.count?.good,
                        'bad': words.find(i => i.id === currentWordId).userWord?.optional?.count?.bad + 1
                    }
                }
            },
            token
        }
    ))

    const goodCount = (userId, currentWordId, words, token) => dispatch(updateUserWord({
            userId,
            wordId: currentWordId,
            props: {
                'optional': {
                    'learned': true,
                    'count': {
                        'good': words.find(i => i.id === currentWordId).userWord?.optional?.count?.good + 1,
                        'bad': words.find(i => i.id === currentWordId).userWord?.optional?.count?.bad
                    }
                }
            },
            token
        }
    ))
    return {goodCount, badCount};

}
