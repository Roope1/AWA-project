import { TopBar } from './components/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <div className="App flex flex-col w-screen h-screen bg-background">
        <TopBar />
        <Routes>
          <Route path='/' element = { <MainPage /> }/>
          <Route path='/login' element = {<LoginPage />}/>
          <Route path='/register' element = { <RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;