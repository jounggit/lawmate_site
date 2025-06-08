import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import UserRegister from './UserRegister';

function App() {
  return (
    <Routes>
      {/* 루트 경로(/)를 Main 컴포넌트로 리다이렉트 */}
      <Route path="/" element={<Main />} />
      {/* 기존 경로도 유지 (GitHub Pages 배포를 위해) */}
      <Route path="/lawmate_site" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-register" element={<UserRegister />} />
      {/* 정의되지 않은 모든 경로는 Main으로 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App; 