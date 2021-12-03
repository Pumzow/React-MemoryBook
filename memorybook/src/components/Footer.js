import { NavLink, useNavigate } from 'react-router-dom';

function Footer() {

    return (
        <footer className="Footer">
            <p>Copyright © 2021 MemoryBook. All Rights Reserved. <NavLink to="Privacy-Policy">Privacy Policy</NavLink></p>
            
        </footer>
    );
  }
  
  export default Footer;
  