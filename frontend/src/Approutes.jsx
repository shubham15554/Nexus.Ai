import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatWindow from "./pages/ChatWindow";
import { SocketProvider } from "./cotexts/socketContext";
import { AuthProvider } from "./cotexts/authContext";
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './utils/ProtectedRoute'
const Approutes = () => {
  return (
    <AuthProvider>
        <SocketProvider>
        <ToastContainer theme="dark" />
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={
                    <ProtectedRoute> <Home /></ProtectedRoute>
                } /> 
                <Route path="/chat/:id" element={<ProtectedRoute> <ChatWindow /> </ProtectedRoute>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                
            </Routes>
        </BrowserRouter> 
        </SocketProvider>
    </AuthProvider> 
    );
};

export default Approutes;