import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupComponent from "./components/signupComponent";
import EmailVerify from "./components/emailVerify.js";
import Login from "./components/loginComponent";
import Navbar from "./components/navbarComponent";
import Dashboard from "./components/dashboardComponent";
import Bar from "./components/logoBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./components/forgotPassword";
import Water from "./components/waterComponent";
import PasswordReset from "./components/passwordReset";
import Footer from "./components/footer";
import ProfileUpdate from "./components/userProfile";
import GreenHousePage from "./components/greenHouse";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={[<Bar />, <SignupComponent />]} />
        <Route path="/login" element={[<Bar />, <Login />]} />
        <Route path="/users/:id/verify/:token" element={[<Bar />, <EmailVerify />]} />
        <Route path="/forgot-password" element={[<Bar />, <ForgotPassword />]} />
        <Route path="/water" element={[<Navbar />, <Water />]} />
        <Route path="/profile" element={[<Navbar />, <ProfileUpdate />]} />
        <Route path="/password-reset/:id/:token" element={[<Bar />, <PasswordReset />]} />
        <Route path="/Dashboard" element={[<Navbar />, <Dashboard />]} />
        <Route path="/MyGreenhouse" element={[<Navbar />, <GreenHousePage />]} />
        <Route path="/" exact element={<Navigate replace to="/login" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
