import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import style from "./Navbar.module.css"

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
    <div className={style.navbar}>
      <Link to="/">DoseTrack</Link>
      <Link to="/reminder">Reminder</Link>
      {user.authState ? (
        <>
          {/* Show the user name button */}
          <button onClick={handleOpenDrawer}>{user.name}</button>

          {/* Drawer */}
          {isDrawerOpen && (
            <div className={style.drawer}>
              
              <h3>Welcome, {userName}</h3> {/* Display the user's name */}
              {/* Add any extra information or content you want to display in the drawer */}
              <p>Extra information about the user...</p>
              {/* Add the Logout button in the drawer */}
              <button onClick={handleLogout}>Logout</button>
              <button onClick={() => setDrawerOpen(false)}>Close</button>
            </div>
          )}
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
