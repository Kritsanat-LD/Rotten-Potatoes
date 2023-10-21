import { createContext, useContext, useEffect, useState } from 'react';
import {
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';
  import { auth , db} from '../firebase';
  import { doc, getDoc, } from 'firebase/firestore';

  const UserContext = createContext();


  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userRole, setUserRole] = useState("");
    const [Username, setUsername] = useState("");

    const logout = () => {
        return signOut(auth)
    }

    const updateUserRole  = (role) => {
      setUserRole(role);
    };
  
    // const handleBeforeUnload = () => {
    //   // Sign out the user before unloading the page/tab
    //   logout();
    // };

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          // Retrieve the user's role from Firestore
          const userDocRef = doc(db, 'user', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          const userData = userDocSnapshot.data();
          if (userData && userData.role) {
            setUsername(userData.name);
            setUserRole(userData.role); // Update the user role in your AuthContext
          }
        }
      });

      // window.addEventListener('beforeunload', handleBeforeUnload); 


      return () => {
        unsubscribe();

        // window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    return (
      // <UserContext.Provider value={{ user , logout}}>
      //   {children}
      // </UserContext.Provider>
    <UserContext.Provider value={{ user , logout, userRole, updateUserRole, Username }}>
      {children}
    </UserContext.Provider>
    );
  };

  export const UserAuth = () => {
    return useContext(UserContext);
  };