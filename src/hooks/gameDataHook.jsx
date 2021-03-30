import {useDispatch} from 'react-redux';
import {updateUserWord} from '../redux/wordsReducer';

export const useGameData = () => {
    const dispatch = useDispatch();
    const badCount = (userId, currentWordId, words) => dispatch(updateUserWord({
            userId,
            wordId: currentWordId,
            props: {
                'optional': {
                    'count': {
                        'good': words.find(i => i.id===currentWordId).userWord.optional.count.good,
                        'bad': words.find(i => i.id===currentWordId).userWord.optional.count.bad + 1
                    }
                }
            }
        }

    ))

    const goodCount = (userId, currentWordId, words) => dispatch(updateUserWord({
            userId,
            wordId: currentWordId,
            props: {
                'optional': {
                    'count': {
                        'good': words.find(i => i.id===currentWordId).userWord.optional.count.good + 1,
                        'bad': words.find(i => i.id===currentWordId).userWord.optional.count.bad
                    }
                }
            }
        }

    ))
    return {goodCount, badCount};

}
