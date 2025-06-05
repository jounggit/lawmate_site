import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import lawmateLogo from './assets/lawmate_logo.png';
import lawyerIcon from './assets/Lawyer.png';
import userIcon from './assets/User.png';
import kakaoIcon from './assets/Kakao.png';
import naverIcon from './assets/Naver.png';
import googleIcon from './assets/Google.png';
import emailIcon from './assets/Email.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const emailRegister = () => {
      // 여기에 회원가입 로직을 추가할 수 있습니다
      navigate('/user-register');  // 로그인 페이지로 이동
    };
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
        </div>
      </div>

      <div className="login-container">      
        <div className="login-box">
          <h2>로그인 / 회원가입</h2>
          
          <div className="login-section">
            <div className="user-section">
              <h3>일반 사용자이신가요?</h3>
              <div className="user-icon">
                <img src={userIcon} alt="User" />
              </div>
              <div className="login-buttons">
                <button className="kakao-btn">
                  <div className="btn-content">
                    <img src={kakaoIcon} alt="Kakao" className="btn-logo" />
                    <span>카카오로 로그인</span>
                  </div>
                </button>
                <button className="naver-btn">
                  <div className="btn-content">
                    <img src={naverIcon} alt="Naver" className="btn-logo" />
                    <span>네이버로 로그인</span>
                  </div>
                </button>
                <button className="google-btn">
                  <div className="btn-content">
                    <img src={googleIcon} alt="Google" className="btn-logo" />
                    <span>구글로 로그인</span>
                  </div>
                </button>
                <button className="email-btn">
                  <div className="btn-content">
                    <img src={emailIcon} alt="Email" className="btn-logo" />
                    <span>이메일로 로그인</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="lawyer-section">
              <h3>변호사이신가요?</h3>
              <div className="lawyer-icon">
                <img src={lawyerIcon} alt="Lawyer" />
              </div>
              <button className="lawyer-login-btn">변호사 로그인</button>
            </div>
          </div>

          <div className="bottom-buttons">
            <button className="register-btn" onClick={emailRegister}>계정이 없으신가요? 이메일로 회원가입</button>
            <button className="lawyer-register-btn">변호사이신가요? 변호사 회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;