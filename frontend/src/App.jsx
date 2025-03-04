import * as React from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

