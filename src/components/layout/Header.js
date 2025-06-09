import React from 'react';
import lawmateLogo from '../../assets/lawmate_logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="nav-container">
        <a href="/" style={{ textDecoration: 'none' }}>
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
  );
};

export default Header;