import {
  HiDocumentText,
  HiPlus,
  HiViewList,
  HiViewGrid,
  HiSun,
  HiMoon,
  HiUser,
  HiLogout,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Header({ user, onUserChanged, onAddNoteModalOpen }) {
  const viewIcons = new Map([
    ['list', <HiViewList />],
    ['grid', <HiViewGrid />],
  ]);
  const themeIcons = new Map([
    ['dark', <HiMoon />],
    ['light', <HiSun />],
  ]);

  function handleChangeView() {
    const updatedView = user.view === 'list' ? 'grid' : 'list';
    onUserChanged({ ...user, view: updatedView });
  }

  function handleChangeTheme() {
    const updatedTheme = user.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', updatedTheme);
    onUserChanged({ ...user, theme: updatedTheme });
  }

  function handleLogout() {
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
          <HiPlus onClick={onAddNoteModalOpen} />
        </li>
        <li>
          <div onClick={handleChangeView}>
            {viewIcons.get(user.view ? user.view : 'list')}
          </div>
        </li>
        <li>
          <div onClick={handleChangeTheme}>
            {themeIcons.get(user.theme ? user.theme : 'dark')}
          </div>
        </li>
        {!user ? (
          <li>
            <Link to="/login">
              <HiUser />
            </Link>
          </li>
        ) : (
          <li>
            <HiLogout onClick={handleLogout} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
