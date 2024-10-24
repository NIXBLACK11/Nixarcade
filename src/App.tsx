import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { Analytics } from "@vercel/analytics/react";
import './App.css'
import { ComingSoon } from './components/ComingSoon';
import { Games } from './pages/Games';
import Landing from './pages/Landing';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';
import { useEffect, useRef, useState } from 'react';


function App() {
  const musicRef = useRef<HTMLAudioElement>(new Audio('back.mp3'));
  const [sound, setSound] = useState<boolean>(false);

  useEffect(() => {
    if (sound) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [sound]);
  // console.log(process.env);

  // const REACT_APP_OKTO_CLIENT_API = process.env.REACT_APP_OKTO_CLIENT_API || "";
  const apiKey = import.meta.env.VITE_OKTO_CLIENT_API;
  return (
    <div className='h-screen w-screen '>
      <Analytics/>
      <div className="fixed top-2 left-2 rounded-full">
        <button
          className="text-white text-3xl p-2 focus:outline-none rounded-full border hover:bg-black"
          onClick={() => setSound(!sound)}
        >
          {sound ? (<HiMiniSpeakerXMark className="text-4xl" />) : (<HiMiniSpeakerWave className="text-4xl" />)}
        </button>
      </div>
      <Router>
        <OktoProvider apiKey={apiKey} buildType={BuildType.SANDBOX}>
          <Routes>
            <Route path="/" element={ <Landing/> } />
            <Route path="/ComingSoon" element={ <ComingSoon/> } />
            <Route path="/games" element={ <Games/> } />
          </Routes>
        </OktoProvider>
      </Router>
    </div>
  )
}

export default App
