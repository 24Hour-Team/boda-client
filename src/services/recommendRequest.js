export const requestRecommendations = async (requestData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recommend/529acky@naver.com`, {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Failed to submit the recommendation request');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  
  // 시즌 및 지역 코드 변환 함수
  export const getSeasonCode = (season) => {
    const seasonMap = {
      '봄': 'SPRING',
      '여름': 'SUMMER',
      '가을': 'FALL',
      '겨울': 'WINTER',
    };
    return seasonMap[season];
  };
  
  export const getRegionCode = (region) => {
    const regionMap = {
      '서울': 'SEOUL',
      '강릉': 'GANGNEUNG',
      '수원': 'SUWON',
      '가평': 'GAPYEONG',
      '대전': 'DAEJEON',
      '인천': 'INCHEON',
      '부산': 'BUSAN',
      '대구': 'DAEGU',
      '춘천': 'CHUNCHEON',
      '제주': 'JEJU',
      '경주': 'GYEONGJU',
      '공주': 'GONGJU',
      '전주': 'JEONJU',
      '군산': 'GUNSAN',
      '광주': 'GWANGJU',
      '순천': 'SUNCHEON',
      '속초': 'SOKCHO',
      '양양': 'YANGYANG',
      '단양': 'DANYANG',
      '여수': 'YEOSU',
      '태안': 'TAEAN'
    };
    return regionMap[region];
  };
  