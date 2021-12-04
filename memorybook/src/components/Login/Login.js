import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';

import { getAuth ,signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const navigate = useNavigate();
  
    const {user} = useContext(AuthContext);
    
    if (user !== null) {
        navigate("/Memories");
    }

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const onLoginHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { email, password } = Object.fromEntries(formData)

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //navigate("/Memories");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);

                if (errorCode === "auth/invalid-email" || errorCode === "auth/wrong-password") {
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
