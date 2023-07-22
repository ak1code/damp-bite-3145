import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {Navigate} from "react-router-dom";

const PraviteRoute = ({children}) => {
    const {login,user}=useContext(AuthContext)

    {
        if(!user.authState){
           return <Navigate to="/login" />
        } 
    }

  return (
    <div>
       {children}

    </div>
  )
}

export default PraviteRoute