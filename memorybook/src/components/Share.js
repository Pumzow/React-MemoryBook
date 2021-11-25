import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase';

const Share = () => {
  const navigate = useNavigate();

  const onShareHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let { title, description, imageUrl } = Object.fromEntries(formData)

    console.log(title, description, imageUrl);

    const memoriesRef = collection(db, "Memories");

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    const sharedDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();

    const docRef = await addDoc(
      memoriesRef, {
      Title: title,
      Description: description,
      Date: sharedDate,
      ImageURL: imageUrl,
    }
    )
      .then(() => {
        navigate("/Memories");
      })
      .catch((error) => {
        alert("Unsuccessful operation, error: " + error)
      })
  };

  return (
    <section className="Share">
      <h1> Share Memory </h1>
      <form id="Share-Form" onSubmit={onShareHandler}>
        <div className="container">
          <label htmlFor="leg-title"> Title </label><br />
          <input id="Share-Form-Title" type="text" name="title" placeholder="Enter memory title..." /><br />

          <label htmlFor="category"> Description </label><br />
          <textarea id="Share-Form-Description" type="text" name="description" placeholder="Enter memory description..." /><br />

          <label htmlFor="game-img">Image URL </label><br />
          <input id="Share-Form-ImageURL" type="text" name="imageUrl" placeholder="Upload a photo..." onChange={ChangeMemoryPreviewImage} /><br />

          <input className="btn submit" type="submit" value="Share" />
        </div>
        <div id="MemoryPreviewImage-parent">
          <img id="MemoryPreviewImage" src="https://merriam-webster.com/assets/mw/images/gallery/gal-home-edpick-lg/empty-speech-bubble-7508-68642ecb0f0a19313dd31c16f67e67e1@1x.jpg" alt="" />
        </div>
      </form>
    </section>
  );


};



const ChangeMemoryPreviewImage = (e) => {
  e.preventDefault();

  const memoryPreviewImageRef = document.querySelector('#MemoryPreviewImage');
  const imageUrlRef = document.querySelector('#Share-Form-ImageURL');

  fetch(imageUrlRef.value, {
    method: 'HEAD'
  })
    .then(res => {
      if (res.ok) {
        console.log('Image exists.');
        memoryPreviewImageRef.src = imageUrlRef.value
      } else {
        console.log('Image does not exist.');
        memoryPreviewImageRef.src = "https://merriam-webster.com/assets/mw/images/gallery/gal-home-edpick-lg/empty-speech-bubble-7508-68642ecb0f0a19313dd31c16f67e67e1@1x.jpg";
      }
    }).catch(err => console.log('Error:', err));
}

export default Share;
