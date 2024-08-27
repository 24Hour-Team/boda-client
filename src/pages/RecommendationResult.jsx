import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/RecommendationResult.module.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { fetchPlaceId, fetchPlaceDetails } from '../services/googlePlacesService';

const RecommendationResult = () => {
  const [images, setImages] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [createdDateTime, setCreatedDateTime] = useState('');
  const mapRef = useRef();
  const navigate = useNavigate();
  const { resultId } = useParams();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recommend/${resultId}`, {
          credentials: 'include', // 세션 쿠키 포함
        });
        const data = await response.json();

        if (!data || !data.spotResponses || data.spotResponses.length === 0) {
          navigate('/'); // 결과가 없으면 기본 경로로 리디렉션
          return;
        }

        setCreatedDateTime(new Date(data.createdDateTime).toLocaleDateString());
        setDestinations(data.spotResponses);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        navigate('/'); // 에러 발생 시 기본 경로로 리디렉션
      }
    };

    fetchRecommendations();
  }, [resultId, navigate]);

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
      if (window.kakao && window.kakao.maps && mapRef.current && destinations.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        destinations.forEach(destination => {
          bounds.extend(new window.kakao.maps.LatLng(destination.ycoord, destination.xcoord));
        });
        mapRef.current.setBounds(bounds);
        clearInterval(kakaoInterval);
      }
    }, 100);
  }, [destinations]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI의 사용자 맞춤 추천 여행지</h1>
        <p className={styles.date}>{createdDateTime}</p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          {destinations.map((destination, index) => (
            <div
              className={styles.destinationCard}
              key={index}
              onClick={() => navigate(`/spot/${destination.id}`)}
            >
              <img
                src={images[destination.name] || 'https://via.placeholder.com/100'}
                alt={destination.name}
                className={styles.destinationImage}
              />
              <div className={styles.destinationInfo}>
                <h2 className={styles.destinationName}>{destination.name}</h2>
                <p className={styles.destinationAddress}>{destination.address}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper}>
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
