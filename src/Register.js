// LoginPage.js
import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="logo">
        <img src="/lawmate-logo.png" alt="Lawmate" />
        <h1>Lawmate</h1>
      </div>
      
      <div className="login-box">
        <h2>로그인 / 회원가입</h2>
        
        <div className="login-section">
          <div className="user-section">
            <h3>일반 사용자이신가요?</h3>
            <div className="user-icon">
              <img src="/user-icon.png" alt="User" />
            </div>
            <div className="login-buttons">
              <button className="kakao-btn">카카오로 로그인</button>
              <button className="naver-btn">네이버로 로그인</button>
              <button className="google-btn">구글로 로그인</button>
              <button className="email-btn">이메일로 로그인</button>
            </div>
          </div>

          <div className="lawyer-section">
            <h3>변호사이신가요?</h3>
            <div className="lawyer-icon">
              <img src="/lawyer-icon.png" alt="Lawyer" />
            </div>
            <button className="lawyer-login-btn">변호사 로그인</button>
          </div>
        </div>

        <div className="bottom-buttons">
          <button className="register-btn">계정이 없으신가요? 이메일로 회원가입</button>
          <button className="lawyer-register-btn">변호사이신가요? 변호사 회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;