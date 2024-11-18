/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [role, setRole] = useState(null);
   const [user, setUser] = useState(null);

   // Check localStorage for login state on mount
   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('role');
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
         setIsLoggedIn(true);
         setRole(storedRole);
         setUser(JSON.parse(storedUser)); // Parse and set the user object
      }
   }, []);

   const login = (user, token) => {
      localStorage.setItem('user', JSON.stringify(user)); // Store the user object
      localStorage.setItem('role', user.role); // Store the role
      localStorage.setItem('token', token); // Store the auth token
      setIsLoggedIn(true);
      setRole(user.role);  // Set the user role
      setUser(user); // Store the user object
   };


   const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('token'); // Clear the token
      setIsLoggedIn(false);
      setRole(null);
      setUser(null); // Clear user details
   };

   return (
      <AuthContext.Provider value={ { isLoggedIn, role, user, login, logout } }>
         { children }
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
