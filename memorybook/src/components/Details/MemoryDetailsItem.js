import { Link } from 'react-router-dom';

const MemoryDetailsItem = ({
  memory, name
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;
  const description = memory.Description;
  const ownerId = memory.OwnerId;

  return (
    <section className="Memory-Details">
      <article className="Memory-Details-Item">
        <h3 className="Memory-Details-Item-Title"> {title} </h3>
        <h3 className="Memory-Details-Item-Date"> {date} </h3>
        <img src={imageURL} alt="" />
      </article>
      <article className="Memory-Details-Item-Description">
        {memory !== undefined
          ? 
          <>
            <Link className="Link-Without-Decoration" to={`/Profile/${ownerId}`}><h3> {name} </h3></Link>
            <p> {description} </p>
          </>
          : <p>...Loading</p>
        }
      </article>
    </section>
  );
};

export default MemoryDetailsItem;