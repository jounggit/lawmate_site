import React, { useState, useEffect } from 'react';
import './LawyerRegister.css';
import { useNavigate, Link } from 'react-router-dom';
import lawmateLogo from './assets/lawmate_logo.png';

function LawyerRegister() {
  let info = 'lawyer-Register-form-item';

  const navigate = useNavigate();

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
        // 조합된 주소를 해당 필드에 넣기
        document.getElementById('mainAddress').value = `${addr} ${extraAddr}`.trim();
      }
    }).open();
  };

  // 취소 버튼 클릭 시 로그인 페이지로 이동
  const handleCancel = () => {
    navigate('/login');
  };

  // 가입하기 버튼 클릭 시 회원가입 로직 실행
  const handleRegister = () => {
    // 입력 필드 값 가져오기
    const name = document.getElementById("name").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordCheck = document.getElementById("passwordCheck").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mainAddress = document.getElementById("mainAddress").value.trim();
    const detailAddress = document.getElementById("address").value.trim();
  
    // 필수 입력 필드 체크
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordCheck) {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!mainAddress) {
      alert("주소를 검색해주세요.");
      return;
    }
    if (!detailAddress) {
      alert("상세 주소를 입력해주세요.");
      return;
    }

    // 약관 동의 체크 여부 확인
    if (!useCheck || !privacyCheck || !AdviceCheck) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    navigate('/login');  // 로그인 페이지로 이동
  };

  // 약관 동의 상태 관리
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [AdviceCheck, setAdviceCheck] = useState(false);

  // 약관 전체 동의 핸들러
  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setAllCheck(checked);
    setUseCheck(checked);
    setPrivacyCheck(checked);
    setAdviceCheck(checked);
  };

  // 약관 동의 상태 업데이트
  useEffect(() => {
    if(useCheck && privacyCheck && AdviceCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [useCheck, privacyCheck, AdviceCheck]);

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

      <div className="lawyer-Register-Container">
        <div className="lawyer-Register-box">
          <div className="lawyer-Register-info">
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>변호사 회원가입</p>
            <p style={{fontSize: '16px', fontWeight: 'bold'}}>회원가입하고 다양한 혜택을 누려보세요!</p>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이름</p>
              <div className={info}>
                <input type="text" id="name" name="name" placeholder="이름을 입력해주세요." style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>닉네임</p>
              <div className={info}>
                <input type="text" id="nickname" name="nickname" placeholder="로우메이트에서 다른 사람들에게 보일 닉네임을 정해주세요." style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호</p>
              <div className={info}>
                <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요.(숫자, 영문, 특수문자 포함 10~15글자)" style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호 확인</p>
              <div className={info}>
                <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호 재입력" style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이메일 주소</p>
              <div className={info}>
                <input type="email" id="email" name="email" placeholder="이메일 주소를 입력해주세요." style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>전화번호</p>
              <div className={info}>
                <input type="tel" id="phone" name="phone" placeholder="전화번호를 입력해주세요." style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>주소</p>
              <div className={`${info} lawyer-address-container`}>
                <input type="text" id="mainAddress" name="mainAddress" placeholder="주소를 검색해주세요" className="lawyer-address-input" readOnly/>
                <button type="button" onClick={handleAddressSearch} className="lawyer-address-search-button">주소찾기</button>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>상세 주소</p>
              <div className={info}>
                <input type="text" id="address" name="address" placeholder="상세 주소를 입력해주세요." style={{paddingLeft: '10px'}}/>
              </div>
            </div>
            <div className="lawyer-Register-form">
              <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>변호사 자격 확인</p>
              <div className={info}>
                <input type="text" id="address" name="address" placeholder="변호사 자격증 파일을 첨부해주세요. (확인까지 시간이 걸릴 수 있습니다.)" style={{paddingLeft: '10px', flex: 1}}/>
              </div>
            </div>
          </div>
          <div className="lawyer-Terms-of-use">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left', marginTop: '30px'}}>약관 동의</p>
            <div className="lawyer-Terms-of-use-box">
              <div className="lawyer-Terms-of-use-box-item">
                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left', marginRight: '78px'}}>약관 전체 동의하기</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '12px', marginBottom: '10px', marginRight: '100px', textAlign: 'left'}}>.................................</p>
                <input type="checkbox" id="allCheck" name="termsOfUse" checked={allCheck} onChange={handleAllCheck} />
              </div>
              <hr style={{width: '100%', border: '1px solid #fff', marginTop: '10px', marginBottom: '10px'}}/>
              <div className="lawyer-Terms-of-use-box-item">
                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left'}}>로우메이트 이용약관 동의</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'red'}}>(필수)</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                <input type="checkbox" id="useCheck" name="termsOfUse" checked={useCheck} onChange={(e) => setUseCheck(e.target.checked)} />
              </div>
              <div className="lawyer-Terms-of-use-box-item">
                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', marginRight: '12px', textAlign: 'left'}}>개인정보 처리방침 동의</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'red'}}>(필수)</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                <input type="checkbox" id="privacyCheck" name="termsOfUse" checked={privacyCheck} onChange={(e) => setPrivacyCheck(e.target.checked)} />
              </div>
              <div className="lawyer-Terms-of-use-box-item">
                <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', marginRight: '9px', textAlign: 'left'}}>법률 상담 이용약관 동의</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '2px', marginBottom: '10px', textAlign: 'left', color: 'red'}}>(필수)</p>
                <p style={{fontSize: '13px', fontWeight: 'bold', marginLeft: '20px', marginBottom: '10px', marginRight: '99px', textAlign: 'left'}}>.................................</p>
                <input type="checkbox" id="privacyCheck" name="termsOfUse" checked={AdviceCheck} onChange={(e) => setAdviceCheck(e.target.checked)} />
              </div>
            </div>
          </div>
          <div className="lawyer-Register-button">
            <button type="button" className="lawyer-Register-button-item" onClick={handleRegister}>가입하기</button>
            <button type="button" className="lawyer-Register-button-item" onClick={handleCancel}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerRegister;