import React from 'react';
import styles from '../styles/UserInfo.module.css';

const UserInfo = () => {
    return (
        <div className={styles.myPageContainer}>
          <div className={styles.pageTitle}>유저 정보 수정</div>
          <div className={styles.horizontalLine}></div>
        </div>
    );
};

export default UserInfo;