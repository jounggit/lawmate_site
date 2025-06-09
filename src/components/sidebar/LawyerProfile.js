import React from 'react';
import userDefaultImage from '../../user-image/default-profile.png';

const LawyerProfile = ({ user }) => {
  if (!user || user.userType !== 'lawyer') {
    return null;
  }

  return (
    <div className="lawyer-content">
      <div className="lawyer-profile-header">
        <div>
          <h1>{user.name} 변호사님 환영합니다!</h1>
          <p>사용자님에게 {user.name} 변호사님을 소개해 보세요.</p>
        </div>
      </div>

      <div className="lawyer-profile-main">
        <div className="lawyer-image-section">
          <img src={user.profileImage || userDefaultImage} alt="변호사 프로필" className="lawyer-profile-image" />
        </div>
        
        <div className="lawyer-info-section">
          <div className="working-hours">
            <h3>상담 가능 시간:</h3>
            <p>평일 {user.lawyerInfo.workingHours.weekday} / 점심시간 {user.lawyerInfo.workingHours.lunchTime} 제외</p>
            <p>{user.lawyerInfo.workingHours.saturday}</p>
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
              <span className="value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="label">영문 이름:</span>
              <span className="value">Hong Gil-dong</span>
            </div>
            <div className="info-item">
              <span className="label">이메일:</span>
              <span className="value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="label">연락처:</span>
              <span className="value">{user.lawyerInfo.contact.phone}</span>
              <button className="contact-button">전화걸기</button>
            </div>
            <div className="info-item">
              <span className="label">주소:</span>
              <span className="value">{user.lawyerInfo.contact.address}</span>
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
              {user.lawyerInfo.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
          <div className="experience">
            <h3>경력:</h3>
            <ul>
              {user.lawyerInfo.experience.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;