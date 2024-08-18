import React from 'react';
import '../styles/SpotDetail.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const SpotDetail = () => {
  // 예시 데이터
  const spot = {
    name: '성산일출봉',
    address: '제주특별자치도 서귀포시 성산읍',
    lat: 33.4592,
    lng: 126.9427,
    imageUrl: 'https://via.placeholder.com/600', // 예시 이미지 URL
  };

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
          <img src={spot.imageUrl} alt={spot.name} className="spot-image" />
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
                <div style={{ color: '#000', marginLeft: '10px' }}>{spot.name}</div>
              </MapMarker>
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
