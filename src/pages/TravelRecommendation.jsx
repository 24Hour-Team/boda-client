import React, { useState } from 'react';
import styles from '../styles/TravelRecommendation.module.css';
import { useNavigate } from 'react-router-dom';
import { requestRecommendations, getSeasonCode, getRegionCode } from '../services/recommendRequest';

const regions = [
  '서울', '강릉', '수원', '가평', '대전', '인천', '부산', '대구', '춘천', '제주', '경주',
  '공주', '전주', '군산', '광주', '순천', '속초', '양양', '단양', '여수', '태안'
];

const preferences = [
  { left: '자연', right: '도시' },
  { left: '숙박', right: '당일' },
  { left: '새로운', right: '익숙한' },
  { left: '편하고 비싼 숙소', right: '불편하고 저렴한 숙소' },
  { left: '휴양휴식', right: '엑티비티' },
  { left: '안 유명한', right: '유명한' },
  { left: '계획', right: '상황' },
  { left: '사진 중요', right: '사진 안 중요' }
];

const seasons = ['봄', '여름', '가을', '겨울'];

const TravelRecommendation = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState(Array(preferences.length).fill(''));
  const [selectedSeason, setSelectedSeason] = useState('');
  const [loading, setLoading] = useState(false);

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

  const isNextEnabled = selectedRegion && selectedPreferences.every(pref => pref) && selectedSeason && !loading;

  const handleNextClick = async () => {
    if (isNextEnabled) {
      setLoading(true);
      try {
        const requestData = {
          season: getSeasonCode(selectedSeason),
          regionClassification: getRegionCode(selectedRegion),
          travelStyle1: selectedPreferences[0] === 'right',
          travelStyle2: selectedPreferences[1] === 'right',
          travelStyle3: selectedPreferences[2] === 'right',
          travelStyle4: selectedPreferences[3] === 'right',
          travelStyle5: selectedPreferences[4] === 'right',
          travelStyle6: selectedPreferences[5] === 'right',
          travelStyle7: selectedPreferences[6] === 'right',
          travelStyle8: selectedPreferences[7] === 'right',
        };

        const resultId = await requestRecommendations(requestData);

        if (resultId) {
          navigate(`/result/${resultId}`);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.travelRecommendation}>
      <h1 className={styles.title}>AI가 맞춤 여행지를 추천해 드려요</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>지역을 선택해 주세요</h2>
        <div className={styles.options}>
          {regions.map((region) => (
            <button
              key={region}
              className={`${styles.option} ${selectedRegion === region ? styles.optionSelected : ''}`}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sectionDivider}></div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>여행 취향을 선택해 주세요</h2>
        {preferences.map((pref, index) => (
          <div key={index} className={styles.preference}>
            <button
              className={`${styles.option2} ${styles.preferenceButton} ${selectedPreferences[index] === 'left' ? styles.optionSelected : ''}`}
              onClick={() => handlePreferenceClick(index, 'left')}
            >
              {pref.left}
            </button>
            <span className={styles.preferenceSpan}>vs</span>
            <button
              className={`${styles.option2} ${styles.preferenceButton} ${selectedPreferences[index] === 'right' ? styles.optionSelected : ''}`}
              onClick={() => handlePreferenceClick(index, 'right')}
            >
              {pref.right}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.sectionDivider}></div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>계절을 선택해 주세요</h2>
        <div className={styles.options}>
          {seasons.map((season) => (
            <button
              key={season}
              className={`${styles.option} ${selectedSeason === season ? styles.optionSelected : ''}`}
              onClick={() => handleSeasonClick(season)}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.nextButtonContainer}>
        <button
          className={`${styles.nextButton} ${isNextEnabled ? styles.nextButtonEnabled : styles.nextButtonDisabled}`}
          onClick={handleNextClick}
          disabled={!isNextEnabled}
        >
          {loading ? '로딩 중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default TravelRecommendation;
