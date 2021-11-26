import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
      <header className="NavBar">
        <h1 className="NavBar-Logo"> <NavLink to="/"> MemoryBook </NavLink></h1>
        <nav className="NavBar-Menu">
            <ul>
                <li>
                <h3> <NavLink to="/Latest">  Latest  </NavLink></h3>
                </li>
                <li>
                <h2><NavLink to="/Memories">  Memories  </NavLink></h2>
                </li>
                <li>
                <h3><NavLink to="/Share">  Share  </NavLink></h3>
                </li>
            </ul>
        </nav>
        <ul className="NavBar-Account">
            <li>
                <NavLink to="/Profile"> Profile </NavLink>
            </li>
            <li>
                <NavLink to="/SignOut"> Sign out </NavLink>
            </li>
            <li>
                <NavLink to="/Login"> Login </NavLink>
            </li>
            <li>
                <NavLink to="/Register"> Register </NavLink>
            </li>
        </ul>
      </header>
  );
};
  
export default Header;
