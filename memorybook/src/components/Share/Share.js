import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';

import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore'

const Share = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  if (user === null) {
    navigate("/Login");
  }

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [invalidImageUrl, setInvalidImageUrl] = useState(false);

  const onShareHandler = async (e) => {
    e.preventDefault();

    setInvalidTitle(false);
    setInvalidDescription(false);
    setInvalidImageUrl(false);

    let formData = new FormData(e.currentTarget);
    let { title, description, imageUrl } = Object.fromEntries(formData)

    if (title.length === '' || title.length > 32) {
      setInvalidTitle(true);
      return;
    }
    if (description.length > 150) {
      setInvalidDescription(true);
      return;
    }
    if (imageUrl == null || imageUrl === '' || document.querySelector('#MemoryPreviewImage').src === 'https://merriam-webster.com/assets/mw/images/gallery/gal-home-edpick-lg/empty-speech-bubble-7508-68642ecb0f0a19313dd31c16f67e67e1@1x.jpg') {
      setInvalidImageUrl(true);
      return;
    }

    const memoriesRef = collection(db, "Memories");

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    const sharedDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();

    await addDoc(
      memoriesRef, {
      Title: title,
      Description: description,
      Date: sharedDate,
      ImageURL: imageUrl,
      OwnerId: user.uid,
      Likes: 0
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
          {invalidTitle ? <p className="InvalidField"> Title must be 1-32 characters long </p> : <></>}
          {invalidDescription ? <p className="InvalidField"> Description must be maximum of 150 characters long </p> : <></>}
          {invalidImageUrl ? <p className="InvalidField"> Invalid image URL </p> : <></>}

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
