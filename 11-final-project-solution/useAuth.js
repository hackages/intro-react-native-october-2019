import React from 'react';
import * as api from './api';

const AuthContext = React.createContext();

export const AuthProvider = props => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loadingUserFromStorage, setLoadingUserFromStorage] = React.useState(
    true
  );

  React.useEffect(() => {
    api.getCurrentUser().then(currentUser => {
      setCurrentUser(currentUser);
      setLoadingUserFromStorage(false);
    });
  }, []);

  const isAuthenticated = currentUser !== null;

  const login = React.useCallback(
    (username, password) =>
      api.login(username).then(() => setCurrentUser(username)),
    []
  );

  const logout = React.useCallback(
    () => api.logout().then(() => setCurrentUser(null)),
    []
  );

  const context = React.useMemo(
    () => ({
      login,
      logout,
      currentUser,
      isAuthenticated,
      loadingUserFromStorage,
    }),
    [currentUser, isAuthenticated, loadingUserFromStorage, login, logout]
  );

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};
