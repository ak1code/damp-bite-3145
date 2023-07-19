import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {


  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <Link to="/" >DoseTrack</Link>
      <Link to="/reminder" >Reminder</Link>
      <Link to="/login" >Login</Link>
    </div>
  )
}

export default Navbar