import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase';
import { getAuth } from "firebase/auth";

import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import MemoryItem from './Items/MemoryItem.js';



const Memories = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  });

  if (user === null) {
    navigate("/Login");
  }

  const [memories, setMemories] = useState([]);
  const memoriesRef = collection(db, "Memories");

  useEffect(() => {
    const getMemories = async () => {
      const data = await getDocs(memoriesRef);
      setMemories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    <section className="Memories">
      <h1> Memory Book </h1>
      {length > 0
        ? <article className="Memories-Slider">
          <FaArrowAltCircleLeft className='Memories-Item-Previous' onClick={prevSlide} />
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

          <FaArrowAltCircleRight className='Memories-Item-Next' onClick={nextSlide} />
        </article>
        : <p> Searching for memories... </p>
      }
    </section>
  );


};

export default Memories;
