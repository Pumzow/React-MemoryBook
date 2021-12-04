const MemoryDetailsItem = ({
  memory,
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;
  const description = memory.Description;

    return (
      <section className="Memory-Details">
        <article  className="Memory-Details-Item">
          <h3 className="Memory-Details-Item-Title"> {title} </h3>
          <h3 className="Memory-Details-Item-Date"> {date} </h3>
          <img src={imageURL}  alt=""/>
        </article>
        <article className="Memory-Details-Item-Description">
          <p> {description} </p>
        </article>
      </section>
  );
};
  
export default MemoryDetailsItem;