import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [user, setUser] = useState(auth.displayName);

    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    });

    const signOutHandler = () => {
        console.log("Sign out!");

        const auth = getAuth();
        auth.signOut();
        navigate("/");
    }

    return (
        <header className="NavBar">
            <h1 className="NavBar-Logo"> <NavLink to="/"> MemoryBook </NavLink></h1>
            <nav className="NavBar-Menu">
                <ul>
                    <li>
                        <h3> <NavLink to="/Home">  Home  </NavLink></h3>
                    </li>
                    {user != null
                        ? <>
                            <li>
                                <h2><NavLink to="/Memories">  Memories  </NavLink></h2>
                            </li>
                            <li>
                                <h3><NavLink to="/Share">  Share  </NavLink></h3>
                            </li>
                        </>
                        : <></>
                    }
                </ul>
            </nav>
            <ul className="NavBar-Account">
                {user != null
                    ? <>
                        <li>
                            <NavLink to="/Profile"> {user.displayName} </NavLink>
                        </li>
                        <li>
                            <p className="SignOut" onClick={signOutHandler}> Sign out </p>
                        </li>
                    </>
                    : <>
                        <li>
                            <NavLink to="/Login"> Login </NavLink>
                        </li>
                        <li>
                            <NavLink to="/Register"> Register </NavLink>
                        </li>
                    </>
                }
            </ul>
        </header>
    );
};

export default Header;

