import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NavBar.module.css'; // CSS Module로 변경
import logo from '../assets/images/boda.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../features/auth/authSlice";
import { getUserInfo } from "../services/userService";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goToMain = () => {
    navigate('/');
  };

  const handleLogout = () => {
    console.log('로그아웃');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    window.location.href = `${backendUrl}/logout`;
    dispatch(logout());
    navigate("/");
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const goToMyPage = () => {
    navigate('/mypage');
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
        if(!userData || !userData.nickname){
          dispatch(logout());
          return;
        }
        console.info(userData);
      } catch (err) {
        setError("사용자 정보를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.leftSection} onClick={goToMain}>
          <img src={logo} alt="BODA logo" className={styles.logo} />
          <span className={styles.serviceName}>BODA</span>
        </div>
        {isLoggedIn && user ? (
          <div className={styles.rightSection}>
            <div className={styles.profileSection} onClick={goToMyPage}>
              <img src={user.profileImageUrl} alt="Profile" className={styles.profileImage} /> 
              <span className={styles.userName}>{user.nickname}</span>
            </div>
            <span className={styles.logoutText} onClick={handleLogout}>LOGOUT</span>
          </div>
        ) : (
          <div className={styles.rightSection}>
            <span className={styles.logoutText} onClick={goToLoginPage}>LOGIN</span>
          </div>
        )}
        <div className={styles.separator} />
      </div>
      <div className={styles.bodyContent} />
    </div>
  );
};

export default NavBar;
