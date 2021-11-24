import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase';
import MemoryDetailsItem from './Items/MemoryDetailsItem.js';



const Memory = () => {
   const { memoryId } = useParams(); 

  const [memory, setMemory] = useState({});

  useEffect(() => {
    const getMemory = async () =>{
       const docRef = doc(db, "Memories", memoryId);
       const docSnap = await getDoc(docRef);
       setMemory(docSnap.data());
       console.log(docSnap.data());
    }

    getMemory();
  }, [memoryId]);

        return (
            <section>
              <article>
                <MemoryDetailsItem key={memory.id} memory = {memory}/>
              </article>
              <article className="Memory-Interactions">
                <button>Like</button>
                <button>Edit</button>
                <button>Delete</button>
              </article>
            </section>
            
      );
};


export default Memory;
