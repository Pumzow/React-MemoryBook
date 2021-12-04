import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import Memories from './components/Memories.js';
import Memory from './components/Memory';
import Share from './components/Share';
import Edit from './components/Edit';
import Footer from './components/Footer';
import Policy from './components/Policy';

import './App.css';
import '../src/styles/Header.css'
import '../src/styles/Login.css'
import '../src/styles/Register.css'
import '../src/styles/Home.css'
import '../src/styles/Memories.css'
import '../src/styles/Details.css'
import '../src/styles/Share.css'
import '../src/styles/Edit.css'
import '../src/styles/Footer.css'
import '../src/styles/Policy.css'

function App() {
  return (
    <div className="App">
      <Header />

      <main>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Memories" element={<Memories />} />
            <Route path="/Memory/:memoryId" element={<Memory />} />
            <Route path="/Memory/Edit/:memoryId" element={<Edit />} />
            <Route path="/Share" element={<Share />} />
            <Route path="/Privacy-Policy" element={<Policy />} />
          </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
