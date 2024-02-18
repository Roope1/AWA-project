import React, { useEffect, useState } from 'react'
import ChatSelector from './ChatSelector';

const ChatPage = () => {
    const [matches, setMatches] = useState<string[]>([]);
    const [selectedChat, setSelectedChat] = useState();

    useEffect(() => {
        // get the matches form backend and modify matches state accordingly
        setMatches(["chat A", "chat B", "chat C", "chat D", "chat E", "chat F", "chat G", "chat H", "chat I", "chat J", "chat K" ])
    }, [])

  return (
    <div className='w-2/3 h-2/3 bg-secondary rounded m-auto flex flex-row'>
        <div className='h-full border w-1/3 flex flex-col'>
            <div className='h-12 text-center bg-main text-white'>
                <h2 className='text-2xl'> Chats </h2> {/* Top bar */}
            </div>
            <div className='grow overflow-y-scroll'>
            {matches.map(match => (
                <ChatSelector name={match} setSelectedChat={setSelectedChat}/>
                ))}                
            </div>
        </div>
        <div className='h-full border w-full'>
            <h2> Chat </h2>
            {!selectedChat ?
            <p>Select a match from left to start chatting</p> :
            <p>{selectedChat}</p>} {/* TODO: change to some chat component which actually allows for chatting */}
        </div>
    </div>
  )
}

export default ChatPage