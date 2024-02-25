# Client Documentation

## Technologies
* [React](https://react.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwindcss](https://tailwindcss.com/)
    * Used for page styling
* [i18next](https://www.i18next.com/)
    * Used for internationalization


## Project Structure
Each main "page" is postfixed with Page. For example `Login` is the component used for logging in and its rendered in the `LoginPage`. All of these are located in the `./src/components` directory. All the available paths are listed in `App.tsx`

## How the frontend works
1. User is greeted with a login page
2. User can either sign in and be redirected to the main page or register a new account.
3. Main page has 2 buttons "Chats" and "Start Swiping"
4. Chats button redirects to the chat page and start swiping to see other users. 
5. Topbar of all the pages has a dropdown menu with the logged in users username. The dropdown has possibilities to log out or to edit profile.

---
Authentication is done using [Json Web Tokens](https://jwt.io/). The token is given to user when they log in and removed when they log out. The token is sent along the data in every backend request to authorize user. If the backend gives the user a response of 401 (Unauthorized) the user is redirected to the login page.