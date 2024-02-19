import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'


const Message = ({...props}) => {
  return (
    <div className='border border-red-500 flex flex-row mt-2'>
        <img className='w-12 rounded-full mx-2' src={avatar} alt="avatar"/>
        <div className=''>
            <p className='font-bold'>{props.message.author}</p>
            <p>{props.message.content}</p>
        </div>
    </div>
  )
}

export default Message