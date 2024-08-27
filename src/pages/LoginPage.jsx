import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import kakaoLoginButton from '../assets/images/kakaoLoginButton.png';
import styles from '../styles/LoginPage.module.css'; // CSS Module로 변경

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKakaoLogin = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // 백엔드에서 제공하는 카카오 로그인 URL로 리다이렉트
    window.location.href = `${backendUrl}/oauth2/authorization/kakao`;
    dispatch(loginSuccess());
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginMainTitle}>
          당신의 여행을
          <br />
          <span className={styles.loginBodaText}>BODA</span> 완벽하게
        </h1>
        <h1 className={styles.loginTitle}>로그인</h1>
        <p className={styles.loginDescription}>
          간편하게 로그인하고 다양한 서비스를 이용해보세요.
        </p>
        <button type="button" className={styles.kakaoLoginButton}>
          <img src={kakaoLoginButton} alt="카카오 로그인" onClick={handleKakaoLogin}/>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
