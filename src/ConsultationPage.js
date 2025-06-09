import React from 'react';
import LegalConsultation from './components/LegalConsultation';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import lawmateLogo from './assets/lawmate_logo.png';
import './Main.css';

function ConsultationPage() {
  const { user, loading } = useAuth();

  // 로딩 중 표시
  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="header">
        <div className="nav-container">
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src={lawmateLogo} alt="Lawmate Logo" className="nav-logo" />
          </a>
          <nav className="nav-menu">
            <a href="#" className="nav-item">법령</a>
            <a href="#" className="nav-item">판례</a>
            <a href="#" className="nav-item">커뮤니티</a>
            <a href="#" className="nav-item">변호사</a>
            <a href="#" className="nav-item">용어사전</a>
            <a href="#" className="nav-item">공지사항</a>
            <a href="#" className="nav-item">고객지원</a>
          </nav>
          <div className="user-info">
            <span className="username">{user.name || user.email} 님</span>
            <div className="profile-image">
              <img src={user.profileImage || require('./user-image/default-profile.png')} alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div className="consultation-page">
        <div className="page-title">
          <h1>법률 상담</h1>
          <p>AI를 통한 법률 분석 서비스를 이용해보세요.</p>
        </div>
        
        <div className="consultation-container">
          <LegalConsultation />
        </div>
      </div>
    </div>
  );
}

export default ConsultationPage;