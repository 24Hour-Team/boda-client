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
    dispatch(logout()); // 상태 정리
    localStorage.removeItem('authState'); // 로컬 스토리지에서 상태 제거
    window.location.href = `${backendUrl}/logout`;
    navigate('/');
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

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const userData = await getUserInfo(); // 세션 확인을 위한 API 호출
        if (!userData || !userData.nickname) {
          dispatch(logout());
        } else {
          setUser(userData);
        }
      } catch (error) {
        dispatch(logout()); // API 호출 실패 시 로그아웃 처리
      }
    };
  
    const intervalId = setInterval(checkSessionStatus, 5 * 60 * 1000); // 5분마다 세션 확인
  
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 정리
  }, [dispatch]);  

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
