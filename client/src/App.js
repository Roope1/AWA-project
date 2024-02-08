import { TopBar } from './components/TopBar.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage.tsx';

function App() {
  return (
    <Router>
      <div className="App flex flex-col w-screen h-screen bg-background">
        <TopBar />
        <Routes>
          <Route path='/login' element = {<LoginPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
