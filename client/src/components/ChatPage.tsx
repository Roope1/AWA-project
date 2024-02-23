import React, { useEffect, useState } from 'react'
import ChatSelector from './ChatSelector';
import Chat from './Chat';

const ChatPage = () => {
    const [matches, setMatches] = useState([{}]);
    const [selectedChat, setSelectedChat] = useState();

    const auth_token = localStorage.getItem('auth_token')

    useEffect(() => {
        // get the matches form backend and modify matches state accordingly
        //setMatches(["chat A", "chat B", "chat C", "chat D", "chat E", "chat F", "chat G", "chat H", "chat I", "chat J", "chat K" ])
        fetch('/user/matches', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + auth_token,
            },
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            setMatches(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [auth_token])

  return (
    <div className='w-2/3 h-2/3 bg-secondary rounded m-auto flex flex-row'>
        <div className={`h-full border lg:w-1/3 lg:flex flex-col ${selectedChat ? 'sm:hidden' : ''}`}>
            <div className='text-center bg-main text-white'>
                <h2 className='text-2xl py-2'> Chats </h2> {/* Top bar */}
            </div>
            <div className={`grow overflow-y-scroll `}>
                {matches ? matches.map((match, index) => (
                    <ChatSelector key={index} {...match} index={index} setSelectedChat={setSelectedChat}/>
                )): <p>No matches</p>} 
            </div>
        </div>
        <div className={`h-full w-full lg:flex lg:flex-col ${selectedChat ? '' : 'sm:hidden'}`}>
            {!selectedChat ?
            <p className='m-auto'>Select a match from left to start chatting</p> :
            <Chat id={selectedChat} setSelectedChat={setSelectedChat}/>} 
        </div>
    </div>
  )
}

export default ChatPage