import Header from './components/Header.js';
import Latest from './components/Latest.js';
import Book from './components/Book.js';
import Footer from './components/Footer';
import './App.css';

function App() {
const routes = {
  '/Latest': Latest,
  '/Book': Book,
};

  return (
    <div className="App">
      <Header />
      <Latest />
      <Book />
      <Footer />
    </div>
  );
}

export default App;
