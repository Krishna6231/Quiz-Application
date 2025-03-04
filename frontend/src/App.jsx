import * as React from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import ProtectedRoute from './api/ProtectedRoute';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

