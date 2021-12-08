import { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';

import MemoryItem from '../Items/MemoryItem';

import Welcome from './HomeWelcome';

const Home = () => {
  const [memories, setMemories] = useState([]);
  const memoriesRef = collection(db, "Memories");

  useEffect(() => {
    const getMemories = async () => {
      const data = await getDocs(memoriesRef);
      setMemories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort(compareLatest).slice(0, 3));
    }

    getMemories();
  }, []);

  const [current, setCurrent] = useState(0);
  const length = memories.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <>
      <Welcome />
      <section className="Home">
        <h1> Most Liked Memories </h1>
        {length > 0
          ? <article className="Home-Slider">
            <FaArrowAltCircleLeft className='Home-Item-Previous' onClick={prevSlide} />
            {memories.map((memory, index) => {
              return (
                <div
                  className={index === current ? 'slide active' : 'slide'}
                  key={index}
                >
                  {index === current && (
                    <MemoryItem key={memory.id} memory={memory} />
                  )}
                </div>
              );
            })}
            <FaArrowAltCircleRight className='Home-Item-Next' onClick={nextSlide} />
          </article>
          : <p> Searching for memories... </p>
        }
      </section>
    </>
  );
};

export default Home;

const compareLatest = (a, b) => {
  return b.Likes.length - a.Likes.length;
};
