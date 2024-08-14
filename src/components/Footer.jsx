import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/images/boda.png'; // 사이트의 로고 이미지 경로

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerTop">
        <img src={logo} alt="BODA logo" className="footerLogo" />
        <span className="footerServiceName">BODA</span>
      </div>
      <div className="footerMiddle">
        <p className='footerText'>© BODA 2024</p>
        <p className="footerText">카카오테크 부트캠프 24시간이 모자라</p>
        <p className="footerText">사이트 문의 : acky529@gmail.com</p>
      </div>
      <div className="footerBottom">
        <p className="footerAddress">경기도 성남시 분당구 대왕판교로 660 유스페이스 1 A동 405호</p>
      </div>
    </div>
  );
};

export default Footer;
