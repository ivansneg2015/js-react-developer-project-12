/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  const [user, setUser] = useState(
    userId ? { username: userId.username } : null,
  );

  const getAuthToken = () => (userId?.token ? userId.token : null);

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUser(null);
  };

  const context = useMemo(
    () => ({
      logIn,
      logOut,
      user,
      getAuthToken,
    }),
    [logIn, logOut, user, getAuthToken],
  );

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
