import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase';
import MemoryDetailsItem from './Items/MemoryDetailsItem.js';



const Memory = () => {
  const navigate = useNavigate();

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

  const onDeleteHandler = async(e) =>{
    e.preventDefault();

    await deleteDoc(doc(db, "Memories", memoryId));

    navigate("/Memories");
  }

  return (
    <section>
      <article>
        <MemoryDetailsItem key={memoryId} memory={memory} />
      </article>
      <article className="Memory-Interactions">
        <button> Like </button>
        <button> <Link to={`/memory/edit/${memoryId}`} > Edit </Link> </button>
        <button onClick={onDeleteHandler}>Delete</button>
      </article>
    </section>

  );
};


export default Memory;