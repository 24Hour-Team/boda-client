const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

// 장소 이름 또는 도로명 주소를 기반으로 place_id를 검색
export const fetchPlaceId = async (query) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${apiKey}`
    );
    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    }

    return null; // 해당 쿼리에 대한 place_id를 찾을 수 없는 경우
  } catch (error) {
    console.error('Error fetching place ID:', error);
    return null;
  }
};

// place_id를 사용하여 장소의 사진을 가져오는 함수
export const fetchPlaceDetails = async (placeId, maxwidth) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.result.photos && data.result.photos.length > 0) {
      const photoReference = data.result.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${apiKey}`;
      return photoUrl;
    }

    return null; // 사진이 없는 경우
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};
