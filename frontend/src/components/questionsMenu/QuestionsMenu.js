import React from 'react';
import './QuestionsMenu.css';

function QuestionsMenu() {
  return (
    <div className='questions-menu'>
        <div className='alert'>
            This is a list of questions/expressions that you can ask the bot, <span>your question/expression should be in "Darija" and it should not necessary be spelled the same.</span><br />
            Exemple: chkon nta?, xkon nta?, ...
        </div>
        <ul className='questions'>
            <li>Salam</li>
            <li>chkon nta</li>
            <li>bslama</li>
            <li>ach kat3ref dir</li>
            <li>chokran</li>
        </ul>
        More q/e will be added in the future
    </div>
  )
}

export default QuestionsMenu