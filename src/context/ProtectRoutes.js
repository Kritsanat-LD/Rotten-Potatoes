import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loading from '../pages/loading';
import NotFound from '../pages/notfoundpage';

const ProtectedRoute = ({ children }) => {
  const { user , userRole } = UserAuth();
  const [isRoleFetched, setIsRoleFetched] = useState(false);

  setTimeout(() => {
    setIsRoleFetched(true);
  }, 2300); 
  console.log(userRole)
  if (!user) {
    return <NotFound/>;
  }
  if (!isRoleFetched) {
   
    return <Loading/>;
  }else{
    if(userRole === "admin"){
      return children;
    }
    else {
      return <NotFound/>;
    }
  }
};

export default ProtectedRoute;