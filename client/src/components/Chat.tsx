import React, { useEffect, useState } from 'react'
import Message from './Message';

const Chat = ({...props}) => {
    const auth_token = localStorage.getItem('auth_token')
    const [messages, setMessages] = useState([{}]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
      setMessages([{"author": "user1", "content": "Hello"}, {"author": "user2", "content": "Hi"}])
    }, [])

    const sendMessage = () => {
      console.log("Sending message")
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setMessage(event.target.value)
    }

  return (
    <div>
      <div>
      {/** Top bar with the name of person were chatting with */}
      <h1>{props.id}</h1> {/* Later get this from backend via the id */}
      </div>
      <div>
      {/** Chat messages */}
      {messages ? messages.map((message, index) => (
        <Message key={index} {...message}/>
      )): <p>No messages</p>}
      </div>
      <div className='flex flex-row'>
        {/** Input box for typing messages */}
        <textarea className='w-full' onChange={handleChange}></textarea> 
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>

  )
}

export default Chat