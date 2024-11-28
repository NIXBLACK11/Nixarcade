import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { Analytics } from "@vercel/analytics/react";
import './App.css'
import { ComingSoon } from './components/ComingSoon';
import { Games } from './pages/Games';
import Landing from './pages/Landing';
import { LeaderBoard } from './pages/LeaderBoard';
import { Game } from './pages/Game';
import { Blinks } from './pages/Blinks';


function App() {
  const apiKey = import.meta.env.VITE_OKTO_CLIENT_API;
  return (
    <div className='h-screen w-screen'>
      <Analytics/>
      <Router>
        <OktoProvider apiKey={apiKey} buildType={BuildType.SANDBOX}>
          <Routes>
            <Route path="/" element={ <Landing/> } />
            <Route path="/ComingSoon" element={ <ComingSoon/> } />
            <Route path="/games" element={ <Games/> } />
            <Route path="/leaderboard" element={ <LeaderBoard/> } />
            <Route path="/games/:game/:publicKey" element={ <Game/> } />
            <Route path="/blinks" element={ <Blinks/> } />
          </Routes>
        </OktoProvider>
      </Router>
    </div>
  )
}

export default App
