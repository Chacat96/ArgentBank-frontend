import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from "./pages/Login";
import Accueil from './pages/Accueil';
import Profile from './pages/Profile';
import Layout from './pages/Layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route element={<Layout />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/Profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
  )
}

export default App
