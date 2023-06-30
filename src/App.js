import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Artistas from './pages/Artistas.jsx';
import Albumes from './pages/Albumes.jsx';
import Canciones from './pages/Canciones.jsx';
import Videos from './pages/Videos.jsx';
import Rankings from './pages/Rankings.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/comment" element={<Canciones />} />
          <Route path="/albumes" element={<Albumes />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;