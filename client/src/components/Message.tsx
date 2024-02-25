import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'


const Message = ({...props}) => {

  const auth_token = localStorage.getItem('auth_token');
  const [profilePic, setProfilePic] = useState<any>();

  useEffect(() => {
    if (props.message.authorId === undefined){
      return
    }

    fetch('/image/user/' + props.message.authorId, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + auth_token
      },
      mode: "cors"
    })
    .then((response: Response) => {
      if (response.status !== 404){
        response.json()
        .then(data => setProfilePic(data.image))
      } else {
        setProfilePic(undefined)
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    })
  }, [props.message.authorId])


  return (
    <div className='border border-red-500 flex flex-row mt-2'>
        <img className='w-12 rounded-full mx-2' src={profilePic ?? avatar} alt="avatar"/>
        <div className=''>
          <div className='flex flex-row justify-between'>
            <p className='font-bold'>{props.message.author}</p>
            <p className='ml-10 mt-1 text-xs'>{new Date(props.message.updatedAt).toLocaleString()}</p>
          </div>
            <p>{props.message.content}</p>
        </div>
    </div>
  )
}

export default Message