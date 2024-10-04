import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import './App.css'
import { ComingSoon } from './components/ComingSoon';
import { Games } from './pages/Games';

function App() {
  return (
    <div className='h-screen w-screen '>
      <Router>
        <Routes>
          <Route path="/" element={ <Landing/> } />
          <Route path="/ComingSoon" element={ <ComingSoon/> } />
          <Route path="/games" element={ <Games/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
