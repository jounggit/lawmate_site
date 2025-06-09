import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-card">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-avatar">
            {user ? (
              <div className="user-profile-image">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="프로필" 
                    className="profile-img"
                  />
                ) : (
                  <span>{user.name?.charAt(0) || 'U'}</span>
                )}
              </div>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
          <div className="profile-buttons">
            {user ? (
              <div className="logged-in-profile">
                <div className="user-name">{user.name || '사용자'} 님</div>
                <div className="user-email">{user.email}</div>
                {user.userType === 'lawyer' ? (
                  <>
                    <Link to="/edit-profile" className="edit-profile-btn">
                      개인정보 수정
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/my-page" className="mypage-btn">
                      마이페이지
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                      로그아웃
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="profile-buttons">
                <Link to="/login" className="login-button">로그인/회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Recent Cases Section */}
      <div className="recent-cases">
        <div className="recent-cases-title">최근 사건 기록</div>
        <div className="recent-cases-desc">
          {user ? (
            user.recentCases?.length > 0 ? (
              <ul className="cases-list">
                {user.recentCases.map((case_, index) => (
                  <li key={index}>{case_.title}</li>
                ))}
              </ul>
            ) : (
              "아직 기록된 사건이 없습니다."
            )
          ) : (
            <>
              로그인 하시면 사건 기록을<br />
              저장 할 수 있습니다.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;