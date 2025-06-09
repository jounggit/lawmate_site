import React, { useRef, useEffect } from 'react';
import lawmateLogo from '../../assets/Lawmate.png';
import lawBookIcon from '../../assets/LawBook.png';
import lawHammerIcon from '../../assets/LawHammer.png';
import './ChatInterface.css';

const ChatInterface = ({ 
  messages, 
  searchQuery, 
  isLoading, 
  setSearchQuery, 
  handleSearch, 
  handleKeyPress,
  chatInputRef 
}) => {
  const messagesEndRef = useRef(null);

  // 메시지 추가시 스크롤 자동 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-section">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-title">
            <img src={lawmateLogo} alt="LawMate" className="chat-logo" />
            <span>법률 상담</span>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.isUser ? 'user-message' : 'ai-message'}`}>
              <div className="message-avatar">
                {message.isUser ? (
                  <div className="user-avatar">사용자</div>
                ) : (
                  <div className="ai-avatar">
                    <img src={lawmateLogo} alt="LawMate" className="ai-logo" />
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                {message.relatedLaws && message.relatedLaws.length > 0 && (
                  <div className="related-content laws-content">
                    <h4>
                      <img src={lawBookIcon} alt="Law Book" className="law-book-icon" />
                      관련 법령
                    </h4>
                    <ul>
                      {message.relatedLaws.map((law, index) => (
                        <li key={`law-${index}`}>
                          {typeof law === 'string' ? (
                            law
                          ) : (
                            <>
                              <strong>{law.title}</strong>
                              <span>{law.content}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.relatedPrecedents && message.relatedPrecedents.length > 0 && (
                  <div className="related-content precedents-content">
                    <h4>
                      <img src={lawHammerIcon} alt="Law Hammer" className="law-hammer-icon" />
                      관련 판례
                    </h4>
                    <ul>
                      {message.relatedPrecedents.map((precedent, index) => (
                        <li key={`precedent-${index}`}>
                          {typeof precedent === 'string' ? (
                            precedent
                          ) : (
                            <>
                              <strong>{precedent.title}</strong>
                              <ul className="precedent-details">
                                <li>
                                  <span className="detail-label">사건명 : </span>
                                  <span className="detail-content">{precedent.caseName}</span>
                                </li>
                                <li>
                                  <span className="detail-label">판시사항 : </span>
                                  <span className="detail-content">{precedent.summary}</span>
                                </li>
                                <li>
                                  <span className="detail-label">판결요지 : </span>
                                  <span className="detail-content">{precedent.ruling}</span>
                                </li>
                              </ul>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.responseMethods && message.responseMethods.length > 0 && (
                  <div className="related-content response-methods-content">
                    <h4>
                      <img src={lawBookIcon} alt="Response Methods" className="law-book-icon" />
                      {message.responseMethods[0].title}
                    </h4>
                    <ul className="response-methods-list">
                      {message.responseMethods[0].steps.map((step, index) => (
                        <li key={`step-${index}`}>
                          <span className="step-content">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-footer">
          <form onSubmit={handleSearch} className="chat-input-form">
            <input
              type="text"
              ref={chatInputRef}
              placeholder="질문을 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="chat-send-btn" 
              disabled={isLoading || !searchQuery.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="chat-disclaimer">
        * 법률 상담 내용은 참고용으로만 활용해 주세요. 정확한 법률 자문은 변호사와 상담하시는 것을 권장합니다.
      </div>
    </div>
  );
};

export default ChatInterface;