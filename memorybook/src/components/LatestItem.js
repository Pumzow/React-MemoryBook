const LatestItem = () => {
    return (
            <li className="Latest-Items-List-Item">
              <h3 className="Latest-Items-List-Item-Title"> Memory Title </h3>
              <h3 className="Latest-Items-List-Item-Date"> 11.13.2021y. </h3>
              <img src={require('../images/Background.jpeg').default}  alt=""/>
            </li>
  );
};
  
export default LatestItem;