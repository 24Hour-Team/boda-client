import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MyPage.module.css';
import folder from '../assets/images/folder.png';
import infoIcon from '../assets/images/info.png'; // 정보 아이콘 이미지
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const regionMap = {
  SEOUL: '서울',
  GANGNEUNG: '강릉',
  SUWON: '수원',
  GAPYEONG: '가평',
  DAEJEON: '대전',
  INCHEON: '인천',
  BUSAN: '부산',
  DAEGU: '대구',
  CHUNCHEON: '춘천',
  JEJU: '제주',
  GYEONGJU: '경주',
  GONGJU: '공주',
  JEONJU: '전주',
  GUNSAN: '군산',
  GWANGJU: '광주',
  SUNCHEON: '순천',
  SOKCHO: '속초',
  YANGYANG: '양양',
  DANYANG: '단양',
  YEOSU: '여수',
  TAEAN: '태안'
};

const seasonMap = {
  SPRING: '봄',
  SUMMER: '여름',
  FALL: '가을',
  WINTER: '겨울'
};

const travelStyles = [
  { left: '자연', right: '도시' },
  { left: '숙박', right: '당일' },
  { left: '새로운', right: '익숙한' },
  { left: '편하고 비싼 숙소', right: '불편하고 저렴한 숙소' },
  { left: '휴양휴식', right: '엑티비티' },
  { left: '안 유명한', right: '유명한' },
  { left: '계획', right: '상황' },
  { left: '사진 중요', right: '사진 안 중요' }
];

const MyPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();


  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const user = useSelector((state) => state.auth.user);

  const ageRangeMap = {
    TWENTIES: '20대',
    THIRTIES: '30대',
    FORTIES: '40대',
    FIFTIES: '50대 이상'
  };

  const [userData, setUserData] = useState({
    nickname: '',
    gender: '',
    ageRange: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        nickname: user.nickname || '',
        gender: user.gender || '',
        ageRange: user.ageRange || ''
      });
    } else {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/v1/user`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData({
        nickname: data.nickname || '',
        gender: data.gender || '',
        ageRange: data.ageRange || ''
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('사용자 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recommend/list`, {
          credentials: 'include'
        });
        const data = await response.json();

        const sortedData = data.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
        setRecommendations(sortedData);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      }
    };

    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/folder/list`, {
          credentials: 'include'
        });
        const data = await response.json();

        const sortedBookmarks = data.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
        setBookmarks(sortedBookmarks);
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
      }
    };

    fetchRecommendations();
    fetchBookmarks();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/result/${id}`);
  };

  const handleUserInfo = () => {
    navigate(`/userinfo`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("해당 폴더를 삭제하시겠습니까?");
    if (confirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bookmark/folder/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          alert('폴더가 성공적으로 삭제되었습니다.');
          const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
          setBookmarks(updatedBookmarks);
        } else {
          alert('폴더 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to delete bookmark:', error);
        alert('폴더 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleBookmarkClick = (id) => {
    navigate(`/bookmark/${id}`);
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
          credentials: 'include',
          body: JSON.stringify({ name: folderName })
        });

        if (response.ok) {
            alert('폴더가 성공적으로 추가되었습니다.');
            const newBookmark = await response.json();
            setBookmarks(prevBookmarks => [newBookmark, ...prevBookmarks]); // 새로운 폴더를 목록에 추가
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

  const renderTravelStyles = (recommendation) => {
    return travelStyles.map((style, index) => (
      recommendation[`travelStyle${index + 1}`] ? style.right : style.left
    )).join(', ');
  };

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.pageTitle}>마이페이지</div>
      <div className={styles.horizontalLine}></div>

      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <div className={styles.userInfo}>
            <div className={styles.userHeader}>
              <div className={styles.userTitleContainer}>
                <h3>유저 정보</h3>
              </div>
              <button className={styles.addButton} onClick={handleUserInfo}>수정</button>
            </div>
            <div className={styles.profileSection}>
              <img
                src="http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"
                alt="profile"
                className={styles.profileImage}
              />
              <div className={styles.userDetails}>
                <h2 className={styles.nickname}>{userData.nickname}</h2>
                <div className={styles.additionalInfo}>
                  <p>{ageRangeMap[userData.ageRange] || userData.ageRange} {userData.gender === 'MALE' ? '남성' : '여성'}</p>
                  {/* <p>{userData.email}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bookmarkSection}>
            <div className={styles.bookmarkHeader}>
              <div className={styles.bookmarkTitleContainer}>
                <h3>북마크</h3>
                <img src={infoIcon} alt="info" className={styles.infoIcon} />
                <div className={styles.tooltip}>
                  폴더는 최대 10개까지 생성 가능합니다.
                </div>
              </div>
              <button className={styles.addButton} onClick={handleAddBookmark}>+ 추가</button>
            </div>
            <div className={styles.bookmarkList}>
              {bookmarks.length === 0 ? (
                <p className={styles.emptyMessage}>북마크된 폴더가 없습니다.</p>
              ) : (
                bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className={styles.bookmarkItem}
                    onClick={() => handleBookmarkClick(bookmark.id)}
                  >
                    <img src={folder} alt="folder" className={styles.bookmarkImage} />
                    <div className={styles.bookmarkInfo}>
                      <h4>{bookmark.name}</h4>
                      <div></div>
                      <p className={styles.date}>
                        {new Date(bookmark.createdDateTime).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation(); // 클릭 이벤트가 상위로 전파되지 않도록 함
                        handleDelete(bookmark.id);
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

        <div className={styles.recommendationSection}>
          <div className={styles.recommendationHeader}>
            <div className={styles.recommendationTitleContainer}>
              <h3>지난 AI 추천</h3>
              <img src={infoIcon} alt="info" className={styles.infoIcon} />
              <div className={styles.tooltip}>
                최대 10개의 지난 AI 추천 내역을 제공합니다.
              </div>
            </div>
          </div>
          <div className={styles.recommendationList}>
            {recommendations.length === 0 ? (
              <p className={styles.emptyMessage}>지난 AI 추천 내역이 없습니다.</p>
            ) : (
              recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={styles.recommendationItem}
                  onClick={() => handleItemClick(rec.id)}
                >
                  <div className={styles.recommendationHeader}>
                    <h4 className={styles.recommendationTitle}>
                      {regionMap[rec.regionClassification]} {seasonMap[rec.season]} 여행
                    </h4>
                    <p className={styles.date}>
                      {new Date(rec.createdDateTime).toLocaleDateString()}
                    </p>
                  </div>
                  <p></p>
                  <div className={styles.recommendationDetails}>
                    선택된 항목: {renderTravelStyles(rec)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
