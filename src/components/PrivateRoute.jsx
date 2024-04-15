import React from 'react';
import { isLoggedIn } from '../auth';
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from './Sidebar';

const PrivateRoute = () => {
  return isLoggedIn() ? (<Sidebar><Outlet /></Sidebar>): <Navigate to="/" />;
}

export default PrivateRoute