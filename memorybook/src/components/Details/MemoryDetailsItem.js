import { useState, useEffect } from 'react';

import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore'

const MemoryDetailsItem = ({
  memory, memoryId
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;
  const description = memory.Description;

  const [owenerId, setOwnerId] = useState();

  useEffect(() => {
    const getMemory = async () => {
      const docRef = doc(db, "Memories", memoryId);
      const docSnap = await getDoc(docRef);
      setOwnerId(docSnap.data());
    }

    getMemory();
  }, [memoryId]);

  return (
    <section className="Memory-Details">
      <article className="Memory-Details-Item">
        <h3 className="Memory-Details-Item-Title"> {title} </h3>
        <h3 className="Memory-Details-Item-Date"> {date} </h3>
        <img src={imageURL} alt="" />
      </article>
      <article className="Memory-Details-Item-Description">
        <h3> asd </h3>
        <p> {description} </p>
      </article>
    </section>
  );
};

export default MemoryDetailsItem;