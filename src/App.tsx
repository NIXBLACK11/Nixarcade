import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing'
import './App.css'

function App() {
  return (
    <div className='h-screen w-screen '>
      <Router>
        <Routes>
          <Route path="/" element={ <Landing/> } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
