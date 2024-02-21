import React, { useCallback, useEffect, useState } from 'react'
import Profile from './Profile'

const SwipePage = () => {

    const [profile, setProfile] = useState({})
    const [triggerNewUser, setTriggerNewUser] = useState(Date.now);

    const auth_token = localStorage.getItem("auth_token")

    useEffect(() => {
        fetch('/user/random', {
            method: "GET",
            headers: {
                "authorization": "Bearer " + auth_token
            },
            mode: "cors"
        })
            .then((res: Response) => {
                if (res.status === 401) window.location.href = '/login';
                res.json()
                    .then(data => setProfile(data))
            }
            )
    }, [triggerNewUser, auth_token])

    // reject
    const handleLeft = () => {
        fetch('/user/reject', {
            method: 'POST',
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile),
            mode: "cors"
        })
        setTriggerNewUser(Date.now)
    }

    // like
    const handleRight = () => {
        fetch('/user/like', {
            method: 'POST',
            headers: {
                "authorization": "Bearer " + auth_token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile),
            mode: "cors"
        })
            .then((res: Response) => res.json())
            .then(data => {
                if (data?.msg === "match") {
                    // TODO: handle instant match 
                } else {
                    setTriggerNewUser(Date.now)
                }
            })
    }

    return (
        <div className='w-full h-full sm:m-auto sm:px-10 lg:flex lg:flex-col justify-center items-center'>
            <Profile {...profile} />
            <div className='w-full text-center my-10 text-white'>
                <button onClick={handleLeft} className='px-10 mx-10 bg-main rounded'> {"<"} </button>
                <button onClick={handleRight} className='px-10 mx-10 bg-main rounded'> {">"} </button>
            </div>
        </div>
    )
}

export default SwipePage