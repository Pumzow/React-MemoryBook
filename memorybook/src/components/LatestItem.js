const LatestItem = ({
  memory,
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;

    return (
            <li className="Latest-Items-List-Item">
              <h3 className="Latest-Items-List-Item-Title"> {title} </h3>
              <h3 className="Latest-Items-List-Item-Date"> asdasd </h3>
              <img src={imageURL}  alt=""/>
            </li>
  );
};
  
export default LatestItem;