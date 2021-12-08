import { Link } from 'react-router-dom';

const ProfileMemoryItem = ({
  memory,
}) => {
  const title = memory.Title;
  const date = memory.Date;
  const imageURL = memory.ImageURL;

    return (
            <Link to={`/memory/${memory.id}`}>
              <div  className="Profile-Memories-Items-List-Item">
                <h3 className="Profile-Memories-Items-List-Item-Title"> {title} </h3>
                <h3 className="Profile-Memories-Items-List-Item-Date"> {date} </h3>
                <img src={imageURL}  alt=""/>
              </div>
            </Link>
  );
};
  
export default ProfileMemoryItem;