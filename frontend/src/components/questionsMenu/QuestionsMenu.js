import React from 'react';
import './QuestionsMenu.css';

function QuestionsMenu() {
  return (
    <div className='questions-menu'>
        <div className='alert'>
            This is a list of questions/expressions that you can ask the bot, <span>your question/expression should be in "Darija" and it should not necessary be spelled the correctly.</span><br />
            Exemple: who are you?  = chkon nta?, xkon nta?, ...
        </div>
        <ul className='questions'>
            <li>Hello</li>
            <li>How are you</li>
            <li>Goodbye</li>
            <li>What can you do</li>
            <li>Thank you</li>
        </ul>
        More q/e will be added in the future
    </div>
  )
}

export default QuestionsMenu