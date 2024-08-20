import React from 'react';
import kakaoLoginButton from '../assets/images/kakaoLoginButton.png';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    // 백엔드에서 제공하는 카카오 로그인 URL로 리다이렉트 (수정 필요)
    window.location.href = 'http://your-backend-url.com/auth/kakao';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">로그인</h1>
        <p className="login-description">
          간편하게 로그인하고 다양한 서비스를 이용해보세요.
        </p>
        <button className="kakao-login-button" onClick={handleKakaoLogin} >   
          <img src={kakaoLoginButton} alt="카카오 로그인" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;