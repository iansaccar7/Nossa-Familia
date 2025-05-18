import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();

  // Se não estiver autenticado, redireciona para login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se a rota for apenas para admin e o usuário não for admin, redireciona para home
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
