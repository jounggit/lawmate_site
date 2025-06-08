import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Main.css';
import lawmateLogo from './assets/lawmate_logo.png';
import userDefaultImage from './user-image/default-profile.png';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserInfo = localStorage.getItem('userInfo');
    
    if (token && savedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const handlePrecedentClick = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      const tempUserInfo = {
        name: "홍길동",
        email: "test@example.com",
        profileImage: userDefaultImage,
        recentCases: [
          { title: "임차권 관련 문의" },
          { title: "교통사고 합의" }
        ]
      };
      
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('userInfo', JSON.stringify(tempUserInfo));
      setIsLoggedIn(true);
      setUserInfo(tempUserInfo);
    } else {
      handleLogout();
    }
  };

  const handleSearch = () => {
    console.log('검색:', searchQuery);
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="nav-container">
          <a href="/lawmate_site" style={{ textDecoration: 'none' }}>
            <img src={lawmateLogo} alt="Lawmate Logo" className="nav-logo" />
          </a>
          <nav className="nav-menu">
            <a href='#' className="nav-item">법령</a>
            <a href="#" className="nav-item">판례</a>
            <a href="#" className="nav-item">커뮤니티</a>
            <a href="#" className="nav-item">변호사</a>
            <a href="#" className="nav-item">용어사전</a>
            <a href="#" className="nav-item">공지사항</a>
            <a href="#" className="nav-item">고객지원</a>
          </nav>
        </div>
      </div>

      <div className="main-container">
        <div className="content-wrapper">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              {/* Profile Section */}
              <div className="profile-section">
                <div className="profile-avatar">
                  {isLoggedIn ? (
                    <div className="user-profile-image">
                      {userInfo?.profileImage ? (
                        <img 
                          src={userInfo.profileImage} 
                          alt="프로필" 
                          className="profile-img"
                        />
                      ) : (
                        <span>{userInfo?.name?.charAt(0) || 'U'}</span>
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
                  {isLoggedIn ? (
                    <div className="logged-in-profile">
                      <div className="user-name">{userInfo?.name || '사용자'} 님</div>
                      <div className="user-email">{userInfo?.email}</div>
                      {userInfo?.userType === 'lawyer' ? (
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
                  {isLoggedIn ? (
                    userInfo?.recentCases?.length > 0 ? (
                      <ul className="cases-list">
                        {userInfo.recentCases.map((case_, index) => (
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

          {/* Main Content */}      
          {isLoggedIn && userInfo?.userType === 'lawyer' ? (
            <div className="lawyer-content">
              <div className="lawyer-profile-header">
                <div>
                  <h1>{userInfo.name} 변호사님 환영합니다!</h1>
                  <p>사용자님에게 {userInfo.name} 변호사님을 소개해 보세요.</p>
                </div>
              </div>

              <div className="lawyer-profile-main">
                <div className="lawyer-image-section">
                  <img src={userInfo.profileImage || userDefaultImage} alt="변호사 프로필" className="lawyer-profile-image" />
                </div>
                
                <div className="lawyer-info-section">
                  <div className="working-hours">
                    <h3>상담 가능 시간:</h3>
                    <p>평일 {userInfo.lawyerInfo.workingHours.weekday} / 점심시간 {userInfo.lawyerInfo.workingHours.lunchTime} 제외</p>
                    <p>{userInfo.lawyerInfo.workingHours.saturday}</p>
                    <p className="notice">※ 공휴일 및 일요일은 상담이 어렵습니다.</p>
                  </div>

                  <div className="lawyer-introduction">
                    <p>민사소송, 계약 분쟁, 임대차 문제 등 실생활과 밀접한 법률 문제를 중심으로 약 8년간 다양한 사건을 수행해 왔습니다.</p>
                    <p>기업 자문부터 개인 간의 분쟁 해결에 이르기까지, 사건의 본질을 빠르게 파악하고 의뢰인에게 가장 실질적인 해결책을 제시하는 데 집중하고 있습니다.
                      의뢰인의 입장에서 문제를 함께 바라보고, 현실적인 한계와 법적 가능성을 조화롭게 설명드리는 상담을 지향합니다. 법률적인 해석에만 그치지 않고, 실제로 도움이 되는 전략과 방향성을 제시해드릴 수 있도록 노력하고 있습니다.
                    </p>
                    <p>어떤 사건이든 처음 상담부터 신속하고 정중하게 응대드리며, 의뢰인과의 신뢰를 바탕으로 최선의 결과를 도출하는 것을 목표로 하고 있습니다. 
                      부담 없이 편하게 상담 요청해 주세요. 진심을 담아 함께 고민하겠습니다.</p>
                  </div>

                  <div className="contact-info">
                    <div className="info-item">
                      <span className="label">이름:</span>
                      <span className="value">{userInfo.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">영문 이름:</span>
                      <span className="value">Hong Gil-dong</span>
                    </div>
                    <div className="info-item">
                      <span className="label">이메일:</span>
                      <span className="value">{userInfo.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">연락처:</span>
                      <span className="value">{userInfo.lawyerInfo.contact.phone}</span>
                      <button className="contact-button">전화걸기</button>
                    </div>
                    <div className="info-item">
                      <span className="label">주소:</span>
                      <span className="value">{userInfo.lawyerInfo.contact.address}</span>
                      <button className="contact-button">길찾기</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="expertise-section">
                <h3 className="expertise-title">전문 분야</h3>
                <div className="expertise-nav">
                  <button className="expertise-nav-item active">회사/정관</button>
                  <button className="expertise-nav-item">민사/소송</button>
                  <button className="expertise-nav-item">형사/소송</button>
                  <button className="expertise-nav-item">사기/공갈</button>
                  <button className="expertise-nav-item">음주/무면허</button>
                  <button className="expertise-nav-item">임대차</button>
                  <button className="expertise-nav-item">기업회기/세무</button>
                  <button className="expertise-nav-item">행정/해임</button>
                  <button className="expertise-nav-item">성폭력/강제추행 등</button>
                </div>

                <div className="education-experience">
                  <div className="education">
                    <h3>학력:</h3>
                    <ul>
                      {userInfo.lawyerInfo.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="experience">
                    <h3>경력:</h3>
                    <ul>
                      {userInfo.lawyerInfo.experience.map((exp, index) => (
                        <li key={index}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="main-content">
              {/* Main Title */}
              <div className="title-section">
                <h1 className="main-title">
                  "어려운 법, 친구처럼 쉽게 알려줄게요."<br />
                  AI와 함께하는 법률 정보 플랫폼, Lawmate.
                </h1>
                
                <div className="description">
                  Lawmate는 어려운 법률 용어와 복잡한 절차를 쉽게 풀어드립니다.<br />
                  누구나 자연어로 질문하면, AI가 관련 법령과 판례를 찾아드리고<br />
                  필요할 경우, 등록된 변호사 정보를 통해 추가 상담도 안내합니다.<br />
                  당신의 법률 고민, 이제 혼자 해결하지 마세요.<br />
                  Lawmate가 법률 친구가 되어드립니다.
                </div>

                {/* Search Bar */}
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="궁금한 사항을 물어봐 주세요!"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button onClick={handleSearch} className="search-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Question Cards Section */}
              <div className="cards-section">
                <h3 className="cards-title">용어 팁!</h3>
                <div className="cards-grid">
                  <div className="question-card">
                    <div className="card-title">공포 :</div>
                    <div className="card-content">
                      법령을 일반국민에게 널리 알리는 행위를 말한다.<br />
                      법률은 특별한 규정이 없는 한 공포한 날로부터 <br />
                      20일을 경과함으로써 효력을 발생한다.
                    </div>
                  </div>
                  
                  <div className="question-card">
                    <div className="card-title">훈령 :</div>
                    <div className="card-content">
                      요약 상급관청이 하급관청의 권한행사를 지시하기<br />
                      위해 하는 일반적 형식의 명령.
                    </div>
                  </div>
                  
                  <div className="question-card">
                    <div className="card-title">소멸시효 :</div>
                    <div className="card-content">
                      일정 시간이 지나면 권리를 행사할 수 없게 되는 <br />
                      제도
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
