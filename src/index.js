import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// GitHub Pages 배포에 대비한 basename 설정
// 개발 환경에서는 비어있고 배포할 때는 '/lawmate_site'가 됩니다
const basename = process.env.NODE_ENV === 'production' && window.location.hostname !== 'localhost' 
  ? '/lawmate_site' 
  : '';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
