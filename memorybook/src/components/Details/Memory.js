import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { db } from '../../firebase';
import { getDoc, doc, deleteDoc } from 'firebase/firestore'
import MemoryDetailsItem from './MemoryDetailsItem.js';



const Memory = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  if (user === null) {
    navigate("/Login");
  }

  const { memoryId } = useParams();

  const [memory, setMemory] = useState({});

  const [name, setName] = useState('...Loading')

  useEffect(() => {
    const getMemory = async () => {
      const docRef = doc(db, "Memories", memoryId);
      const docSnap = await getDoc(docRef);
      setMemory(docSnap.data());

      getName(docSnap.data().OwnerId);
    }

    getMemory();
  }, [memoryId]);

  const getName = async (ownerId) => {
    const docRef = doc(db, "Users", ownerId);
    const docSnap = await getDoc(docRef);
    setName(docSnap.data().Username);
  }

  const onEditHandler = async (e) => {
    e.preventDefault();

    navigate(`/memory/edit/${memoryId}`);
  }

  const onDeleteHandler = async (e) => {
    e.preventDefault();

    await deleteDoc(doc(db, "Memories", memoryId));

    navigate("/Memories");
  }

  return (
    <section>
      <article>
        <MemoryDetailsItem key={memoryId} memory={memory} name={name} />
      </article>
      <article className="Memory-Interactions">
        <button> Like </button>
        {user.uid === memory.OwnerId
          ?
            <>
              <button onClick={onEditHandler}> Edit </button>
              <button onClick={onDeleteHandler}> Delete </button>
            </>
          : <></>
        }
      </article>
    </section>

  );
};


export default Memory;
