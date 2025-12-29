import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRoutes from "./Routers/AdminRoutes";
import AdminPannel from "./Admin/AdminPannel";
import AdminProtectedRoute from "./Routers/AdminProtectedRoute";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    sessionStorage.removeItem("hasReloaded");
  }, []);

  return (
    <Routes>
      {/* Customer routes */}
      <Route path="/*" element={<CustomerRoutes />} />

      {/* 🔒 Protected Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/*" element={<AdminPannel />} />
      </Route>
    </Routes>
  );
}

export default App;
