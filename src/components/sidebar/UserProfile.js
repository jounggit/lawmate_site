import React from 'react';
import './UserProfile.css';
import '../../Main.css';
import Header from '../layout/Header';
import Sidebar from './Sidebar';
import userDefaultImage from '../../user-image/default-profile.png';

const UserProfile = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="app">
      <Header />
      
      <div className="main-container">
        <div className="content-wrapper">
          <Sidebar />
          
          <div className="user-content">
            <div className="user-profile-header">
              <div>
                <h1>{user.full_name}님 환영합니다!</h1>
                <p>마이페이지에서 회원정보를 관리하실 수 있습니다.</p>
              </div>
            </div>

            <div className="user-profile-main">
              <div className="user-image-section">
                <img src={user.profileImage || userDefaultImage} alt="프로필 이미지" className="user-profile-image" />
                <button className="edit-profile-button">프로필 수정</button>
              </div>
              
              <div className="user-info-section">
                <div className="info-group">
                  <div className="info-item">
                    <span className="label">이름:</span>
                    <span className="value">{user.full_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">닉네임:</span>
                    <span className="value">{user.nickname}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">이메일:</span>
                    <span className="value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">연락처:</span>
                    <span className="value">{user.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">주소:</span>
                    <span className="value">{user.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="consultation-section">
              <h3 className="section-title">상담 관리</h3>
              
              <div className="consultation-nav">
                <button className="consultation-nav-item active">전체</button>
                <button className="consultation-nav-item">진행중</button>
                <button className="consultation-nav-item">완료</button>
              </div>

              <div className="consultation-list">
                <div className="consultation-card">
                  <div className="consultation-header">
                    <span className="consultation-type">노동/임금</span>
                    <span className="consultation-status ongoing">진행중</span>
                  </div>
                  <h4 className="consultation-title">3달 전에 일했던 가게에서 사장님이 알바비를 3달째 안주고...</h4>
                  <div className="consultation-info">
                    <span className="consultation-date">2024.03.15</span>
                    <button className="view-detail">대화 열기</button>
                  </div>
                </div>

                <div className="consultation-card">
                  <div className="consultation-header">
                    <span className="consultation-type">형사/특별법</span>
                    <span className="consultation-status completed">완료</span>
                  </div>
                  <h4 className="consultation-title">층간소음으로 인한 스토킹관련 법적 처벌에...</h4>
                  <div className="consultation-info">
                    <span className="consultation-date">2024.03.13</span>
                    <button className="view-detail">대화내역 확인</button>
                  </div>
                </div>

                <div className="consultation-card">
                  <div className="consultation-header">
                    <span className="consultation-type">형사/소송</span>
                    <span className="consultation-status completed">완료</span>
                  </div>
                  <h4 className="consultation-title">교통사고 합의 관련 문의</h4>
                  <div className="consultation-info">
                    <span className="consultation-date">2024.03.10</span>
                    <button className="view-detail">대화내역 확인</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 