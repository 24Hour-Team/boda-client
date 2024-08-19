import React from 'react';
import '../styles/Home.css';
import background from '../assets/images/background.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToRecommendPage = () => {
    navigate('/recommend');
  };
  
  return (
    <div>
      <div className="main-container">
        <div className="text-section">
          <h1>AI가 사용자 맞춤 여행지를 추천해 드려요</h1>
          <p>사용자의 성별, 연령대, 여행 지역, 여행 취향, 계절에 따른 <br /> 사용자 맞춤 여행지를 추천해 드려요</p>
          <button className="recommend-button" onClick={goToRecommendPage}>지금 추천받기</button>
        </div>
        <div className="image-section">
          <img src={background} alt="Travel Concept" />
        </div>
      </div>
      <h1>----------------------------------</h1>
      <h1>아래 다른 요소들 추가</h1>
      <h1>----------------------------------</h1>
    </div>
  );
};

export default Home;

