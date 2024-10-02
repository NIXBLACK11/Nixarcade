import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import './App.css'
import { ComingSoon } from './components/ComingSoon';

function App() {
  return (
    <div className='h-screen w-screen '>
      <Router>
        <Routes>
          <Route path="/" element={ <Landing/> } />
          <Route path="/ComingSoon" element={ <ComingSoon/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
