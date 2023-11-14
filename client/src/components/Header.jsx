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
import authService from '../features/notes/authService';

function Header({
  user,
  onUserChanged,
  theme,
  onThemeChanged,
  view,
  onViewChanged,
  onNoteModalOpen,
}) {
  const viewIcons = new Map([
    ['list', <HiViewList />],
    ['grid', <HiViewGrid />],
  ]);
  const themeIcons = new Map([
    ['dark', <HiMoon />],
    ['light', <HiSun />],
  ]);

  function handleChangeView() {
    const updatedView = view === 'list' ? 'grid' : 'list';
    onViewChanged(updatedView);
  }

  function handleChangeTheme() {
    const updatedTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', updatedTheme);
    onThemeChanged(updatedTheme);
  }

  function handleLogout() {
    onUserChanged(null);
    authService.logout();
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
        {user && (
          <>
            <li>
              <HiPlus onClick={onNoteModalOpen} />
            </li>
            <li>
              <div onClick={handleChangeView}>
                {viewIcons.get(view ? view : 'list')}
              </div>
            </li>
          </>
        )}
        <li>
          <div onClick={handleChangeTheme}>
            {themeIcons.get(theme ? theme : 'dark')}
          </div>
        </li>
        {!user ? (
          <li>
            <Link to="/auth">
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
