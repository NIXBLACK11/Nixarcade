import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OktoProvider, BuildType } from 'okto-sdk-react';
// import Landing from './pages/Landing'
import './App.css'
import { ComingSoon } from './components/ComingSoon';
import { Games } from './pages/Games';
import Landing from './pages/Landing';
import { Login } from './components/Login';
import { Home } from './components/Home';


function App() {
  const OKTO_CLIENT_API = "************************88";
  return (
    <div className='h-screen w-screen '>
      <Router>
        <OktoProvider apiKey={OKTO_CLIENT_API} buildType={BuildType.SANDBOX}>
          <Routes>
            <Route path="/" element={ <Landing/> } />
            <Route path="/ComingSoon" element={ <ComingSoon/> } />
            <Route path="/games" element={ <Games/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/ffffff" element={ <Home/> } />
          </Routes>
        </OktoProvider>
      </Router>
    </div>
  )
}

export default App
