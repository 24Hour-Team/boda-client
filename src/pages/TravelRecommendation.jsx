import React, { useState } from 'react';
import '../styles/TravelRecommendation.css';
import { useNavigate } from 'react-router-dom';

const regions = [
  '제주도', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '수원', 
  '경주', '강릉', '속초', '여수', '거제통영', '남원'
];

const preferences = [
  { left: '자연', right: '도시' },
  { left: '숙박', right: '당일' },
  { left: '새로운', right: '익숙한' },
  { left: '편함비쌈숙소', right: '불편함저렴함숙소' },
  { left: '휴양휴식', right: '엑티비티' },
  { left: '안유명한', right: '유명한' },
  { left: '계획', right: '상황' },
  { left: '사진중요', right: '사진안중요' }
];

const seasons = ['봄', '여름', '가을', '겨울'];

const TravelRecommendation = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState(Array(preferences.length).fill(''));
  const [selectedSeason, setSelectedSeason] = useState('');
  
  const goToResultPage = () => {
    navigate('/result');
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handlePreferenceClick = (index, choice) => {
    const newPreferences = [...selectedPreferences];
    newPreferences[index] = choice;
    setSelectedPreferences(newPreferences);
  };

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
  };

  const isNextEnabled = selectedRegion && selectedPreferences.every(pref => pref) && selectedSeason;

  const handleNextClick = () => {
    if (isNextEnabled) {
      goToResultPage();
      console.log('Next step');
    }
  };

  return (
    <div className="travel-recommendation">
      <h1>AI가 맞춤 여행지를 추천해 드려요</h1>

      <div className="section">
        <h2>지역을 선택해 주세요</h2>
        <div className="options">
          {regions.map((region) => (
            <button
              key={region}
              className={`option ${selectedRegion === region ? 'selected' : ''}`}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className="section-divider"></div>

      <div className="section">
        <h2>여행 취향을 선택해 주세요</h2>
        {preferences.map((pref, index) => (
          <div key={index} className="preference">
            <button
              className={`option ${selectedPreferences[index] === 'left' ? 'selected' : ''}`}
              onClick={() => handlePreferenceClick(index, 'left')}
            >
              {pref.left}
            </button>
            <span>vs</span>
            <button
              className={`option ${selectedPreferences[index] === 'right' ? 'selected' : ''}`}
              onClick={() => handlePreferenceClick(index, 'right')}
            >
              {pref.right}
            </button>
          </div>
        ))}
      </div>

      <div className="section-divider"></div>

      <div className="section">
        <h2>계절을 선택해 주세요</h2>
        <div className="options">
          {seasons.map((season) => (
            <button
              key={season}
              className={`option ${selectedSeason === season ? 'selected' : ''}`}
              onClick={() => handleSeasonClick(season)}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className="next-button-container">
        <button
          className={`next-button ${isNextEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleNextClick}
          disabled={!isNextEnabled}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default TravelRecommendation;
