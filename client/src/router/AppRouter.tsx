import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from '../components/Header/Header';
import NotFound from '../components/shared/NotFound';
import Home from '../pages/Home';
import PropertyDetails from '../pages/PropertyDetails';
import Login from '../pages/Login'
import Signup from '../pages/Signup'

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
