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

function Header({ user, handleUserChanged, handleaddNoteModalOpen }) {
  const viewIcons = new Map([
    ['list', <HiViewList />],
    ['grid', <HiViewGrid />],
  ]);
  const themeIcons = new Map([
    ['dark', <HiMoon />],
    ['light', <HiSun />],
  ]);

  function onChangeView() {
    const updatedView = user.view === 'list' ? 'grid' : 'list';
    handleUserChanged({ ...user, view: updatedView });
  }

  function onChangeTheme() {
    const updatedTheme = user.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', updatedTheme);
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
          <HiPlus onClick={handleaddNoteModalOpen} />
        </li>
        <li>
          <div onClick={onChangeView}>
            {viewIcons.get(user.view ? user.view : 'list')}
          </div>
        </li>
        <li>
          <div onClick={onChangeTheme}>
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
            <HiLogout onClick={onLogout} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
