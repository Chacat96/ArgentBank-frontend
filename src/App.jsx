import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Login from "./pages/Login";
import Accueil from './pages/Accueil';
import Profile from './pages/Profile';
import Layout from './pages/Layout';


function App() {
  const dispatch = useDispatch();
  
  // Vérifier si le token est présent dans le localStorage ou sessionStorage
  useEffect(() => {
    const token = localStorage.getItem("token") ?? sessionStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess({ token }));
    }
  }, [dispatch]);

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
