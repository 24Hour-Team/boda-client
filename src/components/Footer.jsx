import React from 'react';
import styles from '../styles/Footer.module.css'; // CSS Module로 변경
import logo from '../assets/images/boda.png'; // 사이트의 로고 이미지 경로

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <img src={logo} alt="BODA logo" className={styles.footerLogo} />
        <span className={styles.footerServiceName}>BODA</span>
      </div>
      <div className={styles.footerMiddle}>
        <p className={styles.footerText}>© BODA 2024</p>
        <p className={styles.footerText}>카카오테크 부트캠프 24시간이 모자라</p>
        <p className={styles.footerText}>사이트 문의 : acky529@gmail.com</p>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerAddress}>경기도 성남시 분당구 대왕판교로 660 유스페이스 1 A동 405호</p>
      </div>
    </div>
  );
};

export default Footer;
