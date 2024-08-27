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
  const [bookmarkFolders, setBookmarkFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/spot/${spotId}`, {
          credentials: 'include', // 세션 쿠키 포함
        });
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

    const fetchBookmarkFolders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/folder/list`, {
          credentials: 'include', // 세션 쿠키 포함
        });
        const data = await response.json();
        setBookmarkFolders(data);
      } catch (error) {
        console.error('Error fetching bookmark folders:', error);
      }
    };

    fetchSpotDetails();
    fetchBookmarkFolders();
  }, [spotId, navigate]);

  const handleAddToBookmark = async () => {
    if (!selectedFolder) {
      alert('북마크 폴더를 선택해 주세요.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/${selectedFolder}/${spotId}`, {
        credentials: 'include', // 세션 쿠키 포함
      });
      if (response.ok) {
        alert('여행지가 북마크에 추가되었습니다.');
        navigate(`/spot/${spotId}`);
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.code === 'BOOKMARK_CREATION_LIMIT_EXCEEDED') {
          alert('최대 20개의 여행지만 추가할 수 있습니다.');
        } else if(errorData.code === 'BOOKMARK_ALREADY_EXISTS_IN_FOLDER'){
          alert('해당 여행지가 이미 북마크에 존재합니다.');
        } else {
          alert('폴더 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error adding to bookmark:', error);
      alert('북마크 추가 중 오류가 발생했습니다.');
    }
  };

  const handleAddBookmark = async () => {
    const folderName = prompt("폴더 이름을 입력하세요. (20자 이내)");
    if (folderName && folderName.length <= 20) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/folder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // 세션 쿠키 포함
          body: JSON.stringify({ name: folderName })
        });

        if (response.ok) {
          alert('폴더가 성공적으로 추가되었습니다.');
          const newBookmark = await response.json();
          setBookmarkFolders(prevFolders => [newBookmark, ...prevFolders]); // 새로운 폴더를 목록에 추가
        } else if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.code === 'BOOKMARK_FOLDER_CREATION_LIMIT_EXCEEDED') {
            alert('최대 10개의 폴더만 생성할 수 있습니다.');
          } else {
            alert('폴더 추가에 실패했습니다.');
          }
        }
      } catch (error) {
        console.error('Failed to add bookmark:', error);
        alert('폴더 추가 중 오류가 발생했습니다.');
      }
    } else if (folderName) {
      alert('폴더 이름은 20자 이내만 가능합니다.');
    }
  };

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
          <div className={styles.dropdownContainer}>
            <select
              className={styles.dropdown}
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="">폴더 선택</option>
              {bookmarkFolders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <button className={styles.bookmarkButton} onClick={handleAddToBookmark}>
              북마크 추가
            </button>
            <button className={styles.addButton} onClick={handleAddBookmark}>
              폴더 생성
            </button>
          </div>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.kakaoMapLink}>
            카카오맵에서 보기
          </a>
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
