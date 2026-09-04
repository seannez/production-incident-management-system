import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  //Returns whats inside of a ProtectedRoute in App.jsx
  //meaning if user is connected show a page
  return children;
}