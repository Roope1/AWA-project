import React, { useEffect, useState } from 'react'

const ChatTopBar = ({...props}) => {

    const [name, setName] = useState<string>('');

    // get the username of the user whom the chat is with
    useEffect(() => {
        fetch('/user/username/' + props.id, {
            method: 'GET',
            headers: {
                "authorization": "Bearer " + localStorage.getItem('auth_token')
            },
            mode: 'cors'
        })
        .then((res: Response) => {
            res.json()
            .then(data => setName(data.username))
        }
    )
    }, [props.id])
    
    const handleBack = () => {
        props.setSelectedChat(undefined)
    }

  return (
    <div className='bg-accent flex flex-row justify-between py-2'>
        <h1 className='text-2xl mx-2'>{name}</h1>
        <a className='text-2xl mx-2 lg:hidden' onClick={handleBack}>{'<'}</a>
    </div>
  )
}

export default ChatTopBar