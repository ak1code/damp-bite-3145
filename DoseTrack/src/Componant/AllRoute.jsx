import React from 'react'
import {Routes,Route} from "react-router-dom";
import Reminder from '../Pages/Reminder';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import PraviteRoute from './PraviteRoute';

const AllRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}>Home</Route>
        <Route path='/reminder' element={
        <PraviteRoute>
          <Reminder/>
        </PraviteRoute>
        }>Reminder</Route>
        <Route path='/login' element={<Login/>}>Login</Route>
       
    </Routes>
  )
}

export default AllRoute