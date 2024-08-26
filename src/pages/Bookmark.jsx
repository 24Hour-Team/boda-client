import React from 'react';
import styles from '../styles/Bookmark.module.css';
import infoIcon from '../assets/images/info.png';
import folder from '../assets/images/folder.png';

const Bookmark = () => {
  return (
    <div className={styles.bookmarkContainer}>
      <div className={styles.pageTitle}>북마크</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.folderInfo}>
        <div className={styles.folderHeader}>
          <img src={folder} alt="folder" className={styles.folderImage} />
          <div className={styles.folderDetails}>
            <h2 className={styles.folderName}>북마크 폴더 이름</h2>
            <p className={styles.creationDate}>생성 날짜</p>
          </div>
        </div>
      </div>

      <div className={styles.spotSection}>
        <div className={styles.spotHeader}>
          <div className={styles.spotTitleContainer}>
            <h3>여행지</h3>
            <img src={infoIcon} alt="info" className={styles.infoIcon} />
            <div className={styles.tooltip}>
              여행지는 최대 20개까지 저장 가능합니다.
            </div>
          </div>
        </div>
        <div className={styles.spotList}>
          <div className={styles.spotItem}>
            <img src='https://via.placeholder.com/100' alt="spot" className={styles.spotImage} />
            <div className={styles.spotInfo}>
              <h4>성산일출봉</h4>
              <p className={styles.spotLocation}>제주특별자치도 서귀포시 성산읍</p>
            </div>
            <button className={styles.deleteButton}>삭제</button>
          </div>
          <div className={styles.spotItem}>
            <img src='https://via.placeholder.com/100' alt="spot" className={styles.spotImage} />
            <div className={styles.spotInfo}>
              <h4>한라산</h4>
              <p className={styles.spotLocation}>제주특별자치도 제주시</p>
            </div>
            <button className={styles.deleteButton}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
