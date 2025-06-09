import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Main from './Main';
import Login from './Login';
import UserRegister from './UserRegister';
import LawyerRegister from './LawyerRegister';
import ConsultationPage from './ConsultationPage';
import LawyerProfile from './components/sidebar/LawyerProfile';
import UserProfile from './components/sidebar/UserProfile';

// 보호된 라우트 컴포넌트 (나중에 DB 연동 시 사용)
/*
const ProtectedLawyerRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.userType !== 'lawyer') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
*/

// 임시 더미 데이터 (나중에 실제 데이터로 교체)
const dummyUser = {
  name: "홍길동",
  userType: "lawyer",
  email: "lawyer@example.com",
  profileImage: null,
  lawyerInfo: {
    workingHours: {
      weekday: "09:00 ~ 18:00",
      lunchTime: "12:00 ~ 13:00",
      saturday: "토요일 09:00 ~ 13:00"
    },
    contact: {
      phone: "02-1234-5678",
      address: "서울특별시 강남구 테헤란로 123"
    },
    education: [
      "서울대학교 법학전문대학원 졸업",
      "고려대학교 법학과 학사"
    ],
    experience: [
      "서울중앙지방법원 판사 역임",
      "법무법인 정의 대표변호사",
      "대한변호사협회 이사"
    ]
  }
};

// 일반 사용자 더미 데이터
const dummyNormalUser = {
  full_name: "김사용",
  nickname: "일반사용자",
  email: "user@example.com",
  phone: "010-1234-5678",
  address: "서울특별시 서초구 서초대로 123",
  userType: "user"
};

// LawyerProfile을 감싸는 컴포넌트
const LawyerProfileWrapper = () => {
  return <LawyerProfile user={dummyUser} />;
};

// UserProfile을 감싸는 컴포넌트
const UserProfileWrapper = () => {
  return <UserProfile user={dummyNormalUser} />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 루트 경로(/)를 Main 컴포넌트로 리다이렉트 */}
        <Route path="/" element={<Main />} />
        {/* 기존 경로도 유지 (GitHub Pages 배포를 위해) */}
        <Route path="/lawmate_site" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/lawyer-register" element={<LawyerRegister />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/lawyer-profile" element={<LawyerProfileWrapper />} />
        <Route path="/user-profile" element={<UserProfileWrapper />} />
        {/* 정의되지 않은 모든 경로는 Main으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;