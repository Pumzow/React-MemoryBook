import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase';

const Book = () => {

    return (
      <section className="Share">
        <h1> Share Memory </h1>
        <form id="Share-Form">
            <div className="container">
              <label htmlFor="leg-title"> Title </label><br/>
              <input id="Share-Form-Title" type="text" name="title" placeholder="Enter memory title..." /><br/>

              <label htmlFor="category"> Description </label><br/>
              <textarea id="Share-Form-Description" type="text" name="description" placeholder="Enter memory description..." /><br/>

              <label htmlFor="game-img">Image URL </label><br/>
              <input id="Share-Form-ImageURL" type="text" name="imageUrl" placeholder="Upload a photo..." onChange={ChangeMemoryPreviewImage}/><br/>

              <input className="btn submit" type="submit" value="Share" onClick={ShareMemory}/>
            </div>
            <div id="MemoryPreviewImage-parent">
              <img id="MemoryPreviewImage" src="https://merriam-webster.com/assets/mw/images/gallery/gal-home-edpick-lg/empty-speech-bubble-7508-68642ecb0f0a19313dd31c16f67e67e1@1x.jpg" alt=""/>
            </div>
        </form>
    </section>
  );

  
};

function ChangeMemoryPreviewImage(e){
  e.preventDefault();

  

  const memoryPreviewImageRef = document.querySelector('#MemoryPreviewImage');
  const imageUrlRef = document.querySelector('#Share-Form-ImageURL');
  
  memoryPreviewImageRef.src = imageUrlRef.value

  fetch('imageUrlRef.value', {
      method: 'HEAD'
   })
   .then(res => {
      if (res.ok) {
         console.log('Image exists.');
      } else {
         console.log('Image does not exist.');
      }
   }).catch(err => console.log('Error:', err));

  if(imageUrlRef.value == "")
  {
    memoryPreviewImageRef.src = "https://merriam-webster.com/assets/mw/images/gallery/gal-home-edpick-lg/empty-speech-bubble-7508-68642ecb0f0a19313dd31c16f67e67e1@1x.jpg";
  }

}

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
