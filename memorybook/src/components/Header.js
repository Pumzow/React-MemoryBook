const Header = ({navigationChangeHandler}) => {
    const onHeaderClick = (e) => {
        e.preventDefault();

        if(e.target.tagName === 'A') 
        {
            let url = new URL(e.target.href);
            navigationChangeHandler(url.pathname);
        }
    };

    return (
      <header className="NavBar" onClick={onHeaderClick}>
        <h1 className="NavBar-Logo"> <a href="/Latest"> MemoryBook </a></h1>
        <nav className="NavBar-Menu">
            <ul>
                <li>
                <h3> <a href="/Latest">  Latest  </a></h3>
                </li>
                <li>
                <h2><a href="/Book">  Book  </a></h2>
                </li>
                <li>
                <h3><a href="/Share">  Share  </a></h3>
                </li>
            </ul>
        </nav>
        <ul className="NavBar-Account">
            <li>
                <a href="/Profile"> Profile </a>
            </li>
            <li>
                <a href="/SignOut"> Sign out </a>
            </li>
        </ul>
      </header>
  );
};
  
export default Header;
