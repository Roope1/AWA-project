import React from 'react'

const ProfileDropdown = (props: { username: string }) => {

    // TODO: styling

    const handleChange = (value: string) => {
        if (value === "logout") {
            localStorage.removeItem("auth_token")
            window.location.href = "/login"
        } else if (value === "edit") {
            window.location.href = "/edit"
        }
    }

  return (
    <div>
        <select onChange={(event) => handleChange(event.target.value)} defaultValue={"username"}>
            <option value="username" disabled>{props.username}</option>
            <option value="edit">Edit Profile</option>
            <option disabled>----------------------</option>
            <option value="logout">Logout</option>
            
        </select>
    </div>
  )
}

export default ProfileDropdown