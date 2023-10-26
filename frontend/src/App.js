import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import MuiThemeProvider from './theme/MuiThemeProvider';
import LoginRegister from './pages/LoginRegister';
import Users from './pages/Users';
import { useDispatch, useSelector } from 'react-redux';
import { disableLoading, loadCurrentUser } from './redux/auth/authSlice';
import Notifications from './components/common/Notifications';
import Home from './pages/Home';
import Inventories from './pages/Inventories';
import Suppliers from './pages/Suppliers';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Verification from './pages/Verification';
import NotFound from './pages/NotFound';


export default function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadCurrentUser());
    } else {
      dispatch(disableLoading())
    }
  }, [dispatch])
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path='/login' element={<LoginRegister />} />
          <Route path='/verify-account/:token' element={<Verification />} />
          <Route path='/register' element={<LoginRegister />} />
          <Route path="dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            {(currentUser?.role === "admin" || currentUser?.role === "readonlyAdmin") && <Route path='users' element={<Users />} />}
            <Route path='inventories' element={<Inventories />} />
            <Route path='suppliers' element={<Suppliers />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
        <Notifications />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}