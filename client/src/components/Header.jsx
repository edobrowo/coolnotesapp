import { useState } from 'react';
import {
  HiDocumentText,
  HiViewList,
  HiViewGrid,
  HiCog,
  HiUser,
  HiLogout,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Header() {
  const views = [<HiViewList />, <HiViewGrid />];

  const user = { view: 0 }; // dummy

  const [view, setView] = useState(user ? user.view : 0);

  function onChangeView() {
    setView((view + 1) % views.length);
    console.log('change view');
  }

  function onLogout() {
    console.log('logout');
  }

  return (
    <header className="header">
      <div className="brand">
        <Link to="/">
          <HiDocumentText />
          cool_notes_app
        </Link>
      </div>
      <ul className="options">
        <li>
          <div onClick={onChangeView}>{views[view]}</div>
        </li>
        <li>
          <HiCog />
        </li>
        {!user ? (
          <li>
            <Link to="/login">
              <HiUser />
            </Link>
          </li>
        ) : (
          <li>
            <HiLogout onClick={onLogout} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
