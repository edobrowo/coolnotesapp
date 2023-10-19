import {
  HiDocumentText,
  HiViewList,
  HiViewGrid,
  HiColorSwatch,
  HiUser,
  HiLogout,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Header({ user, handleUserChanged }) {
  const viewIcons = new Map([
    ['list', <HiViewList />],
    ['grid', <HiViewGrid />],
  ]);

  function onChangeView() {
    const updatedView = user.view === 'list' ? 'grid' : 'list';
    handleUserChanged({ ...user, view: updatedView });
  }

  function onChangeTheme() {
    const updatedTheme = user.theme === 'dark' ? 'light' : 'dark';
    handleUserChanged({ ...user, theme: updatedTheme });
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
          <div onClick={onChangeView}>
            {viewIcons.get(user.view ? user.view : 'list')}
          </div>
        </li>
        <li>
          <HiColorSwatch onClick={onChangeTheme} />
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
