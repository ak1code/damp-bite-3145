import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import style from './Navbar.module.css'; 


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const handleOpenDrawer = () => {
    setUserName(user.name); 
    setDrawerOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={style.navbarContainer}> 
      
      <Link to="/" className={style.navLink}>DoseTrack</Link>
      
      <Link to="/reminder" className={style.navLink}>Reminder</Link>
      {user.authState ? (
        <>
         
          <button onClick={handleOpenDrawer} className={style.userNameButton}>{user.name}</button>

          
          {isDrawerOpen && (
            <div className={style.drawerContainer}> 
              <h3>Welcome, {userName}</h3> 
              
              <p>   Hello, {userName}!     Welcome to DoseTrack, your personalized pill reminder app. We hope our app is helping you stay on top of your medicine schedule and improve your health. If you have any questions or need assistance, feel free to reach out to our support team. Your well-being is our priority, and we strive to provide the best experience for you.</p>
         
              <div className={style.buttonDiv}>
              <button onClick={handleLogout} className={style.drawerButton}>Logout</button>

              <button onClick={() => setDrawerOpen(false)} className={style.drawerButton}>Close</button>
              </div>
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
