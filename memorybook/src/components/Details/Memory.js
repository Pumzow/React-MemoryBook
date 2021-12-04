import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { db } from '../../firebase';
import { getDoc, doc, deleteDoc } from 'firebase/firestore'
import MemoryDetailsItem from './MemoryDetailsItem.js';



const Memory = () => {
  const navigate = useNavigate();

  const {user} = useContext(AuthContext);

  if (user === null) {
    navigate("/Login");
  }
  
  const { memoryId } = useParams();

  const [memory, setMemory] = useState({});

  useEffect(() => {
    const getMemory = async () => {
      const docRef = doc(db, "Memories", memoryId);
      const docSnap = await getDoc(docRef);
      setMemory(docSnap.data());
      console.log(docSnap.data());
    }

    getMemory();
  }, [memoryId]);

  const onEditHandler = async(e) =>{
    e.preventDefault();
    
    navigate(`/memory/edit/${memoryId}`);
  }
  const onDeleteHandler = async(e) =>{
    e.preventDefault();

    await deleteDoc(doc(db, "Memories", memoryId));

    navigate("/Memories");
  }

  return (
    <section>
      <article>
        <MemoryDetailsItem key={memoryId} memory={memory} memoryId={memoryId} />
      </article>
      <article className="Memory-Interactions">
        <button> Like </button>
        <button onClick={onEditHandler}> Edit </button>
        <button onClick={onDeleteHandler}> Delete </button>
      </article>
    </section>

  );
};


export default Memory;
