import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';
import getPath from '../routes.js';

const CheckTokenPage = ({ children }) => {
  const auth = useAuth();

  return !auth.token ? <Navigate to={getPath.loginPage()} /> : children;
};

export default CheckTokenPage;
