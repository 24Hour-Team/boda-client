import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import '../styles/RecommendationResult.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const destinations = [
  { name: '제주도', address: '제주특별자치도 제주시', lat: 33.4996213, lng: 126.5311884 },
  { name: '한라산', address: '제주특별자치도 서귀포시', lat: 33.3617, lng: 126.5292 },
  { name: '섭지코지', address: '제주특별자치도 서귀포시 성산읍', lat: 33.4238, lng: 126.9278 },
  { name: '우도', address: '제주특별자치도 제주시 우도면', lat: 33.5063, lng: 126.9528 },
  { name: '성산일출봉', address: '제주특별자치도 서귀포시 성산읍', lat: 33.4592, lng: 126.9427 },
];

const RecommendationResult = () => {
  const mapRef = useRef();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  useEffect(() => {
    const kakaoInterval = setInterval(() => {
      if (window.kakao && window.kakao.maps && mapRef.current) {
        const bounds = new window.kakao.maps.LatLngBounds();
        destinations.forEach(destination => {
          bounds.extend(new window.kakao.maps.LatLng(destination.lat, destination.lng));
        });
        mapRef.current.setBounds(bounds);
        clearInterval(kakaoInterval);
      }
    }, 100);
  }, []);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">AI의 사용자 맞춤 추천 여행지</h1>
        <p className="date">{currentDate}</p>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="sidebar">
          {destinations.map((destination, index) => (
            <div
              className="destination-card"
              key={index}
              onClick={() => navigate('/spot')} // 클릭 시 /spot 경로로 이동
            >
              <div className="destination-image" />
              <div className="destination-info">
                <h2 className="destination-name">{destination.name}</h2>
                <p className="destination-address">{destination.address}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="map-container">
          <div className="map-wrapper">
            <Map 
              center={{ lat: 33.4996213, lng: 126.5311884 }} 
              style={{ width: '100%', height: '100%' }} 
              ref={mapRef}
            >
              {destinations.map((destination, index) => (
                <MapMarker key={index} position={{ lat: destination.lat, lng: destination.lng }}>
                  <div style={{ color: '#000', marginLeft: '10px' }}>{destination.name}</div>
                </MapMarker>
              ))}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationResult;
