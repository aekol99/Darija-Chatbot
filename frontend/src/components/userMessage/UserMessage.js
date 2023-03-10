import React from 'react';
import './UserMessage.css';
import UserImage from '../../user-image.png';

function UserMessage(props) {
  return (
    <div className="user-message">
        <div className="response-wrapper">
          <img className="message-icon" src={UserImage} />
          <p className="message-content">{props.content}</p>
        </div>
    </div>
  )
}

export default UserMessage