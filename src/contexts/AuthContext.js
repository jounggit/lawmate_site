import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/api';

// 인증 컨텍스트 생성
const AuthContext = createContext(null);

// 인증 컨텍스트 프로바이더 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 앱 초기화 시 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        // 로컬 스토리지에서 토큰 확인
        const token = localStorage.getItem('token');
        
        if (!token) {
          // 토큰이 없으면 비인증 상태로 설정
          setUser(null);
          setLoading(false);
          return;
        }
        
        // 토큰이 있으면 사용자 정보 로드
        const userData = await apiService.auth.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('사용자 정보 로드 실패:', err);
        setError('사용자 정보를 로드하는데 실패했습니다.');
        // 오류 발생 시 토큰 제거 (만료 또는 유효하지 않은 토큰)
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // 로그인 함수
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.auth.login(email, password);
      // 로그인 성공 후 사용자 정보 로드
      const userData = await apiService.auth.getCurrentUser();
      setUser(userData);
      return true;
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.auth.register(userData);
      // 회원가입 후 자동 로그인
      return await login(userData.email, userData.password);
    } catch (err) {
      console.error('회원가입 실패:', err);
      setError('회원가입 중 오류가 발생했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 변호사 회원가입 함수
  const registerLawyer = async (lawyerData) => {
    setLoading(true);
    setError(null);
    
    try {
      await apiService.auth.registerLawyer(lawyerData);
      // 회원가입 후 자동 로그인
      return await login(lawyerData.email, lawyerData.password);
    } catch (err) {
      console.error('변호사 회원가입 실패:', err);
      setError('변호사 회원가입 중 오류가 발생했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    apiService.auth.logout();
    setUser(null);
  };

  // 사용자 정보 업데이트 함수
  const updateUserProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await apiService.user.updateProfile(profileData);
      setUser(updatedUser);
      return true;
    } catch (err) {
      console.error('프로필 업데이트 실패:', err);
      setError('프로필 업데이트 중 오류가 발생했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 컨텍스트 값 정의
  const value = {
    user,
    loading,
    error,
    login,
    register,
    registerLawyer,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 인증 컨텍스트 사용 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;