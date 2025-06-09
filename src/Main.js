import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Sidebar from './components/sidebar/Sidebar';
import LawyerProfile from './components/sidebar/LawyerProfile';
import ChatInterface from './components/chat/ChatInterface';
import SampleCards from './components/layout/SampleCards';
import SearchBox from './components/layout/SearchBox';
import { getDummyResponse } from './services/chatService';
import './Main.css';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const chatInputRef = useRef(null);
  const mainInputRef = useRef(null);
  
  // 초기 웰컴 메시지 표시
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: "안녕하세요, LawMate입니다. 법률 관련 질문이 있으시면 언제든지 물어봐주세요.",
      time: new Date().toLocaleTimeString(),
      isUser: false
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch(e);
    }
  };

  // 검색창에서 엔터키를 누르거나 검색 버튼을 클릭했을 때 메시지 전송
  const handleSearch = async (e) => {
    e?.preventDefault();
    
    if (searchQuery.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: searchQuery,
      time: new Date().toLocaleTimeString(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 로딩 메시지 추가
      const loadingMessage = {
        id: Date.now() + 1,
        text: "답변을 생성하고 있습니다...",
        time: new Date().toLocaleTimeString(),
        isUser: false,
        isLoading: true
      };
      
      setMessages(prev => [...prev, loadingMessage]);

      // 실제 API 호출 대신 임시로 더미 응답 사용 (개발 중에만 사용)
      // 실제 구현 시에는 아래 주석 해제 후 사용
      /* 
      const response = await apiService.case.analyzeCase({
        description: searchQuery
      });
      */
      
      // 더미 응답 (실제 API 연동 시 제거)
      const response = getDummyResponse(searchQuery);
      
      // 잠시 지연 효과 (실제 API 연동 시 제거)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 로딩 메시지 제거
      setMessages(prev => prev.filter(msg => !msg.isLoading));

      // 응답 메시지 추가
      const aiMessage = {
        id: Date.now() + 2,
        text: response.recommendation || "죄송합니다. 답변을 생성하는 데 문제가 발생했습니다.",
        time: new Date().toLocaleTimeString(),
        isUser: false,
        relatedLaws: response.related_laws?.map(law => `${law.name}: ${law.content}`),
        relatedPrecedents: response.related_precedents?.map(precedent => `${precedent.case_number}: ${precedent.title}`)
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // 검색창 비우기
      setSearchQuery('');
      
      // 채팅 입력창에 포커스
      chatInputRef.current?.focus();
    } catch (error) {
      console.error('AI 응답 오류:', error);
      
      // 로딩 메시지 제거
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      
      // 에러 메시지 추가
      const errorMessage = {
        id: Date.now() + 3,
        text: "죄송합니다. 답변을 생성하는 동안 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        time: new Date().toLocaleTimeString(),
        isUser: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅이 시작되었는지 여부 (첫 번째 메시지는 웰컴 메시지)
  const isChatStarted = messages.length > 1;

  return (
    <div className="app">
      <Header />

      <div className="main-container">
        <div className="content-wrapper">
          <Sidebar />

          {user && user.userType === 'lawyer' ? (
            <LawyerProfile user={user} />
          ) : (
            <div className="main-content">
              {/* 상단 텍스트 영역 - 채팅이 시작되지 않았을 때만 표시 */}
              {!isChatStarted && (
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
                </div>
              )}

              {/* 채팅 영역 - 메시지가 있을 때만 표시 */}
              {isChatStarted && (
                <ChatInterface 
                  messages={messages}
                  searchQuery={searchQuery}
                  isLoading={isLoading}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  handleKeyPress={handleKeyPress}
                  chatInputRef={chatInputRef}
                />
              )}

              {/* 샘플 카드 영역 - 채팅이 시작되지 않았을 때만 표시 */}
              {!isChatStarted && <SampleCards />}
              
              {/* 검색창 - 항상 표시되지만 채팅이 시작되면 ChatInterface의 입력창 사용 */}
              {!isChatStarted && (
                <SearchBox 
                  searchQuery={searchQuery}
                  isLoading={isLoading}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  handleKeyPress={handleKeyPress}
                  mainInputRef={mainInputRef}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;