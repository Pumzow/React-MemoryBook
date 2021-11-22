import { useState } from 'react';
import {Routes, Route } from 'react-router-dom';

import Header from './components/Header.js';
import Latest from './components/Latest.js';
import Memories from './components/Memories.js';
import Share from './components/Share';
import Footer from './components/Footer';

import './App.css';
import '../src/styles/Header.css'
import '../src/styles/Latest.css'
import '../src/styles/Share.css'
import '../src/styles/Footer.css'

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Latest />} />
          <Route path="/Latest" element={<Latest />} />
          <Route path="/Memories" element={<Memories />} />
          <Route path="/Share" element={<Share />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
