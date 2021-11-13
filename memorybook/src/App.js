import { useState, createElement } from 'react';

import Header from './components/Header.js';
import Latest from './components/Latest.js';
import Book from './components/Book.js';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [page, setPage] = useState('/Latest')

  const routes = {
    '/Latest': <Latest />,
    '/Book': <Book />,
  };

  const navigationChangeHandler = (path) =>{
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
