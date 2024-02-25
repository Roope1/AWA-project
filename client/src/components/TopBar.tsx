import React, { useEffect, useState } from 'react'
import ProfileDropdown from './ProfileDropdown'
import { useTranslation } from 'react-i18next'


export const TopBar = () => {

    const [username, setUsername] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [lang, setLang] = useState('en')
    const {t, i18n} = useTranslation();

    // change the language
    const changeLang = () => {
      if(lang === 'en'){
        i18n.changeLanguage('fi');
        setLang('fi');
      }
      else {
        i18n.changeLanguage('en');
        setLang('en');
      }
    }

    useEffect(() => {

      let auth_token: string | null = localStorage.getItem('auth_token');
      // get the user's profile data
      fetch('/user', {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token
        },
        mode: "cors"
      })
        .then(response => {
          if (response.status === 401) { 
            setLoggedIn(false);
          } else {
            response.json().then((data) => {
              setUsername(data.username);
              setLoggedIn(true);
            })
          }
        })
        .catch(() => setLoggedIn(false))
    }, [])


  return (
    <div className='sticky top-0 bg-main w-screen h-14 flex flex-wrap justify-between items-center mx-auto p-4 drop-shadow-md'>
        <a href='/' className='flex items-center lg:space-x-3 text-secondary'>
            <span className='self-center lg:text-2xl sm:text-lg whitespace-nowrap'>NotTinder</span>
        </a>
        <div className='flex items-center lg:space-x-6 sm:space-x-2 text-secondary'>
            {!loggedIn ? <p><a href='/login'>{t("login")}</a></p> : <ProfileDropdown username={username}/>}
            <p><a onClick={changeLang}>FI/EN</a></p>
        </div>
    </div>
  )
}
