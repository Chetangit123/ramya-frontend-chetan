import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { auth } = useSelector((store) => store);

  if (!auth.user) {
    // Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  if (auth.user.role !== "ADMIN") {
    // Logged in but not admin → redirect to home
    return <Navigate to="/" replace />;
  }

  // ✅ Admin user → show the page
  return children;
}
