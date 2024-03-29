import React, { useEffect, useState } from 'react'
import Message from './Message';
import ChatTopBar from './ChatTopBar';
import { useTranslation } from 'react-i18next';

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
      content: string,
      updatedAt: string
    }
    
    const { t } = useTranslation();

    const auth_token = localStorage.getItem('auth_token')
    const [chat, setChat] = useState<IChat>();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [trigger, setTrigger] = useState(Date.now()) // used to trigger useEffect
   
    // get chat and messages
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
                // scroll messages to bottom
                let messages = document.getElementById('messages')
                messages?.scrollTo(
                  {
                    top: messages.scrollHeight,
                  });
              }
            )
          })      
      })
    })
    }, [trigger, props.id, auth_token])

    // poll for new messages every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setTrigger(Date.now())
      }, 5000)
      return () => clearInterval(interval)
    }, [])

    // send message
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
      <div className='overflow-y-scroll lg:h-full sm:h-[32rem] mt-auto' id="messages"> {/** Chat messages */}
      {messages ? messages.map((message, index) => (
        <Message key={index} message={message}/>
        )): <p>No messages</p>}
      </div>
      <div className='flex flex-row'> {/** Input box for typing messages */}
        <textarea className='w-full' onChange={handleChange} value={newMessage}></textarea> 
        <button onClick={sendMessage} className='ml-2 px-4 bg-accent hover:bg-main hover:text-white transition-all'>{t("send")}</button>
      </div>
    </div>
  )
}

export default Chat