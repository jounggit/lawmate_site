/**
 * LawMate API 서비스
 * 
 * 백엔드 API와의 통신을 담당하는 서비스 클래스
 * 각 엔드포인트에 대한 HTTP 요청 메소드 제공
 */

// API 기본 URL 설정
const API_BASE_URL = 'http://localhost:8000';

/**
 * 헤더에 인증 토큰을 추가하는 함수
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

/**
 * 기본 fetch 함수 래퍼
 */
const fetchWrapper = async (url, options) => {
  try {
    const response = await fetch(url, options);
    
    // 응답이 JSON이 아닌 경우를 처리
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // 응답 상태가 실패인 경우 에러 처리
      if (!response.ok) {
        throw new Error(data.detail || 'API 요청 실패');
      }
      
      return data;
    } else {
      // JSON이 아닌 응답 처리 (텍스트 등)
      const text = await response.text();
      
      if (!response.ok) {
        throw new Error(text || 'API 요청 실패');
      }
      
      return text;
    }
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
};

/**
 * 인증 관련 API
 */
const authApi = {
  /**
   * 이메일과 비밀번호로 로그인
   */
  login: async (email, password) => {
    const response = await fetchWrapper(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });
    
    // 로그인 성공 시 토큰 저장
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    
    return response;
  },
  
  /**
   * 회원가입
   */
  register: async (userData) => {
    return fetchWrapper(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },
  
  /**
   * 변호사 회원가입
   */
  registerLawyer: async (lawyerData) => {
    return fetchWrapper(`${API_BASE_URL}/lawyers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lawyerData),
    });
  },
  
  /**
   * 현재 사용자 정보 조회
   */
  getCurrentUser: async () => {
    return fetchWrapper(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 로그아웃 (클라이언트 측에서 토큰 제거)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  },
};

/**
 * 사용자 관련 API
 */
const userApi = {
  /**
   * 사용자 프로필 조회
   */
  getProfile: async () => {
    return fetchWrapper(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 사용자 프로필 업데이트
   */
  updateProfile: async (profileData) => {
    return fetchWrapper(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
  },
};

/**
 * 법률 사례 관련 API
 */
const caseApi = {
  /**
   * 새 법률 사례 생성
   */
  createCase: async (caseData) => {
    return fetchWrapper(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(caseData),
    });
  },
  
  /**
   * 사용자의 모든 법률 사례 조회
   */
  getMyCases: async () => {
    return fetchWrapper(`${API_BASE_URL}/cases/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 법률 사례 조회
   */
  getCase: async (caseId) => {
    return fetchWrapper(`${API_BASE_URL}/cases/${caseId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 법률 사례 업데이트
   */
  updateCase: async (caseId, caseData) => {
    return fetchWrapper(`${API_BASE_URL}/cases/${caseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(caseData),
    });
  },
  
  /**
   * 법률 사례 삭제
   */
  deleteCase: async (caseId) => {
    return fetchWrapper(`${API_BASE_URL}/cases/${caseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 법률 분석 요청
   */
  analyzeCase: async (caseId) => {
    return fetchWrapper(`${API_BASE_URL}/cases/${caseId}/analyze`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
};

/**
 * 채팅 관련 API
 */
const chatApi = {
  /**
   * 메시지 전송 및 AI 응답 요청
   */
  sendMessage: async (messageData) => {
    return fetchWrapper(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(messageData),
    });
  },
  
  /**
   * 사용자의 채팅 기록 조회
   */
  getChatHistory: async () => {
    return fetchWrapper(`${API_BASE_URL}/chat/history`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 대화 조회
   */
  getConversation: async (conversationId) => {
    return fetchWrapper(`${API_BASE_URL}/chat/conversation/${conversationId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 대화 삭제
   */
  deleteConversation: async (conversationId) => {
    return fetchWrapper(`${API_BASE_URL}/chat/conversation/${conversationId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

/**
 * 변호사 관련 API
 */
const lawyerApi = {
  /**
   * 변호사 목록 조회
   */
  getLawyers: async (page = 1, limit = 10) => {
    return fetchWrapper(`${API_BASE_URL}/lawyers?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 변호사 정보 조회
   */
  getLawyer: async (lawyerId) => {
    return fetchWrapper(`${API_BASE_URL}/lawyers/${lawyerId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 변호사 검색
   */
  searchLawyers: async (searchTerm, specialization = '', page = 1, limit = 10) => {
    const params = new URLSearchParams({
      q: searchTerm,
      specialization: specialization,
      page: page,
      limit: limit,
    });
    
    return fetchWrapper(`${API_BASE_URL}/lawyers/search?${params}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
};

/**
 * 문서 관련 API
 */
const documentApi = {
  /**
   * 새 문서 생성
   */
  createDocument: async (documentData) => {
    return fetchWrapper(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(documentData),
    });
  },
  
  /**
   * 사용자의 모든 문서 조회
   */
  getMyDocuments: async () => {
    return fetchWrapper(`${API_BASE_URL}/documents/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 문서 조회
   */
  getDocument: async (documentId) => {
    return fetchWrapper(`${API_BASE_URL}/documents/${documentId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 문서 업데이트
   */
  updateDocument: async (documentId, documentData) => {
    return fetchWrapper(`${API_BASE_URL}/documents/${documentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(documentData),
    });
  },
  
  /**
   * 문서 삭제
   */
  deleteDocument: async (documentId) => {
    return fetchWrapper(`${API_BASE_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 문서 다운로드
   */
  downloadDocument: async (documentId, format = 'pdf') => {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}/download?format=${format}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to download document');
    }
    
    return response.blob();
  },
};

/**
 * 법령 관련 API
 */
const lawApi = {
  /**
   * 법령 검색
   */
  searchLaws: async (query, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      q: query,
      page: page,
      limit: limit,
    });
    
    return fetchWrapper(`${API_BASE_URL}/laws/search?${params}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 법령 조회
   */
  getLaw: async (lawId) => {
    return fetchWrapper(`${API_BASE_URL}/laws/${lawId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
};

/**
 * 판례 관련 API
 */
const precedentApi = {
  /**
   * 판례 검색
   */
  searchPrecedents: async (query, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      q: query,
      page: page,
      limit: limit,
    });
    
    return fetchWrapper(`${API_BASE_URL}/precedents/search?${params}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
  
  /**
   * 특정 판례 조회
   */
  getPrecedent: async (precedentId) => {
    return fetchWrapper(`${API_BASE_URL}/precedents/${precedentId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
};

// API 서비스 객체 내보내기
const apiService = {
  auth: authApi,
  user: userApi,
  case: caseApi,
  chat: chatApi,
  lawyer: lawyerApi,
  document: documentApi,
  law: lawApi,
  precedent: precedentApi,
};

export default apiService;