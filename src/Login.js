import React, { useState, useEffect } from 'react';
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
    

    // 카카오, 네이버, 구글 로그인 주소 설정
    const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?client_id=1234567890&redirect_uri=http://localhost:3000/kakao/callback&response_type=code";
    const naverLoginUrl = "http://localhost:3000/api/auth/naver";
    const googleLoginUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=YOUR_SCOPES&access_type=offline&state=YOUR_RANDOM_STATE";

    const kakaoLogin = () => {
        window.location.href = kakaoLoginUrl;
    };
    const naverLogin = () => {
        window.location.href = naverLoginUrl;
    };
    const googleLogin = () => {
        window.location.href = googleLoginUrl;
    };

    // 이메일 로그인 페이지로 이동
    const emailRegister = () => {
      // 여기에 회원가입 로직을 추가할 수 있습니다
      navigate('/user-register');  // 로그인 페이지로 이동
    };

    // 이메일 로그인 주소 설정
    const [showEmailLogin, setShowEmailLogin] = useState(false);

    const handleEmailLoginClick = () => {
        setShowEmailLogin(true);
    };

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      }
    }, [navigate]);




  return (
    <div>
      <div className="header">
        <div className="nav-container">
          <a href="/lawmate_site" style={{ textDecoration: 'none' }}>
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
              {!showEmailLogin && (
              <div className="user-icon">
                <img src={userIcon} alt="User" />
              </div>
              )}
            {!showEmailLogin ? (
              <div className="login-buttons">
                <button className="kakao-btn" onClick={kakaoLogin}>
                  <div className="btn-content">
                    <img src={kakaoIcon} alt="Kakao" className="btn-logo" />
                    <span>카카오로 로그인</span>
                  </div>
                </button>
                <button className="naver-btn" onClick={naverLogin}>
                  <div className="btn-content">
                    <img src={naverIcon} alt="Naver" className="btn-logo" />
                    <span>네이버로 로그인</span>
                  </div>
                </button>
                <button className="google-btn" onClick={googleLogin}>
                  <div className="btn-content">
                    <img src={googleIcon} alt="Google" className="btn-logo" />
                    <span>구글로 로그인</span>
                  </div>
                </button>
                <button className="email-btn" onClick={handleEmailLoginClick}>
                  <div className="btn-content">
                    <img src={emailIcon} alt="Email" className="btn-logo" />
                    <span>이메일로 로그인</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="email-login-form">
                <div className="social-icons">
                  <img src={kakaoIcon} alt="Kakao" className="btn-logo" />
                  <img src={naverIcon} alt="Naver" className="btn-logo" />
                  <img src={googleIcon} alt="Google" className="btn-logo" />
                </div>
                <input type="email" placeholder="이메일 주소" />
                <input type="password" placeholder="비밀번호" />
                <button className="login-btn">로그인</button>
              </div>
            )}
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