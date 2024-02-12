import React from 'react'
import avatar from '../images/avatar.jpg'

const Profile = ({...props}) => {
  return (
    <div className='w-2/3 bg-secondary p-16'>
        <div className='flex flex-row'>
            <img className='w-1/5 rounded-full' src= {avatar} alt="avatar" />
            <div className='mx-10 my-auto'>
                <h1 className='text-4xl'>{props.username}</h1>
                <p>{props?.name}</p>
            </div>
        </div>
        <div className='pt-10'>
            <h1 className='text-2xl font-bold'>About:</h1>
            <p className='px-3'>{props.bio}</p>
        </div>
    </div>
  )
}

export default Profile