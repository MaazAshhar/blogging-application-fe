import React from 'react';
import { isLoggedIn } from '../../auth';
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  return isLoggedIn() ? (<Outlet />): <Navigate to="/" />;
}

export default PrivateRoute