import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MyPage.module.css';
import folder from '../assets/images/folder.png';

const regionMap = {
  SEOUL: '서울',
  GANGNEUNG: '강릉',
  SUWON: '수원',
  GAPYEONG: '가평',
  DAEJEON: '대전',
  INCHEON: '인천',
  BUSAN: '부산',
  DAEGU: '대구',
  CHUNCHEON: '춘천',
  JEJU: '제주',
  GYEONGJU: '경주',
  GONGJU: '공주',
  JEONJU: '전주',
  GUNSAN: '군산',
  GWANGJU: '광주',
  SUNCHEON: '순천',
  SOKCHO: '속초',
  YANGYANG: '양양',
  DANYANG: '단양',
  YEOSU: '여수',
  TAEAN: '태안'
};

const seasonMap = {
  SPRING: '봄',
  SUMMER: '여름',
  FALL: '가을',
  WINTER: '겨울'
};

const travelStyles = [
  { left: '자연', right: '도시' },
  { left: '숙박', right: '당일' },
  { left: '새로운', right: '익숙한' },
  { left: '편하고 비싼 숙소', right: '불편하고 저렴한 숙소' },
  { left: '휴양휴식', right: '엑티비티' },
  { left: '안 유명한', right: '유명한' },
  { left: '계획', right: '상황' },
  { left: '사진 중요', right: '사진 안 중요' }
];

const MyPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recommend/list/529acky@naver.com`); // 백엔드 API 경로에 맞게 수정
        const data = await response.json();

        // 최신 날짜가 위로 오도록 정렬
        const sortedData = data.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
        setRecommendations(sortedData);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/result/${id}`);
  };

  const renderTravelStyles = (recommendation) => {
    return travelStyles.map((style, index) => (
      recommendation[`travelStyle${index + 1}`] ? style.right : style.left
    )).join(', ');
  };
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.pageTitle}>마이페이지</div>
      <div className={styles.horizontalLine}></div>

      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <div className={styles.userInfo}>
            <h3>유저 정보</h3>
            <div className={styles.profileSection}>
              <img
                src="http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R640x640"
                alt="profile"
                className={styles.profileImage}
              />
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
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
                <div className={styles.bookmarkInfo}>
                  <h4>서울 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
                <div className={styles.bookmarkInfo}>
                  <h4>강릉 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
                <div className={styles.bookmarkInfo}>
                  <h4>제주도 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
                <div className={styles.bookmarkInfo}>
                  <h4>서울 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
                <div className={styles.bookmarkInfo}>
                  <h4>강릉 여행</h4>
                  <p>생성 날짜</p>
                </div>
              </div>
              <div className={styles.bookmarkItem}>
                <img src={folder} alt="folder" className={styles.bookmarkImage} />
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
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={styles.recommendationItem}
                onClick={() => handleItemClick(rec.id)}
              >
                <div className={styles.recommendationHeader}>
                  <h4 className={styles.recommendationTitle}>
                    {regionMap[rec.regionClassification]} {seasonMap[rec.season]} 여행
                  </h4>
                  <p className={styles.recommendationDate}>
                    {new Date(rec.createdDateTime).toLocaleDateString()}
                  </p>
                </div>
                <p></p>
                <div className={styles.recommendationDetails}>
                  선택된 항목: {renderTravelStyles(rec)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;