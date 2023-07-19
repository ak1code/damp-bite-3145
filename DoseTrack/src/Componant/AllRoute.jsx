import React from 'react'
import {Routes,Route} from "react-router-dom";
import Reminder from '../Pages/Reminder';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import Admin from '../Pages/Admin';

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}>Home</Route>
        <Route path='/reminder' element={<Reminder/>}>Reminder</Route>
        <Route path='/login' element={<Login/>}>Login</Route>
        <Route path='/profile' element={<Profile/>}>Profile</Route>
        <Route path='/admin' element={<Admin/>}>Admin</Route>
    </Routes>
  )
}

export default AllRoute