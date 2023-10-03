import { createContext, useContext, useEffect, useState } from 'react';
import {
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
  import { auth } from '../firebase';

  const UserContext = createContext();


  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
  
    const logout = () => {
        return signOut(auth)
    }
  
    // const handleBeforeUnload = () => {
    //   // Sign out the user before unloading the page/tab
    //   logout();
    // };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      // window.addEventListener('beforeunload', handleBeforeUnload); 


      return () => {
        unsubscribe();

        // window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    return (
      <UserContext.Provider value={{ user , logout}}>
        {children}
      </UserContext.Provider>
    );
  };

  export const UserAuth = () => {
    return useContext(UserContext);
  };