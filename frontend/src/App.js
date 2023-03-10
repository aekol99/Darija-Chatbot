import Send from './send-icon.png'
import './App.css';
import Navbar from './components/navbar/Navbar';
import UserMessage from './components/userMessage/UserMessage';
import BotMessage from './components/botMessage/BotMessage';

import { useState, useRef } from 'react';

function App() {
  const textInput = useRef();
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pattern = textInput.current.value;
    textInput.current.value = '';
    setMessages(oldMessages => [...oldMessages, {type: "user", content: pattern}]);
    window.scrollTo(0, document.body.scrollHeight);

    fetch('http://127.0.0.1:5000/api/predict',{
      method: "POST",
      body: JSON.stringify({pattern}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then((data) => data.json())
    .then(json => setMessages(oldMessages => [...oldMessages, json]))
  }

  return (
    <div className="App">
      <Navbar />
      <div className="conversation">
        {messages.map((msg,i) => {
          if (msg.type === "user") {
            return <UserMessage key={i} content={msg.content} />
          }
          return <BotMessage key={i} content={msg.content} />
        })}
      </div>
      <div className="text-field">
        <form method="post" onSubmit={handleSubmit}>
            <input id="inputf" type="text" placeholder="please type something ..." name="pattern" ref={textInput} />
            <button type='submit'><img src={Send} alt="" className="send-icon"/></button>
        </form>
      </div>
    </div>
  );
}

export default App;
