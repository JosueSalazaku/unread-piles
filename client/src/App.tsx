import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MainLayout from './Layouts/MainLayout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      <Route path="/Home" element={<Home />} />
      <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        </Route>
    </Routes>
  );
}

export default App;

