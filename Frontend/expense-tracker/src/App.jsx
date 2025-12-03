import React from 'react'

import {BrowserRouter as Router,
  Routes,
  Navigate,
  Route
} from "react-router-dom";
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Income from './pages/dashboard/income';
import Expense from './pages/dashboard/expense';
import Home from './pages/dashboard/home';
import UserProvider from './context/usercontext';
import {Toaster} from "react-hot-toast";
const App = () => {
  
  return (
<UserProvider>
<div>
  <Router>
   <Routes>
    
    <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
   </Routes>
  </Router>
</div>
<Toaster
  toastOptions={{
    className:"",
    style:{
      fontSize:'13px'
    }
  }}
  />
</UserProvider>
  )
}

export default App
const Root = () => {
  const idAuthenticated = !!localStorage.getItem("token");

  return idAuthenticated ?(
    <Navigate to="/dashboard" />
  ):(
    <Navigate to="/login" />
  );


};
