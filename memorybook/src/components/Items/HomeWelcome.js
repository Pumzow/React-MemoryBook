import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext'

const Welcome = () => {
  const {user} = useContext(AuthContext);

    return (
        <section className="Home-Welcome">
          <h1> Welcome to MemoryBook </h1>
          {user !== null
            ? <p> Here you can share your memories. <NavLink to="/Share"><u>Start sharing now.</u></NavLink></p>
            : <p> <NavLink to="/Register"><u>Register</u></NavLink> or <NavLink to="/Login"><u>Login</u></NavLink> to start sharing your memories with everyone.</p>
          }
  
  
        </section>
  );
};
  
export default Welcome;