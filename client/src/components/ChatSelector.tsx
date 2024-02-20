import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'


const ChatSelector = ({...props}) => {
  const [image, setImage] = useState();
  
  useEffect(() => {
    if (props.profilePic === undefined){
      return
    }

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
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [props])

  return (
    <div key={props.index} onClick={() => props.setSelectedChat(props._id)} className='bg-accent my-2 py-2 flex flex-row '>
        <img src={image ?? avatar} alt="avatar" className='w-1/5 rounded-full mx-2'/>
        <h1 className='my-auto text-lg'>{props.username}</h1>
    </div>
  )
}

export default ChatSelector