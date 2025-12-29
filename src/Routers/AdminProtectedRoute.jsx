import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { auth } = useSelector((store) => store);

  // ❌ Not logged in
  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  // ❌ Logged in but not admin
  if (auth.user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminProtectedRoute;
