import React, { useState, useEffect } from 'react';
import './UserRegister.css';
import { useNavigate } from 'react-router-dom';


function UserRegister() {
  let info = 'Register-form-item';

  const navigate = useNavigate();

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
    const address = document.getElementById("address").value.trim();
  
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
    if (!address) {
      alert("상세 주소를 입력해주세요.");
      return;
    }

    // 약관 동의 체크 여부 확인
    if (!useCheck || !privacyCheck) {
      alert("필수 약관에 동의해주세요.");
      return;
    }
    navigate('/login');  // 로그인 페이지로 이동
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
    <div className="Register-Container">
      <div className="Register-box">
        <div className="Register-info">
          <p style={{fontSize: '24px', fontWeight: 'bold'}}>회원가입</p>
          <p style={{fontSize: '16px', fontWeight: 'bold'}}>회원가입하고 다양한 혜택을 누려보세요!</p>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이름</p>
            <div className={info}>
              <input type="text" id="name" name="name" placeholder="이름을 입력해주세요." style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>닉네임</p>
            <div className={info}>
              <input type="text" id="nickname" name="nickname" placeholder="로우메이트에서 다른 사람들에게 보일 닉네임을 정해주세요." style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호</p>
            <div className={info}>
              <input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요.(숫자, 영문, 특수문자 포함 10~15글자)" style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>비밀번호 확인</p>
            <div className={info}>
              <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호 재입력" style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>이메일 주소</p>
            <div className={info}>
              <input type="email" id="email" name="email" placeholder="이메일 주소를 입력해주세요." style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>전화번호</p>
            <div className={info}>
              <input type="tel" id="phone" name="phone" placeholder="전화번호를 입력해주세요." style={{paddingLeft: '10px'}}/>
            </div>
          </div>
          <div className="Register-form">
            <p style={{fontSize: '13px', fontWeight: 'bold', marginBottom: '10px'}}>상세 주소</p>
            <div className={info}>
              <input type="text" id="address" name="address" placeholder="상세 주소를 입력해주세요." style={{paddingLeft: '10px'}}/>
            </div>
          </div>
        </div>
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
          <button type="button" className="Register-button-item" onClick={handleRegister}>가입하기</button>
          <button type="button" className="Register-button-item" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;