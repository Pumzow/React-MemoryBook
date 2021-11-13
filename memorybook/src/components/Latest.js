import LatestItem from '../components/LatestItem.js';

const Latest = () => {
    return (
      <section className="Latest">
        <h1>Latest Memories</h1>
              
        <article className="Latest-Items">
          <ul className="Latest-Items-List">            
            <LatestItem />
            <LatestItem />
            <LatestItem />
          </ul>
        </article>
      </section>
  );
};
  
export default Latest;
