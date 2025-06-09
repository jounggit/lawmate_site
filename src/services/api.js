import axios from 'axios';

// API 기본 URL 설정
const API_BASE_URL = 'http://localhost:8000';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 - 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 처리 (인증 만료)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      // 페이지 새로고침 또는 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 인증 관련 API
 */
const authApi = {
  /**
   * 이메일과 비밀번호로 로그인
   */
  login: async (email, password) => {
    try {
      console.log('API 서비스 - 로그인 시도:', email);
      const response = await api.post('/api/v1/auth/token', 
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      console.log('로그인 응답:', response.data);
      
      // 로그인 성공 시 토큰 저장
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        
        // 사용자 정보 조회
        const userInfo = await authApi.getCurrentUser();
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        return userInfo;
      }
      
      return response.data;
    } catch (error) {
      console.error('로그인 오류:', error);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
        console.error('상태 코드:', error.response.status);
      }
      throw error;
    }
  },
  
  /**
   * 일반 사용자 회원가입
   */
  register: async (userData) => {
    try {
      console.log('회원가입 데이터:', userData);
      const response = await api.post('/api/v1/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 오류:', error);
      if (error.response) {
        // 서버가 응답을 보냈지만 오류 상태코드인 경우
        console.error('서버 응답:', error.response.data);
        console.error('상태 코드:', error.response.status);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('요청 오류:', error.request);
      } else {
        // 요청 설정 중 오류가 발생한 경우
        console.error('오류 메시지:', error.message);
      }
      throw error;
    }
  },
  
  /**
   * 변호사 회원가입
   */
  registerLawyer: async (lawyerData) => {
    try {
      console.log('변호사 회원가입 데이터:', lawyerData);
      const response = await api.post('/api/v1/auth/register/lawyer', lawyerData);
      return response.data;
    } catch (error) {
      console.error('변호사 회원가입 오류:', error);
      if (error.response) {
        // 서버가 응답을 보냈지만 오류 상태코드인 경우
        console.error('서버 응답:', error.response.data);
        console.error('상태 코드:', error.response.status);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        console.error('요청 오류:', error.request);
      } else {
        // 요청 설정 중 오류가 발생한 경우
        console.error('오류 메시지:', error.message);
      }
      throw error;
    }
  },
  
  /**
   * 현재 사용자 정보 조회
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/v1/users/me');
      return response.data;
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error);
      throw error;
    }
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
    try {
      const response = await api.get('/api/v1/users/me');
      return response.data;
    } catch (error) {
      console.error('프로필 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 사용자 프로필 업데이트
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/v1/users/me', profileData);
      return response.data;
    } catch (error) {
      console.error('프로필 업데이트 오류:', error);
      throw error;
    }
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
    try {
      const response = await api.post('/cases', caseData);
      return response.data;
    } catch (error) {
      console.error('사례 생성 오류:', error);
      throw error;
    }
  },
  
  /**
   * 사용자의 모든 법률 사례 조회
   */
  getMyCases: async () => {
    try {
      const response = await api.get('/cases/me');
      return response.data;
    } catch (error) {
      console.error('사례 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 특정 법률 사례 조회
   */
  getCase: async (caseId) => {
    try {
      const response = await api.get(`/cases/${caseId}`);
      return response.data;
    } catch (error) {
      console.error('사례 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 법률 사례 업데이트
   */
  updateCase: async (caseId, caseData) => {
    try {
      const response = await api.put(`/cases/${caseId}`, caseData);
      return response.data;
    } catch (error) {
      console.error('사례 업데이트 오류:', error);
      throw error;
    }
  },
  
  /**
   * 법률 사례 삭제
   */
  deleteCase: async (caseId) => {
    try {
      const response = await api.delete(`/cases/${caseId}`);
      return response.data;
    } catch (error) {
      console.error('사례 삭제 오류:', error);
      throw error;
    }
  },
  
  /**
   * 법률 분석 요청
   */
  analyzeCase: async (data) => {
    try {
      const response = await api.post('/cases/analyze', data);
      return response.data;
    } catch (error) {
      console.error('법률 분석 오류:', error);
      throw error;
    }
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
    try {
      const response = await api.get(`/lawyers?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('변호사 목록 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 특정 변호사 정보 조회
   */
  getLawyer: async (lawyerId) => {
    try {
      const response = await api.get(`/lawyers/${lawyerId}`);
      return response.data;
    } catch (error) {
      console.error('변호사 정보 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 변호사 검색
   */
  searchLawyers: async (searchTerm, specialization = '', page = 1, limit = 10) => {
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        specialization: specialization,
        page: page,
        limit: limit,
      });
      
      const response = await api.get(`/lawyers/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('변호사 검색 오류:', error);
      throw error;
    }
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
    try {
      const response = await api.post('/documents', documentData);
      return response.data;
    } catch (error) {
      console.error('문서 생성 오류:', error);
      throw error;
    }
  },
  
  /**
   * 사용자의 모든 문서 조회
   */
  getMyDocuments: async () => {
    try {
      const response = await api.get('/documents/me');
      return response.data;
    } catch (error) {
      console.error('문서 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 특정 문서 조회
   */
  getDocument: async (documentId) => {
    try {
      const response = await api.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('문서 조회 오류:', error);
      throw error;
    }
  },
  
  /**
   * 문서 업데이트
   */
  updateDocument: async (documentId, documentData) => {
    try {
      const response = await api.put(`/documents/${documentId}`, documentData);
      return response.data;
    } catch (error) {
      console.error('문서 업데이트 오류:', error);
      throw error;
    }
  },
  
  /**
   * 문서 삭제
   */
  deleteDocument: async (documentId) => {
    try {
      const response = await api.delete(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error('문서 삭제 오류:', error);
      throw error;
    }
  },
  
  /**
   * 문서 다운로드
   */
  downloadDocument: async (documentId, format = 'pdf') => {
    try {
      const response = await api.get(`/documents/${documentId}/download?format=${format}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('문서 다운로드 오류:', error);
      throw error;
    }
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
    try {
      const params = new URLSearchParams({
        q: query,
        page: page,
        limit: limit,
      });
      
      const response = await api.get(`/laws/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('법령 검색 오류:', error);
      throw error;
    }
  },
  
  /**
   * 특정 법령 조회
   */
  getLaw: async (lawId) => {
    try {
      const response = await api.get(`/laws/${lawId}`);
      return response.data;
    } catch (error) {
      console.error('법령 조회 오류:', error);
      throw error;
    }
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
    try {
      const params = new URLSearchParams({
        q: query,
        page: page,
        limit: limit,
      });
      
      const response = await api.get(`/precedents/search?${params}`);
      return response.data;
    } catch (error) {
      console.error('판례 검색 오류:', error);
      throw error;
    }
  },
  
  /**
   * 특정 판례 조회
   */
  getPrecedent: async (precedentId) => {
    try {
      const response = await api.get(`/precedents/${precedentId}`);
      return response.data;
    } catch (error) {
      console.error('판례 조회 오류:', error);
      throw error;
    }
  },
};

// API 서비스 객체 내보내기
const apiService = {
  auth: authApi,
  user: userApi,
  case: caseApi,
  lawyer: lawyerApi,
  document: documentApi,
  law: lawApi,
  precedent: precedentApi,
};

export default apiService;