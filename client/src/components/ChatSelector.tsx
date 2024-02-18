import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'


const ChatSelector = ({...props}) => {
  const [image, setImage] = useState();
  
  useEffect(() => {
    fetch('/image/' + props.profilePic, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + localStorage.getItem('auth_token')
      },
      mode: "cors"
    })
    .then((response: Response) => {
      if (response.status !== 404){
        response.json()
        .then(data => setImage(data.image))
      } 
    })}, [props])

  return (
    <div key={props.index} onClick={() => props.setSelectedChat(props._id)} className='bg-accent my-2 border-y-2 flex flex-row '>
        <img src={image ?? avatar} alt="avatar" className='w-1/5 rounded-full'/>
        <h1 className='pl-5 my-auto text-lg'>{props.username}</h1>
    </div>
  )
}

export default ChatSelector