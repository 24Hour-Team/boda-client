import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../features/auth/authSlice";
import kakaoLoginButton from '../assets/images/kakaoLoginButton.png';
import '../styles/LoginPage.css';

const LoginPage = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKakaoLogin = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //백엔드에서 제공하는 카카오 로그인 URL로 리다이렉트 
    window.location.href = `${backendUrl}/oauth2/authorization/kakao`;
    //dispatch(loginSuccess(true));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleKakaoLogout = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${BASE_URL}/v1/logout/kakao`;

    // Redux 상태 업데이트 및 로그아웃 처리
    dispatch(logout());
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">로그인</h1>
        <p className="login-description">
          간편하게 로그인하고 다양한 서비스를 이용해보세요.
        </p>
        <button type="button" className="kakao-login-button">   
          <img src={kakaoLoginButton} alt="카카오 로그인" onClick={handleKakaoLogin}/>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;