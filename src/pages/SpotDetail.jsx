import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/SpotDetail.module.css';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { fetchPlaceId, fetchPlaceDetails } from '../services/googlePlacesService';

const SpotDetail = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
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

        const placeId = await fetchPlaceId(data.name);
        if (placeId) {
          const imageUrl = await fetchPlaceDetails(placeId, 400);
          if (imageUrl) {
            setSpotImage(imageUrl);
          }
        }
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    fetchSpotDetails();
  }, [spotId, navigate]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  const mapUrl = `https://map.kakao.com/link/map/${spot.name},${spot.lat},${spot.lng}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>여행지 상세 정보</h1>
      </div>
      <hr className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h2 className={styles.spotName}>{spot.name}</h2>
          <img src={spotImage || 'https://via.placeholder.com/400'} alt={spot.name} className={styles.spotImage} />
          <p className={styles.spotAddress}>{spot.address}</p>
          <div className={styles.buttonGroup}>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.kakaoMapLink}>
              카카오맵에서 보기
            </a>
            <button className={styles.bookmarkButton}>북마크 추가</button>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.mapWrapper}>
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
