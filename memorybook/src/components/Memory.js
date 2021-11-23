import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase';
import MemoryDetailsItem from './MemoryDetailsItem.js';



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
            <section className="Latest">
                <MemoryDetailsItem key={memory.id} memory = {memory}/>
            </section>
      );
};


export default Memory;
