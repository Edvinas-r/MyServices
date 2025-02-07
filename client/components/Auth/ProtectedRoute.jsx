import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // Jei neprisijungęs, nukreipti į prisijungimo puslapį
    return <Navigate to="/auth" />;
  }

  if (!allowedRoles.includes(user.role_id)) {
    // Jei rolė neatitinka, nukreipti į pagrindinį puslapį
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
