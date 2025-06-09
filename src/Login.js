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
import { useAuth } from './contexts/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login, user, loading, error } = useAuth();
    
    const [showLawyerLogin, setShowLawyerLogin] = useState(false);
    const [showEmailLogin, setShowEmailLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 사용자가 이미 로그인한 경우 메인 페이지로 리다이렉트
    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);

    const handleLawyerLoginClick = () => {
      setShowLawyerLogin(true);
    };

    const handleEmailLoginClick = () => {
      setShowEmailLogin(true);
    };

    // 소셜 로그인 URL 설정 (실제 URL로 변경 필요)
    const kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?client_id=1234567890&redirect_uri=http://localhost:3000/kakao/callback&response_type=code";
    const naverLoginUrl = "http://localhost:8000/api/auth/naver";
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

    // 이메일 로그인 처리
    const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!email || !password) {
    setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
    return;
    }
    
    try {
    setIsSubmitting(true);
    // 로그인 API 호출
    const success = await login(email, password);
    if (success) {
      navigate('/');
      } else {
      setLoginError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
    } catch (err) {
    console.error('로그인 오류:', err);
    if (err.response && err.response.status === 401) {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
      setLoginError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
      } finally {
      setIsSubmitting(false);
    }
  };

    // 회원가입 페이지로 이동
    const emailRegister = () => {
      navigate('/user-register');
    };
    
    // 변호사 회원가입 페이지로 이동
    const lawyerRegister = () => {
      navigate('/lawyer-register');
    };

    // 로딩 중 표시
    if (loading) {
      return <div className="loading">로딩 중...</div>;
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
          </div>
        </div>

        <div className="login-container">      
          <div className="login-box">
            <h2>로그인 / 회원가입</h2>
            
            {/* 에러 메시지 표시 */}
            {(error || loginError) && (
              <div className="error-message">
                {error || loginError}
              </div>
            )}
            
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
                <form onSubmit={handleEmailLogin} className="email-login-form">
                  <div className="social-icons">
                    <img src={kakaoIcon} alt="Kakao" className="social-logo" onClick={kakaoLogin} />
                    <img src={naverIcon} alt="Naver" className="social-logo" onClick={naverLogin} />
                    <img src={googleIcon} alt="Google" className="social-logo" onClick={googleLogin} />
                  </div>
                  <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button type="submit" className="login-btn" disabled={isSubmitting}>
                    {isSubmitting ? '로그인 중...' : '로그인'}
                  </button>
                </form>
              )}
              </div>

              <div className="lawyer-section">
                <h3>변호사이신가요?</h3>
                {!showLawyerLogin && (
                  <div className="lawyer-icon">
                    <img src={lawyerIcon} alt="Lawyer" />
                  </div>
                )}
                {!showLawyerLogin ? (
                  <button className="lawyer-login-btn" onClick={handleLawyerLoginClick}>
                    변호사 로그인
                  </button>
                ) : (
                  <form onSubmit={handleEmailLogin} className="lawyer-login-form">
                    <input
                      type="email"
                      placeholder="이메일"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button type="submit" className="login-btn" disabled={isSubmitting}>
                      {isSubmitting ? '로그인 중...' : '로그인'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="bottom-buttons">
              <button className="register-btn" onClick={emailRegister}>계정이 없으신가요? 이메일로 회원가입</button>
              <button className="lawyer-register-btn" onClick={lawyerRegister}>변호사이신가요? 변호사 회원가입</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default LoginPage;