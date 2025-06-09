import React, { useState, useEffect } from 'react';
import './UserRegister.css';
import { useNavigate, Link } from 'react-router-dom';
import lawmateLogo from './assets/lawmate_logo.png';
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';  // axios 명시적으로 import

function UserRegister() {
  let info = 'Register-form-item';

  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  // 회원가입 상태 관리
  const [formData, setFormData] = useState({
    full_name: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    email: '',
    phone: '',
    mainAddress: '',
    detailAddress: ''
  });
  
  // 폼 입력값 변경 핸들러
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Daum 우편번호 스크립트 추가
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 주소 검색 핸들러 추가
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        // 선택한 주소를 상세주소 입력란에 넣기
        const addr = data.address;
        let extraAddr = '';
        
        // 법정동명이 있을 경우 추가
        if(data.bname !== '') {
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가
        if(data.buildingName !== '') {
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 조합된 주소를 React 상태에 설정
        const fullAddress = `${addr} ${extraAddr}`.trim();
        setFormData({
          ...formData,
          mainAddress: fullAddress
        });
      }
    }).open();
  };

  // 취소 버튼 클릭 시 로그인 페이지로 이동
  const handleCancel = () => {
    navigate('/login');
  };

  // 가입하기 버튼 클릭 시 회원가입 로직 실행
  const handleRegister = async (e) => {
    e.preventDefault(); // 기본 이벤트 동작 방지
    console.log('회원가입 버튼 클릭됨');
    // 필수 입력 필드 체크
    if (!formData.full_name) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!formData.nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!formData.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!formData.passwordCheck) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }
    if (formData.password !== formData.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!formData.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!formData.phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!formData.mainAddress) {
      alert("주소를 검색해주세요.");
      return;
    }
    if (!formData.detailAddress) {
      alert("상세 주소를 입력해주세요.");
      return;
    }

    // 약관 동의 체크 여부 확인
    if (!useCheck || !privacyCheck) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    
    // 회원가입 데이터 준비 - 백엔드 데이터베이스 구조에 맞게 수정
    const userData = {
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name
    };
    
    // 백엔드에서 사용하지 않는 부가 데이터
    const additionalData = {
      nickname: formData.nickname,
      phone: formData.phone,
      address: `${formData.mainAddress} ${formData.detailAddress}`.trim(),
      marketing_consent: eventCheck
    };
    
    try {
      // axios로 직접 회원가입 API 호출
      console.log('직접 API 호출 시도');
      console.log('백엔드 서버 URL:', 'http://localhost:8000/api/v1/auth/register');
      console.log('전송할 데이터:', userData);
      console.log('추가 데이터(저장되지 않음):', additionalData);
      
      // 직접 호출 테스트
      // API 주소에 슬래시 추가 확인
      const response = await axios.post('http://localhost:8000/api/v1/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API 호출 결과:', response.data);
      
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        alert('회원가입에 실패했습니다. 응답에 토큰이 없습니다.');
      }
    } catch (err) {
      console.error('회원가입 오류:', err);
      
      let errorMessage = '회원가입 중 오류가 발생했습니다.';
      
      if (err.response) {
        // 서버에서 응답이 왔지만 오류 상태코드
        console.error('서버 응답:', err.response.data);
        console.error('상태 코드:', err.response.status);
        
        if (err.response.data && err.response.data.detail) {
          errorMessage = `오류: ${err.response.data.detail}`;
        }
      } else if (err.request) {
        // 요청은 보냈지만 응답을 받지 못함
        console.error('요청 오류:', err.request);
        errorMessage = '서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요. (백엔드 서버가 http://localhost:8000에서 실행 중인지 확인해주세요)';
      } else {
        errorMessage = `오류 발생: ${err.message}`;
      }
      
      alert(errorMessage);
    }
  };

  // 약관 동의 상태 관리
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [eventCheck, setEventCheck] = useState(false);

  // 약관 전체 동의 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllCheck(checked);
    setUseCheck(checked);
    setPrivacyCheck(checked);
    setEventCheck(checked);
  };

  // 약관 동의 상태 업데이트
  useEffect(() => {
    if(useCheck && privacyCheck && eventCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [useCheck, privacyCheck, eventCheck]);

  return (
    <div>
      <div className="header">
        <div className="nav-container">
          <a href="/lawmate_site" style={{ textDecoration: 'none' }}>
            <img src={lawmateLogo} alt="Lawmate Logo" className="nav-logo" />
          </a>
          <nav className="nav-menu">
            <Link to="/user-register" className="nav-item">법령</Link>
            <a href="#" className="nav-item">판례</a>
            <a href="#" className="nav-item">커뮤니티</a>
            <a href="#" className="nav-item">변호사</a>
            <a href="#" className="nav-item">용어사전</a>
            <a href="#" className="nav-item">공지사항</a>
            <a href="#" className="nav-item">고객지원</a>
          </nav>
        </div>
      </div>

      <div className="Register-Container">
        <div className="Register-box">
          <div className="Register-info">
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>사용자 회원가입</p>
            <p style={{fontSize: '16px', fontWeight: 'bold'}}>회원가입하고 다양한 혜택을 누려보세요!</p>
          </div>
          
          <form onSubmit={handleRegister}>
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이름</p>
              <div className={info}>
                <input 
                  type="text" 
                  id="full_name" 
                  name="full_name" 
                  placeholder="이름을 입력해주세요." 
                  style={{paddingLeft: '10px'}}
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>닉네임</p>
              <div className={info}>
                <input 
                  type="text" 
                  id="nickname" 
                  name="nickname" 
                  placeholder="로우메이트에서 다른 사람들에게 보일 닉네임을 정해주세요." 
                  style={{paddingLeft: '10px'}}
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호</p>
              <div className={info}>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="비밀번호를 입력해주세요.(숫자, 영문, 특수문자 포함 10~15글자)" 
                  style={{paddingLeft: '10px'}}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호 확인</p>
              <div className={info}>
                <input 
                  type="password" 
                  id="passwordCheck" 
                  name="passwordCheck" 
                  placeholder="비밀번호 재입력" 
                  style={{paddingLeft: '10px'}}
                  value={formData.passwordCheck}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이메일 주소</p>
              <div className={info}>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="이메일 주소를 입력해주세요." 
                  style={{paddingLeft: '10px'}}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>전화번호</p>
              <div className={info}>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="전화번호를 입력해주세요." 
                  style={{paddingLeft: '10px'}}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>주소</p>
              <div className={`${info} address-container`}>
                <input 
                  type="text" 
                  id="mainAddress" 
                  name="mainAddress" 
                  placeholder="주소를 검색해주세요" 
                  className="address-input" 
                  value={formData.mainAddress}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={handleAddressSearch} className="address-search-button">주소찾기</button>
              </div>
            </div>
            
            <div className="Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>상세 주소</p>
              <div className={info}>
                <input 
                  type="text" 
                  id="detailAddress" 
                  name="detailAddress" 
                  placeholder="상세 주소를 입력해주세요." 
                  style={{paddingLeft: '10px'}}
                  value={formData.detailAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* 에러 메시지 표시 */}
            {error && (
              <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
                {error}
              </div>
            )}
            
            <div className="Terms-of-use">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left', marginTop: '30px'}}>약관 동의</p>
              <div className="Terms-of-use-box">
                <div className="Terms-of-use-box-item">
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left', marginRight: '78px'}}>약관 전체 동의하기</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '12px', marginBottom: '10px', marginRight: '100px', textAlign: 'left'}}>.................................</p>
                  <input type="checkbox" id="allCheck" name="termsOfUse" checked={allCheck} onChange={handleAllCheck} />
                </div>
                <hr style={{width: '100%', border: '1px solid #fff', marginTop: '10px', marginBottom: '10px'}}/>
                <div className="Terms-of-use-box-item">
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left'}}>로우메이트 이용약관 동의</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'red'}}>(필수)</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                  <input type="checkbox" id="useCheck" name="termsOfUse" checked={useCheck} onChange={(e) => setUseCheck(e.target.checked)} />
                </div>
                <div className="Terms-of-use-box-item">
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', marginRight: '12px', textAlign: 'left'}}>개인정보 처리방침 동의</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'red'}}>(필수)</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                  <input type="checkbox" id="privacyCheck" name="termsOfUse" checked={privacyCheck} onChange={(e) => setPrivacyCheck(e.target.checked)} />
                </div>
                <div className="Terms-of-use-box-item">
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', marginRight: '20px', textAlign: 'left'}}>이벤트 정보 수신 동의</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'black'}}>(선택)</p>
                  <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                  <input type="checkbox" id="eventCheck" name="termsOfUse" checked={eventCheck} onChange={(e) => setEventCheck(e.target.checked)} />
                </div>
              </div>
            </div>
            
            <div className="Register-button">
              <button type="submit" className="Register-button-item">가입하기</button>
              <button type="button" className="Register-button-item" onClick={handleCancel}>취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;