import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import background from '../assets/images/background.png';
import { useNavigate } from 'react-router-dom';
import TrendingDestination from '../components/TrendingDestination';
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length < 2) {
      alert("두 글자 이상 입력해 주세요.");
      return;
    }

    if (isLoggedIn) {
      if (searchQuery.trim() !== "") {
        navigate(`/search?q=${searchQuery.trim()}`);
      }
    } else {
      alert("로그인 후에 여행지 검색이 가능합니다.");
      navigate('/login');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const goToRecommendPage = () => {
    navigate('/recommend');
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  const destinations = [
    { title: '제주도', description: '아름다운 자연 경관과 다양한 체험 활동' },
    { title: '설악산', description: '웅장한 산악 경관과 다양한 등산 코스' },
    { title: '경복궁', description: '조선 시대 왕궁의 아름다운 건축물' },
    { title: '해운대 해수욕장', description: '부산의 대표적인 해수욕장' },
  ];
  
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.textSection}>
          <h1>AI가 사용자 맞춤 여행지를 추천해 드려요</h1>
          <p>사용자의 성별, 연령대, 여행 지역, 여행 취향, 계절에 따른 <br /> 사용자 맞춤 여행지를 추천해 드려요</p>
          {isLoggedIn ? (
          <button className={styles.recommendButton} onClick={goToRecommendPage}>지금 추천받기</button>
          ) : (
            <button className={styles.recommendButton} onClick={goToLoginPage}>지금 추천받기</button>
          )}
        </div>
        <div className={styles.imageSection}>
          <img src={background} alt="Travel Concept" />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <h1 className={styles.searchTitle}>여러 국내 여행지를 검색하고, 저장해보세요</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="직접 여행지를 검색해보세요"
            maxLength="30"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // 엔터 키 눌렀을 때 검색
          />
          <button className={styles.searchButton} onClick={handleSearchSubmit}>
            <span role="img" aria-label="search icon">🔍</span>
          </button>
        </div>
        <div className={styles.trendContainer}>
          <h1 className={styles.mainTitle}>최근 인기 여행지</h1>
          <div className={styles.destinationsGrid}>
            {destinations.map((dest, index) => (
              <TrendingDestination key={index} title={dest.title} description={dest.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
