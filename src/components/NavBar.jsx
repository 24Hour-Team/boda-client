import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import logo from '../assets/images/boda.png';

const NavBar = () => { // profileImageUrl prop 추가
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const handleLogout = () => {
    console.log('로그아웃');
  };

  const goToMyPage = () => {
    navigate('/mypage');
  };

  return (
    <div className="navbar">
      <div className="leftSection" onClick={goToMain}>
        <img src={logo} alt="BODA logo" className="logo" />
        <span className="serviceName">BODA</span>
      </div>
      <div className="rightSection">
        <div className="profileSection" onClick={goToMyPage}>
          <img src="http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640" alt="Profile" className="profileImage" /> {/* profileImageUrl 사용 */}
          <span className="userName">은학</span>
        </div>
        <span className="logoutText" onClick={handleLogout}>LOGOUT</span>
      </div>
      <div className="separator" />
    </div>
  );
};

export default NavBar;
