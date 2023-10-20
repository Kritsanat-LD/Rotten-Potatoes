import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from '../pages/loading';

const ProtectedRoute = ({ children }) => {
  const { user , userRole } = UserAuth();
  console.log(userRole)
  const [isRoleFetched, setIsRoleFetched] = useState(false);

  setTimeout(() => {
    setIsRoleFetched(true);
  }, 2200); 

  if (!user) {
    return <Navigate to='/' />;
  }
  if (!isRoleFetched) {
    // Show loading indicator while fetching the role
    return <Loading/>;
  }
  if(userRole === "admin"){
    return children;
  }
  else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;