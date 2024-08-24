import React from 'react';
import styles from '../styles/MyPage.module.css';
import folder from '../assets/images/folder.png';

const MyPage = () => {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.pageTitle}>마이페이지</div>
      <div className={styles.horizontalLine}></div>

      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <div className={styles.userInfo}>
            <h3>유저 정보</h3>
            <div className={styles.profileSection}>
              <img src="http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640" alt="profile" className={styles.profileImage} />
              <div className={styles.userDetails}>
                <h2 className={styles.nickname}>은학</h2>
                <div className={styles.additionalInfo}>
                    <p>20대 남성</p>
                    <p>529acky@naver.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bookmarkSection}>
            <div className={styles.bookmarkHeader}>
              <h3>북마크</h3>
              <button className={styles.addButton}>+ 추가</button>
            </div>
            <div className={styles.bookmarkList}>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>서울 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>강릉 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>제주도 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>서울 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>강릉 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage}/>
                <div className={styles.bookmarkInfo}>
                  <h4>제주도 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.recommendationSection}>
          <h3>지난 AI 추천</h3>
          <div className={styles.recommendationList}>
            <div className={styles.recommendationItem}>
              <h4>제주도 겨울 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
            <div className={styles.recommendationItem}>
              <h4>서울 여름 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
            <div className={styles.recommendationItem}>
              <h4>강릉 봄 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
            <div className={styles.recommendationItem}>
              <h4>여수 가을 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
            <div className={styles.recommendationItem}>
              <h4>강릉 봄 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
            <div className={styles.recommendationItem}>
              <h4>여수 가을 여행</h4>
              <p>추천 날짜</p>
              <p>선택된 항목: 자연, 당일, 새로운, 편하고 비싼 숙소, 휴양휴식</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
