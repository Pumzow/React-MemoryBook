const LatestItem = ({
  memory,
}) => {
  const title = memory.Title;
  const date = memory.Date.toString();
  const imageURL = memory.ImageURL;

    return (
            <div className="Latest-Items-List-Item">
              <h3 className="Latest-Items-List-Item-Title"> {title} </h3>
              <h3 className="Latest-Items-List-Item-Date"> {date} </h3>
              <img src={imageURL}  alt=""/>
            </div>
  );
};
  
export default LatestItem;