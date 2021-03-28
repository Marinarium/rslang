import React, {useState} from 'react';

export default function Letter({letter, wordArr, setWordArr, concatenate, endGame}) {

  const [done, setDone] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  let classes = 'btn';
  if (done) {
    classes += ' done'
  }
  if (incorrect) {
    classes += ' incorrect'
  }

  function checkDone(el) {
    if (el === wordArr[0]) {
      setDone(() => true);
      concatenate(el);
      setWordArr((wordArr) => wordArr.slice(1));
      if (wordArr.length === 1) endGame();
    } else showIncorrect();
  }

  function showIncorrect() {
    setIncorrect(() => true);
    setTimeout(() => {
      setIncorrect(() => false);
      classes.replace(' incorrect', '');
    }, 250)
  }



  return (
    <button
      className={classes}
      onClick={() => checkDone(letter)}
    >
      {letter}
    </button>
  )
};
