import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/RecommendationResult.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { fetchPlaceId, fetchPlaceDetails } from '../services/googlePlacesService';

const RecommendationResult = () => {
  const [images, setImages] = useState({});
  const mapRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 상태에서 데이터를 가져옴
  const destinations = useMemo(() => location.state?.recommendations || [], [location.state?.recommendations]);

  useEffect(() => {
    if (destinations.length === 0) {
      navigate('/'); // 기본 경로로 리디렉션
    }
  }, [destinations, navigate]);

  useEffect(() => {
    if (destinations.length > 0) {
      const loadImages = async () => {
        const imagePromises = destinations.map(async (destination) => {
          const placeId = await fetchPlaceId(destination.name);
          if (placeId) {
            const imageUrl = await fetchPlaceDetails(placeId, 100);
            return { name: destination.name, imageUrl };
          }
          return { name: destination.name, imageUrl: null };
        });

        const loadedImages = await Promise.all(imagePromises);
        const imagesMap = loadedImages.reduce((acc, item) => {
          acc[item.name] = item.imageUrl;
          return acc;
        }, {});

        setImages(imagesMap);
      };

      loadImages();
    }
  }, [destinations]);

  useEffect(() => {
    const kakaoInterval = setInterval(() => {
      if (window.kakao && window.kakao.maps && mapRef.current) {
        const bounds = new window.kakao.maps.LatLngBounds();
        destinations.forEach(destination => {
          bounds.extend(new window.kakao.maps.LatLng(destination.ycoord, destination.xcoord));
        });
        mapRef.current.setBounds(bounds);
        clearInterval(kakaoInterval);
      }
    }, 100);
  }, [destinations]);

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
              onClick={() => navigate(`/spot/${destination.id}`)}  // 수정된 부분
            >
              <img
                src={images[destination.name] || 'https://via.placeholder.com/100'}
                alt={destination.name}
                className="destination-image"
              />
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
              center={{ lat: destinations[0]?.ycoord || 33.4996213, lng: destinations[0]?.xcoord || 126.5311884 }} 
              style={{ width: '100%', height: '100%' }} 
              ref={mapRef}
            >
              {destinations.map((destination, index) => (
                <MapMarker key={index} position={{ lat: destination.ycoord, lng: destination.xcoord }}>
                  <div style={{ color: '#000', marginLeft: '5px' }}>{destination.name}</div>
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
