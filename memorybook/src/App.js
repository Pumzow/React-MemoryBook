import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { getAuth } from "firebase/auth";

import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Home from './components/Home/Home.js';
import Memories from './components/Memories/Memories.js';
import Memory from './components/Details/Memory';
import Share from './components/Share/Share';
import Edit from './components/Edit/Edit.js';
import Footer from './components/Footer/Footer';
import Policy from './components/Policy/Policy';

import { AuthContext } from './contexts/AuthContext.js';

import './App.css';
import '../src/components/Header/Header.css'
import '../src/components/Login/Login.css'
import '../src/components/Register/Register.css'
import '../src/components/Home/Home.css'
import '../src/components/Memories/Memories.css'
import '../src/components/Details/Details.css'
import '../src/components/Share/Share.css'
import '../src/components/Edit/Edit.css'
import '../src/components/Footer/Footer.css'
import '../src/components/Policy/Policy.css'

function App() {
  const auth = getAuth();

  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [auth]);


  return (
    <AuthContext.Provider value={{user}}>
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
    </AuthContext.Provider>
  );
}

export default App;
