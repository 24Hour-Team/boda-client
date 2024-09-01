import React, { useState, useEffect } from 'react';
import styles from '../styles/UserInfo.module.css';
import { updateUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const dispatch = useDispatch();
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
      dispatch(updateUser(data));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('사용자 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!userData.nickname || !userData.gender || !userData.ageRange) {
        throw new Error('모든 필드를 입력해주세요.');
      }

      const dataToSend = {
        nickname: userData.nickname,
        gender: userData.gender,
        ageRange: userData.ageRange
      };

      console.log('Sending data:', dataToSend);

      const response = await fetch(`${backendUrl}/api/v1/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      dispatch(updateUser(updatedData));
      setIsEditing(false);
      // alert('사용자 정보가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError(error.message || '사용자 정보 업데이트에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.pageTitle}>유저 정보 수정</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.userInfoContainer}>
        <div className={styles.profileImageContainer}>
          <div className={styles.profileImage}>
            {user.profileImageUrl && <img src={user.profileImageUrl} alt="Profile" />}
          </div>
        </div>
        <div className={styles.infoFields}>
          <div className={styles.infoField}>
            <label>닉네임</label>
            {isEditing ? (
              <input 
                name="nickname"
                value={userData.nickname} 
                onChange={handleChange} 
                maxLength="20"
              />
            ) : (
              <span>{userData.nickname}</span>
            )}
          </div>
          <div className={styles.infoField}>
            <label>나이</label>
            {isEditing ? (
              <select 
                name="ageRange"
                value={userData.ageRange} 
                onChange={handleChange}
              >
                <option value="">선택하세요</option>
                <option value="TWENTIES">20대</option>
                <option value="THIRTIES">30대</option>
                <option value="FORTIES">40대</option>
                <option value="FIFTIES">50대 이상</option>
              </select>
            ) : (
              <span>{ageRangeMap[userData.ageRange] || userData.ageRange}</span>
            )}
          </div>
          <div className={styles.infoField}>
            <label>성별</label>
            {isEditing ? (
              <select 
                name="gender"
                value={userData.gender} 
                onChange={handleChange}
              >
                <option value="">선택하세요</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
            ) : (
              <span>{userData.gender === 'MALE' ? '남성' : '여성'}</span>
            )}
          </div>
        </div>
        {isLoading && <p>처리 중...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.actionButtons}>
          {isEditing ? (
            <button className={styles.saveButton} onClick={handleSave} disabled={isLoading}>
              {isLoading ? '저장 중...' : '수정 완료'}
            </button>
          ) : (
            <button className={styles.saveButton} onClick={handleEdit}>수정</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;