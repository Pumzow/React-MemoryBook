import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase';

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import MemoryItem from './Items/MemoryItem.js';



const Memories = () => {
  const [memories, setMemories] = useState([]);
  const memoriesRef = collection(db, "Memories");

  useEffect(() => {
    const getMemories = async () =>{
      const data = await getDocs(memoriesRef);
      setMemories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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

    if (!Array.isArray(memories) || memories.length <= 0) {
      return null;
    }

    return (
      <section className="Latest">
        <h1> Memory Book </h1>
        <article className="Latest-Slider">
        <FaArrowAltCircleLeft  className='Latest-Item-Previous' onClick={prevSlide}/>
        {memories.map((memory, index) => {
          return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
                <MemoryItem key={memory.id} memory = {memory}/>
            )}
          </div>
        );
      })}

        <FaArrowAltCircleRight className='Latest-Item-Next' onClick={nextSlide}/>
        </article>
    </section>
  );

  
};

export default Memories;
