import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase';

const Register = () => {
    const navigate = useNavigate();

    const onShareHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { title, description, imageUrl } = Object.fromEntries(formData)

        console.log(title, description, imageUrl);

        const memoriesRef = collection(db, "Memories");

        const docRef = await addDoc(
            memoriesRef, {
            Title: title,
            Description: description,
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
        <section className="Register">
            <h1> Register User </h1>
            <form id="Register-Form" onSubmit={onShareHandler}>
                <div className="container">
                    <label htmlFor="leg-title"> E-mail </label><br />
                    <input id="Register-Form-Email" type="text" name="email" placeholder="Enter e-mail..." /><br />

                    <label htmlFor="category"> Username </label><br />
                    <input id="Register-Form-Username" type="text" name="username" placeholder="Enter username..." /><br />

                    <label htmlFor="category"> Password </label><br />
                    <input id="Register-Form-Password" type="password" name="password" placeholder="Enter password..." /><br />

                    <label htmlFor="category"> Repeat Password </label><br />
                    <input id="Register-Form-Password" type="password" name="repea-password" placeholder="Repeat password..." /><br />

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
            console.log('Error:', err);

            memoryPreviewImageRef.src = "https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1";
        });
}

export default Register;