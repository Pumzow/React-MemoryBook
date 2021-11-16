import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase';

import LatestItem from '../components/LatestItem.js';

const Latest = () => {
  const [memories, setMemories] = useState([]);
  const memoriesRef = collection(db, "Memories");

  useEffect(() => {
    const getMemories = async () =>{
      const data = await getDocs(memoriesRef);
      setMemories(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getMemories();
  }, []);

    return (
      <section className="Latest">
        <h1>Latest Memories</h1>

        
      
              
        <article className="Latest-Items">
          <ul className="Latest-Items-List">    
            {memories.map(memory => {
              return <LatestItem key={memory.id} memory = {memory}/>
            })} 
          </ul>
        </article>
      </section>
  );
};
  
export default Latest;
