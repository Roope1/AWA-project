import React, { useEffect, useState } from 'react'
import Message from './Message';
import ChatTopBar from './ChatTopBar';

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
      authorId: string,
      author: string,
      content: string
    }

    const auth_token = localStorage.getItem('auth_token')
    const [chat, setChat] = useState<IChat>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [trigger, setTrigger] = useState(Date.now())
    
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
        res.json()
        .then(data => {
          setChat(data)
          fetch('/chat/messages/' + data._id, {
            method: "GET",
            headers: {
              "authorization": "Bearer " + auth_token,
            },
            mode: "cors"
          })
          .then((res: Response) => {
              res.json()
              .then(data => {
                setMessages(data)
              }
            )
          })      
      })
    })
    }, [trigger, props.id, auth_token])

    const sendMessage = () => {
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
      .then(() => {
        setTrigger(Date.now())
        setNewMessage('')
      })
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setNewMessage(event.target.value)
    }

  return (
    <div className='flex flex-col h-full justify-between'>
      <div className='flex flex-col'>
      {/** Top bar with the name of person were chatting with */}
        <ChatTopBar id={props.id} setSelectedChat={props.setSelectedChat}/>
      </div>
      <div className='overflow-y-scroll lg:h-full sm:h-[32rem] mt-auto'> {/** Chat messages */}
      {messages ? messages.map((message, index) => (
        <Message key={index} message={message}/>
        )): <p>No messages</p>}
      </div>
      <div className='flex flex-row'> {/** Input box for typing messages */}
        <textarea className='w-full' onChange={handleChange} value={newMessage}></textarea> 
        <button onClick={sendMessage} className='ml-2 px-4 bg-accent hover:bg-main hover:text-white transition-all'>Send</button>
      </div>
    </div>
  )
}

export default Chat