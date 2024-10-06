import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OktoProvider, BuildType } from 'okto-sdk-react';
// import Landing from './pages/Landing'
import './App.css'
import { ComingSoon } from './components/ComingSoon';
import { Games } from './pages/Games';
import Landing from './pages/Landing';


function App() {
  const REACT_APP_OKTO_CLIENT_API = process.env.REACT_APP_OKTO_CLIENT_API || "";
  return (
    <div className='h-screen w-screen '>
      <Router>
        <OktoProvider apiKey={REACT_APP_OKTO_CLIENT_API} buildType={BuildType.SANDBOX}>
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
