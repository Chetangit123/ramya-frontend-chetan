import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './customer/Components/Navbar/Navigation';
import CustomerRoutes from './Routers/CustomerRoutes';
import AdminRoutes from './Routers/AdminRoutes';
import NotFound from './Pages/Notfound';
import AdminPannel from './Admin/AdminPannel';
import { useEffect } from 'react';
import AdminProtectedRoute from './Routers/AdminProtectedRoute';
// import Routers from './Routers/Routers';

function App() {
  const isAdmin=true;
  useEffect(() => {
  sessionStorage.removeItem("hasReloaded"); // ✅ Reset reload state on first render
}, []);

  return (
    <div className="">
      
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={
          <AdminPannel />
      } />
        
      </Routes>
    </div>
  );
}

export default App;
