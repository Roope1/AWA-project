import React, { useEffect, useState } from 'react'
import Message from './Message';

const Chat = ({...props}) => {

    interface IChat {
        _id: string,
        people: string[],
        messages: IMessage[],
        createdAt: string,
        updatedAt: string
        __v: number | undefined
    }

    interface IMessage {
      author: string,
      content: string
    }

    const auth_token = localStorage.getItem('auth_token')
    const [chat, setChat] = useState<IChat>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    
    useEffect(() => {
      fetch('/chat/' + props.id, {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token,
        },
        mode: "cors"
      })
      .then((res: Response) => {
        if (res.status === 401) {
          window.location.href = '/login'
        }
        if (res.status !== 304) { // only update if the data has changed
          res.json()
          .then(data => {
            console.log(data)
            setChat(data)
            fetch('/chat/messages/' + data._id, {
              method: "GET",
              headers: {
                "authorization": "Bearer " + auth_token,
              },
              mode: "cors"
            })
            .then((res: Response) => res.json())
            .then(data => {
              console.log(data)
              setMessages(data)
            })
          })      
        }
      })
    }, [])

    const sendMessage = () => {
      console.log("Sending message")
      fetch('/chat/message', {
        method: "POST",
        headers: {
          "authorization": "Bearer " + auth_token,
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          chatId: chat?._id,
          content: newMessage
        })
      })
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setNewMessage(event.target.value)
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
        <Message key={index} message={message}/>
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