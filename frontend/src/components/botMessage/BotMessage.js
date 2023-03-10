import React, { useRef } from 'react';
import './BotMessage.css';
import BotImage from '../../bot-image.png';

import { useState, useEffect } from 'react';

function BotMessage(props) {
  const [content, setContent] = useState("");
  const counter = useRef(0);

  useEffect(() => {
    const words = props.content.split(' ');
    const timer = setTimeout(() => {
      if (counter.current < words.length) {
        setContent(`${content} ${words[counter.current]}`);
        window.scrollTo(0, document.body.scrollHeight);
        counter.current++;
      }
    }, 100);
  }, [content]);

  return (
    <div className="bot-message" style={{backgroundColor: "#c3c3c3"}}>
        <div className="response-wrapper">
          <img className="message-icon" src={BotImage} />
          <p className="message-content">{content}</p>
        </div>
    </div>
  )
}

export default BotMessage