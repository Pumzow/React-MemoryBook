import { useState } from 'react';

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
  const [page, setPage] = useState('/Latest')

  const routes = {
    '/Latest': <Latest />,
    '/Memories': <Memories />,
    '/Share': <Share />,
  };

  const navigationChangeHandler = (path) =>{
    console.log(path);
    setPage(path);
  }

  return (
    <div className="App">
      <Header navigationChangeHandler={navigationChangeHandler}/>

      <main>
        {routes[page] || <h2> 404 Not Found! </h2> }
      </main>

      <Footer />
    </div>
  );
}

export default App;
