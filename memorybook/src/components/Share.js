import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase';

const Book = () => {

    return (
      <section className="Share">
        <h1> Share Memory </h1>
        <form id="Share-Form">
            <div className="container">
              <label htmlFor="leg-title"> Title: </label>
              <input id="Share-Form-Title" type="text" name="title" placeholder="Enter memory title..." /><br/>

              <label htmlFor="category"> Description: </label>
              <input id="Share-Form-Description" type="text" name="description" placeholder="Enter memory description..." /><br/>

              <label htmlFor="game-img">Image URL:</label>
              <input id="Share-Form-ImageURL" type="text" name="imageUrl" placeholder="Upload a photo..." /><br/>

              <input className="btn submit" type="submit" value="Share" onClick={ShareMemory}/>
            </div>
        </form>
    </section>
  );

  
};


async function ShareMemory(e){

  const memoriesRef = collection(db, "Memories");

  const titleRef = document.querySelector('#Share-Form-Title');
  const descriptionRef = document.querySelector('#Share-Form-Description');
  const imageUrlRef = document.querySelector('#Share-Form-ImageURL');

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const date = new Date();
  const sharedDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();

  e.preventDefault();
  const docRef = await addDoc(
    memoriesRef, {
      Title: titleRef.value,
      Description: descriptionRef.value,
      Date: sharedDate,
      ImageURL: imageUrlRef.value,
    }
  )
  .then(() =>{
    alert("Data added successfully.");
  })
  .catch((error) => {
    alert("Unsuccessful operation, error: " + error)
  })
}

export default Book;
