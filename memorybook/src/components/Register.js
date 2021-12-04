import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext';

import { db } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore'

const Register = () => {
    const navigate = useNavigate();
  
    const {user} = useContext(AuthContext);
  
    if (user !== null) {
      navigate("/Memories");
    }

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidRepeatPassword, setInvalidRepeatPassword] = useState(false);
    const [invalidImageUrl, setInvalidImageUrl] = useState(false);

    const onRegisterHandler = async (e) => {
        e.preventDefault();

        setInvalidEmail(false);
        setInvalidUsername(false); 
        setInvalidPassword(false);
        setInvalidRepeatPassword(false);
        setInvalidImageUrl(false);

        let formData = new FormData(e.currentTarget);
        let { email, username, password, repeatPassword, imageUrl } = Object.fromEntries(formData)

        if (username.length <= 3 || username.length > 18) {
            console.log("here");
            setInvalidUsername(true);
            return;
        }

        if (password !== repeatPassword) {
            setInvalidRepeatPassword(true);
            return;
        }

        if(imageUrl == null || imageUrl === '' || document.querySelector('#UserPreviewImage').src === 'https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1'){
            setInvalidImageUrl(true);
            return;
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: username,
                    photoURL: imageUrl
                });

                saveUserToDatabase(user.uid, username);
            })
            .catch((error) => {
                const errorCode = error.code;

                console.log(errorCode);

                if (errorCode === "auth/invalid-email" || errorCode === "auth/email-already-in-use") {
                    setInvalidEmail(true);
                }
                if (errorCode === "auth/weak-password" || errorCode === "auth/internal-error" || password.length > 32) {
                    setInvalidPassword(true);
                }
            });
    };

    const saveUserToDatabase = async (id, username) => {
        const usersRef = collection(db, "Users");

        await addDoc(
            usersRef, {
            Id: id,
            Username: username,
        })
            .then(() => {
                navigate("/Memories");
            })
            .catch((error) => {
                alert("Unsuccessful operation, error: " + error)
            })
    }

    return (
        <section className="Register">
            <h1> Register User </h1>
            <form id="Register-Form" onSubmit={onRegisterHandler}>
                <div className="container">

                    {invalidEmail ? <p className="InvalidField"> Wrong E-mail or it's already in use</p> : <></>}
                    {invalidUsername ? <p className="InvalidField"> Username must be 6 - 18 characters long</p> : <></>}
                    {invalidPassword ? <p className="InvalidField"> Password must be 6 - 32 characters long</p> : <></>}
                    {invalidRepeatPassword ? <p className="InvalidField"> Both passwords must match</p> : <></>}
                    {invalidImageUrl ? <p className="InvalidField"> Invalid image URL</p> : <></>}

                    <label htmlFor="leg-title"> E-mail </label><br />
                    <input id="Register-Form-Email" type="text" name="email" placeholder="Enter e-mail..." /><br />

                    <label htmlFor="category"> Username </label><br />
                    <input id="Register-Form-Username" type="text" name="username" placeholder="Enter username..." /><br />

                    <label htmlFor="category"> Password </label><br />
                    <input id="Register-Form-Password" type="password" name="password" placeholder="Enter password..." /><br />

                    <label htmlFor="category"> Repeat Password </label><br />
                    <input id="Register-Form-Repeat-Password" type="password" name="repeatPassword" placeholder="Repeat password..." /><br />

                    <label htmlFor="game-img">Image URL </label><br />
                    <input id="Register-Form-ImageURL" type="text" name="imageUrl" placeholder="Upload a photo..." onChange={ChangeUserPreviewImage} /><br />

                    <input className="btn submit" type="submit" value="Register" />
                </div>
                <div id="UserPreviewImage-parent">
                    <img id="UserPreviewImage" src="https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1" alt="" />
                </div>
            </form>
        </section>
    );


};

const ChangeUserPreviewImage = (e) => {
    e.preventDefault();

    const memoryPreviewImageRef = document.querySelector('#UserPreviewImage');
    const imageUrlRef = document.querySelector('#Register-Form-ImageURL');

    fetch(imageUrlRef.value, {
        method: 'HEAD'
    })
        .then(res => {
            if (res.ok) {
                console.log('Image exists.');
                memoryPreviewImageRef.src = imageUrlRef.value
            } else {
                console.log('Image does not exist.');
                memoryPreviewImageRef.src = "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1";
            }
        }).catch(err => {

            memoryPreviewImageRef.src = "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1";
        });
}

export default Register;
