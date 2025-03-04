import * as React from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes, BrowserRouter } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

