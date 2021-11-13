const Header = () => {
    const onHeaderClick = (e) => {
        e.preventDefault();

        if(e.target.tagName === 'A') 
        {
            let url = new URL(e.target.href);

            console.log(url.pathname);
        }
    };

    return (
      <header className="NavBar" onClick={onHeaderClick}>
        <h1 className="NavBar-Logo"> MemoryBook </h1>
        <nav className="NavBar-Menu">
            <ul>
                <li>
                    <a href="/Latest"> Latest </a>
                </li>
                <li>
                    <a href="/Book"> Book </a>
                </li>
                <li>
                    <a href="/Share"> Share </a>
                </li>
            </ul>
        </nav>
      </header>
  );
};
  
export default Header;
