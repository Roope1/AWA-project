import React from 'react'
import { useTranslation } from 'react-i18next';

const ProfileDropdown = (props: { username: string }) => {

    // TODO: styling

    const { t } = useTranslation();

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
            <option value="edit">{t("edit-profile")}</option>
            <option disabled>-----------------</option>
            <option value="logout">{t("logout")}</option>
            
        </select>
    </div>
  )
}

export default ProfileDropdown