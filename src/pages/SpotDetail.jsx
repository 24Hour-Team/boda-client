import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate 추가
import '../styles/SpotDetail.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { fetchPlaceId, fetchPlaceDetails } from '../services/googlePlacesService';

const SpotDetail = () => {
  const { spotId } = useParams(); // URL에서 spotId 가져오기
  const navigate = useNavigate();  // navigate 추가
  const [spot, setSpot] = useState(null);
  const [spotImage, setSpotImage] = useState('');

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/spot/${spotId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spot details');
        }
        const data = await response.json();
        
        // 만약 spot 데이터가 없다면 홈으로 리디렉트
        if (!data || !data.name) {
          navigate('/');
          return;
        }

        setSpot({
          name: data.name,
          address: data.address,
          lat: parseFloat(data.ycoord),
          lng: parseFloat(data.xcoord),
        });

        const placeId = await fetchPlaceId(data.name); // 장소 이름으로 place_id 검색
        if (placeId) {
          const imageUrl = await fetchPlaceDetails(placeId, 400); // place_id로 이미지 가져오기
          if (imageUrl) {
            setSpotImage(imageUrl);
          }
        }
      } catch (error) {
        console.error(error);
        navigate('/'); // 에러가 발생하면 홈으로 리디렉션
      }
    };

    fetchSpotDetails();
  }, [spotId, navigate]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  const mapUrl = `https://map.kakao.com/link/map/${spot.name},${spot.lat},${spot.lng}`;

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">여행지 상세 정보</h1>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="sidebar">
          <h2 className="spot-name">{spot.name}</h2>
          <img src={spotImage || 'https://via.placeholder.com/400'} alt={spot.name} className="spot-image" />
          <p className="spot-address">{spot.address}</p>
          <div className="button-group">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="kakao-map-link">
              카카오맵에서 보기
            </a>
            <button className="bookmark-button">북마크 추가</button>
          </div>
        </div>
        <div className="map-container">
          <div className="map-wrapper">
            <Map
              center={{ lat: spot.lat, lng: spot.lng }}
              style={{ width: '100%', height: '100%' }}
            >
              <MapMarker position={{ lat: spot.lat, lng: spot.lng }}>
                <div style={{ color: '#000', marginLeft: '5px' }}>{spot.name}</div>
              </MapMarker>
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
