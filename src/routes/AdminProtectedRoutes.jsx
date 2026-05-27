import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoutes = () => {
  const { adminUser , isAuthenticated} = useAuth();
    
  //  Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (adminUser?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoutes;