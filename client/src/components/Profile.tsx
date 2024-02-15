import React from 'react'
import avatar from '../images/avatar.jpg'

const Profile = ({...props}) => {
  return (
    <div className='w-[64rem] h-[32rem] bg-secondary grid grid-cols-2 '>
        <div className='h-full m-auto'>
          <img className="h-5/6 mt-10" src= {props.previewAvatar ?? props.avatar ?? avatar} alt="avatar" /> 
          <h1 className='relative text-4xl'>{props.username}</h1>
        </div>
        <div className='pt-10 mx-10'>
            <h1 className='text-2xl font-bold'>About:</h1>
            <p className='px-10 whitespace-pre-line'>{props.bio}</p>
        </div>
    </div>
  )
}

export default Profile