import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/images/boda.png';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from "../features/auth/authSlice";
import { getUserInfo } from "../services/userService";
import { useSelector } from 'react-redux';

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
    navigate("/")
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
        console.info(userData)
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
    <div className="navbar">
      <div className="leftSection" onClick={goToMain}>
        <img src={logo} alt="BODA logo" className="logo" />
        <span className="serviceName">BODA</span>
      </div>
      {isLoggedIn && user ? (
      <div className="rightSection">
        <div className="profileSection" onClick={goToMyPage}>
          <img src="http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640" alt="Profile" className="profileImage" /> {/* profileImageUrl 사용 */}
          <span className="userName">{user.nickname}</span>
        </div>
        <span className="logoutText" onClick={handleLogout}>LOGOUT</span>
      </div> 
      ):(
      <div className="rightSection">
        <span className="logoutText" onClick={goToLoginPage}>LOGIN</span> 
      </div> 
      )}

      <div className="separator" />
    </div>
    <div className="body-content">
  </div>
  </div>
  );
};

export default NavBar;
