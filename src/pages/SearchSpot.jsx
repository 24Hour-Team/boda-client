import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/SearchSpot.module.css';

const SearchSpot = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();
  
  const [spots, setSpots] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchSpots = async (pageNum, searchQuery, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/spot`, {
        withCredentials: true,
        params: {
          name: searchQuery,
          page: pageNum,
          size: 10,
        },
      });
      const { content, totalPages } = response.data;
      setSpots(prevSpots => reset ? content : [...prevSpots, ...content]);
      setPage(pageNum + 1);
      setHasMore(pageNum + 1 < totalPages);
    } catch (error) {
      console.error('Failed to fetch spots:', error);
    }
    setLoading(false);
  };

  const handleSearchSubmit = () => {
    if (query.trim().length < 2) {
      alert("두 글자 이상 입력해 주세요.");
      return;
    }

    setSpots([]);
    setPage(0);
    setHasMore(true);
    setSearchParams({ q: query });
    fetchSpots(0, query, true); // 데이터 초기화 후 검색 실행
  };

  const loadMoreSpots = () => {
    if (!loading && hasMore) {
      fetchSpots(page, query);
    }
  };

  const handleSpotClick = (spotId) => {
    navigate(`/spot/${spotId}`);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    if (initialQuery.length >= 2) { // 초기 검색어도 두 글자 이상이어야 함
      fetchSpots(0, initialQuery, true); // 초기 로드 시 데이터 초기화 후 검색 실행
    }
  }, [initialQuery]);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.searchTitle}>여러 국내 여행지를 검색하고, 저장해보세요</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="직접 여행지를 검색해보세요"
          maxLength="30"
        />
        <button className={styles.searchButton} onClick={handleSearchSubmit}>
          <span role="img" aria-label="search icon">🔍</span>
        </button>
      </div>
      <div className={styles.resultsContainer}>
        {spots.length > 0 ? (
          <InfiniteScroll
            dataLength={spots.length}
            next={loadMoreSpots}
            hasMore={hasMore}
            loader={<h4 className={styles.message}>Loading...</h4>}
            endMessage={<p className={styles.message}>검색 결과가 더 이상 없습니다.</p>}
          >
            <div className={styles.spotsList}>
              {spots.map((spot) => (
                <div
                  key={spot.id}
                  className={styles.spotItem}
                  onClick={() => handleSpotClick(spot.id)}
                >
                  <h3>{spot.name}</h3>
                  <p>{spot.address}</p>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <p className={styles.message}>{hasMore ? '검색 결과가 없습니다.' : '검색 결과가 없습니다.'}</p>
        )}
      </div>
    </div>
  );
};

export default SearchSpot;
