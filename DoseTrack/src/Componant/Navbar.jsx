import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import style from './Navbar.module.css'; // Import the new CSS module file

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleOpenDrawer = () => {
    setUserName(user.name); // Assuming the user object has a 'name' property
    setDrawerOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={style.navbarContainer}> {/* Apply a container class */}
      <Link to="/" className={style.navLink}>DoseTrack</Link>
      <Link to="/reminder" className={style.navLink}>Reminder</Link>
      {user.authState ? (
        <>
          {/* Show the user name button */}
          <button onClick={handleOpenDrawer} className={style.userNameButton}>{user.name}</button>

          {/* Drawer */}
          {isDrawerOpen && (
            <div className={style.drawerContainer}> {/* Apply a container class */}
              <h3>Welcome, {userName}</h3> {/* Display the user's name */}
              {/* Add any extra information or content you want to display in the drawer */}
              <p>Extra information about the user...</p>
              {/* Add the Logout button in the drawer */}
              <button onClick={handleLogout} className={style.drawerButton}>Logout</button>
              <button onClick={() => setDrawerOpen(false)} className={style.drawerButton}>Close</button>
            </div>
          )}
        </>
      ) : (
        <Link to="/login" className={style.navLink}>Login</Link>
      )}
    </div>
  );
};

export default Navbar;
