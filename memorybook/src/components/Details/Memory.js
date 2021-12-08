import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { db } from '../../firebase';
import { getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import MemoryDetailsItem from './MemoryDetailsItem.js';



const Memory = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  if (user === null) {
    navigate("/Login");
  }

  const { memoryId } = useParams();

  const [memory, setMemory] = useState({});
  const [likes, setLikes] = useState(0);

  const [name, setName] = useState('...Loading')

  useEffect(() => {
    const getMemory = async () => {
      const docRef = doc(db, "Memories", memoryId);
      const docSnap = await getDoc(docRef);
      setMemory(docSnap.data());
      setLikes(docSnap.data().Likes.length)
      getName(docSnap.data().OwnerId);
    }

    getMemory();
  }, [memoryId]);

  const getName = async (ownerId) => {
    const docRef = doc(db, "Users", ownerId);
    const docSnap = await getDoc(docRef);
    setName(docSnap.data().Username);

  }

  const onLikeHandler = async (e) => {
    e.preventDefault();

    const memoryRef = doc(db, 'Memories', memoryId);
    const docSnap = await getDoc(memoryRef);

    const _Likes = docSnap.data().Likes;

    if (_Likes.includes(user.uid)) {
      var index = _Likes.indexOf(user.uid);

      if (index !== -1) {
        _Likes.splice(index, 1);
      }
    }
    else {
      _Likes.push(user.uid);
    }

    await setDoc(
      memoryRef, {
      Likes: _Likes
    }, { merge: true })
      .then(() => {
        setLikes(_Likes.length);
      })
      .catch((error) => {
        alert("Unsuccessful operation, error: " + error)
      });
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
        <button onClick={onLikeHandler}> {memory.Likes !== undefined ? likes : 0}  Like </button>
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
