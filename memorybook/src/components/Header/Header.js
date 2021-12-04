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
            <h1 className="NavBar-Logo"> <NavLink className="NavBar-Menu-Button" to="/"> MemoryBook </NavLink></h1>
            <nav className="NavBar-Menu">
                <ul>
                    <li>
                        <h3> <NavLink className="NavBar-Menu-Button" to="/Home">  Home  </NavLink></h3>
                    </li>
                    {user != null
                        ? <>
                            <li>
                                <h2><NavLink className="NavBar-Menu-Button" to="/Memories">  Memories  </NavLink></h2>
                            </li>
                            <li>
                                <h3><NavLink className="NavBar-Menu-Button" to="/Share">  Share  </NavLink></h3>
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
                            <NavLink className="NavBar-Menu-Button" to="/Profile"> {user.displayName} </NavLink>
                        </li>
                        <li>
                            <p className="NavBar-Menu-Button SignOut" onClick={signOutHandler}> Sign out </p>
                        </li>
                    </>
                    : <>
                        <li>
                            <NavLink className="NavBar-Menu-Button" to="/Login"> Login </NavLink>
                        </li>
                        <li>
                            <NavLink className="NavBar-Menu-Button" to="/Register"> Register </NavLink>
                        </li>
                    </>
                }
            </ul>
        </header>
    );
};

export default Header;

