import React from 'react';

const SampleCards = () => {
  return (
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
  );
};

export default SampleCards;