import { TopBar } from './components/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MainPage from './components/MainPage';
import SwipePage from './components/SwipePage';
import EditProfile from './components/EditProfile';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Router>
      <div className="App flex flex-col w-screen lg:h-screen sm:min-h-screen sm:h-full bg-gradient-to-b from-white to-white-gradient">
        <TopBar />
        <Routes>
          <Route path='/' element = { <MainPage /> }/>
          <Route path='/login' element = {<LoginPage />}/>
          <Route path='/register' element = { <RegisterPage />} />
          <Route path='/swipe' element = { <SwipePage />} />
          <Route path='/edit' element = {<EditProfile />} />
          <Route path='/chat' element = {<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;