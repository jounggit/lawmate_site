import React, { useState } from 'react';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './LegalConsultation.css';

const LegalConsultation = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('사건 내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // 사례 생성 요청
      const caseData = {
        title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
        description: description,
        status: 'pending',
      };
      
      const newCase = await apiService.case.createCase(caseData);
      
      // 생성된 사례에 대한 분석 요청
      const analysisResult = await apiService.case.analyzeCase(newCase.id);
      
      setAnalysis(analysisResult);
    } catch (err) {
      console.error('법률 상담 오류:', err);
      setError('법률 상담 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="legal-consultation">
      <h2>법률 상담</h2>
      <p className="description">
        귀하의 법률 문제에 대해 상세히 설명해주세요. AI 분석을 통해 관련 법령, 판례 정보 및 대응 방안을 제공해드립니다.
      </p>
      
      {error && <div className="error-message">{error}</div>}
      
      {!analysis ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">사건 내용:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="어떤 법률 문제에 대해 상담이 필요하신가요? 상황을 자세히 설명해주세요."
              rows={10}
              disabled={isSubmitting}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? '분석 중...' : '법률 분석 요청'}
          </button>
        </form>
      ) : (
        <div className="analysis-result">
          <h3>법률 분석 결과</h3>
          
          {analysis.related_laws && analysis.related_laws.length > 0 && (
            <div className="section">
              <h4>관련 법령</h4>
              <ul>
                {analysis.related_laws.map((law, index) => (
                  <li key={index}>
                    <strong>{law.name}</strong>: {law.description}
                    <p className="law-content">{law.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.related_precedents && analysis.related_precedents.length > 0 && (
            <div className="section">
              <h4>관련 판례</h4>
              <ul>
                {analysis.related_precedents.map((precedent, index) => (
                  <li key={index}>
                    <strong>{precedent.case_number}</strong>
                    <p className="precedent-title">{precedent.title}</p>
                    <p className="precedent-summary">{precedent.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {analysis.recommendation && (
            <div className="section">
              <h4>법률 의견</h4>
              <p className="recommendation">{analysis.recommendation}</p>
            </div>
          )}
          
          {analysis.documents && analysis.documents.length > 0 && (
            <div className="section">
              <h4>추천 문서</h4>
              <ul>
                {analysis.documents.map((doc, index) => (
                  <li key={index}>
                    <button 
                      className="document-btn"
                      onClick={() => window.open(`/documents/${doc.id}`)}
                    >
                      {doc.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            className="reset-btn" 
            onClick={() => {
              setAnalysis(null);
              setDescription('');
            }}
          >
            새 상담 시작
          </button>
        </div>
      )}
    </div>
  );
};

export default LegalConsultation;