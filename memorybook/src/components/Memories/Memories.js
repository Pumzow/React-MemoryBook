import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';

import MemoryItem from './MemoriesMemoryItem';



const Memories = () => {
  const navigate = useNavigate();

  const {user} = useContext(AuthContext);

  if (user === null) {
    navigate("/Login");
  }

  const [memories, setMemories] = useState([]);
  const memoriesRef = collection(db, "Memories");

  useEffect(() => {
    const getMemories = async () => {
      const data = await getDocs(memoriesRef);
      setMemories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse());
    }

    getMemories();
  }, []);

  const length = memories.length;

  return (
    <section className="Memories">
      <h1> Memories </h1>
      {length > 0
        ? <article>
          {memories.map((memory) => {
            return (
              <MemoryItem key={memory.id} memory={memory} />
            );
          })}
        </article>
        : <p> Searching for memories... </p>
      }
    </section>
  );


};

export default Memories;
