import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import UserRegister from './UserRegister';

function App() {
  return (
    <Routes>
      <Route path="/lawmate_site" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-register" element={<UserRegister />} />
    </Routes>
  );
}

export default App; 