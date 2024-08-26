import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Bookmark.module.css';
import infoIcon from '../assets/images/info.png';
import folder from '../assets/images/folder.png';
import { fetchPlaceId, fetchPlaceDetails } from '../services/googlePlacesService';

const Bookmark = () => {
  const { bookmarkId } = useParams();
  const navigate = useNavigate();
  const [bookmarkData, setBookmarkData] = useState(null);
  const [spotImages, setSpotImages] = useState({});

  const fetchBookmarkData = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/${bookmarkId}/529acky@naver.com`);
      const data = await response.json();
      setBookmarkData(data);

      // Fetch images for each spot
      const images = {};
      for (const spot of data.bookmarks) {
        const placeId = await fetchPlaceId(spot.name);
        if (placeId) {
          const imageUrl = await fetchPlaceDetails(placeId, 100);
          images[spot.id] = imageUrl;
        }
      }
      setSpotImages(images);
    } catch (error) {
      console.error('Failed to fetch bookmark data:', error);
    }
  }, [bookmarkId]);

  useEffect(() => {
    fetchBookmarkData();
  }, [fetchBookmarkData]);

  const handleSpotClick = (spotId) => {
    navigate(`/spot/${spotId}`);
  };

  const handleDelete = async (spotId) => {
    const confirmed = window.confirm("해당 여행지를 삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/${spotId}/529acky@naver.com`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('여행지가 성공적으로 삭제되었습니다.');
          fetchBookmarkData(); // 목록을 다시 로드
        } else {
          alert('여행지 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to delete spot:', error);
        alert('여행지 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (!bookmarkData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.bookmarkContainer}>
      <div className={styles.pageTitle}>북마크</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.folderInfo}>
        <div className={styles.folderHeader}>
          <img src={folder} alt="folder" className={styles.folderImage} />
          <div className={styles.folderDetails}>
            <h2 className={styles.folderName}>{bookmarkData.name}</h2>
            <p className={styles.creationDate}>{new Date(bookmarkData.createdDateTime).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className={styles.spotSection}>
        <div className={styles.spotHeader}>
          <div className={styles.spotTitleContainer}>
            <h3>여행지</h3>
            <img src={infoIcon} alt="info" className={styles.infoIcon} />
            <div className={styles.tooltip}>
              여행지는 최대 20개까지 저장 가능합니다.
            </div>
          </div>
        </div>
        <div className={styles.spotList}>
          {bookmarkData.bookmarks.length === 0 ? (
            <p className={styles.emptyMessage}>저장된 여행지가 없습니다.</p>
          ) : (
            bookmarkData.bookmarks.map((spot) => (
              <div
                key={spot.id}
                className={styles.spotItem}
                onClick={() => handleSpotClick(spot.spotId)}
              >
                <img 
                  src={spotImages[spot.id] || 'https://via.placeholder.com/100'} 
                  alt="spot" 
                  className={styles.spotImage} 
                />
                <div className={styles.spotInfo}>
                  <h4>{spot.name}</h4>
                  <p className={styles.spotLocation}>{spot.address}</p>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(spot.id);
                  }}
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
