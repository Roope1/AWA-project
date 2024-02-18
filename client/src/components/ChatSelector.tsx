import React from 'react'
import avatar from '../images/avatar.jpg'

const ChatSelector = (props: any) => {
  return (
    <div onClick={() => props.setSelectedChat(props.name)} className='bg-accent my-2 border-y-2 flex flex-row '>
        <img src={avatar} alt="avatar" className='w-1/5 rounded-full'/>
        <h1 className='pl-5 my-auto text-lg'>{props.name}</h1>
    </div>
  )
}

export default ChatSelector