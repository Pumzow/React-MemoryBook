import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();

    const auth = getAuth();

    const [user, setUser] = useState();
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    });

    if (user !== null) {
        navigate("/Memories");
    }

    const onLoginHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { email, password } = Object.fromEntries(formData)



        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //navigate("/Memories");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);

                if (errorCode === "auth/invalid-email" || "auth/wrong-password") {
                    setInvalidCredentials(true);
                }
            });
    };

    return (
        <section className="Login">
            <h1> Login User </h1>
            <form id="Login-Form" onSubmit={onLoginHandler}>
                <div className="container"
                >
                    {invalidCredentials ? <p className="InvalidField"> Invalid Credentials</p> : <></>}

                    <label htmlFor="leg-title"> E-mail </label><br />
                    <input id="Login-Form-Email" type="text" name="email" placeholder="Enter e-mail..." /><br />

                    <label htmlFor="category"> Password </label><br />
                    <input id="Login-Form-Password" type="password" name="password" placeholder="Enter password..." /><br />

                    <input className="btn submit" type="submit" value="Login" />
                </div>
            </form>
        </section>
    );


};

export default Login;
