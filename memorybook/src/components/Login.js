import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const auth = getAuth();

    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    });

    if(user !== null)
    {
      navigate("/Memories");
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { email, username, password } = Object.fromEntries(formData)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //navigate("/Memories");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <section className="Login">
            <h1> Login User </h1>
            <form id="Login-Form" onSubmit={onLoginHandler}>
                <div className="container">
                    <label htmlFor="leg-title"> E-mail </label><br />
                    <input id="Login-Form-Email" type="text" name="email" placeholder="Enter e-mail..." /><br />

                    <label htmlFor="category"> Username </label><br />
                    <input id="Login-Form-Username" type="text" name="username" placeholder="Enter username..." /><br />

                    <label htmlFor="category"> Password </label><br />
                    <input id="Login-Form-Password" type="password" name="password" placeholder="Enter password..." /><br />

                    <input className="btn submit" type="submit" value="Login" />
                </div>
            </form>
        </section>
    );


};

export default Login;
