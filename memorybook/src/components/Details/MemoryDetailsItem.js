import { useState, useEffect } from 'react';

import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore'

const MemoryDetailsItem = ({
  memory, name
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;
  const description = memory.Description;

  return (
    <section className="Memory-Details">
      <article className="Memory-Details-Item">
        <h3 className="Memory-Details-Item-Title"> {title} </h3>
        <h3 className="Memory-Details-Item-Date"> {date} </h3>
        <img src={imageURL} alt="" />
      </article>
      <article className="Memory-Details-Item-Description">
        {name !== undefined
          ? 
          <>
            <h3> {name} </h3>
            <p> {description} </p>
          </>
          : <p>...Loading</p>
        }
      </article>
    </section>
  );
};

export default MemoryDetailsItem;