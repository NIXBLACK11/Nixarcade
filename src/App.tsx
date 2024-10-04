import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import './App.css'
import { ComingSoon } from './components/ComingSoon';
<<<<<<< HEAD
import { Games } from './pages/Games';
=======
>>>>>>> ed2a81fbf23884c6c66cb0313047d3f44d65e677

function App() {
  return (
    <div className='h-screen w-screen '>
      <Router>
        <Routes>
          <Route path="/" element={ <Landing/> } />
          <Route path="/ComingSoon" element={ <ComingSoon/> } />
<<<<<<< HEAD
          <Route path="/games" element={ <Games/> } />
=======
>>>>>>> ed2a81fbf23884c6c66cb0313047d3f44d65e677
        </Routes>
      </Router>
    </div>
  )
}

export default App
