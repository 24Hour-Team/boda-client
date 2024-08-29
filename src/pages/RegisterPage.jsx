import React, { useEffect, useState } from 'react';
import styles from '../styles/RegisterPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../features/auth/authSlice";

const RegisterPage = () => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = async (e) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ nickname, gender, ageRange }),
      });
      if (response.ok) {
        console.log('추가 정보가 성공적으로 제출되었습니다.');
        navigate('/');
      } else {
        console.error('추가 정보 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginStatus = queryParams.get("login");

    if (loginStatus === "success") {
      alert("로그인에 성공했습니다!");
      dispatch(loginSuccess(true));
      navigate("/", { replace: true });
    } else if (loginStatus === "failed") {
      alert("로그인에 실패했습니다.");
    }
  }, [location, dispatch, navigate]);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setNickname(value);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.registerContainer}>
        <h1 className={styles.mainTitle}>
          당신의 여행을
          <br />
          <span className={styles.bodaText}>BODA</span> 완벽하게
        </h1>

        <h1 className={styles.registerTitle}>회원가입</h1>
        <p className={styles.registerDescription}>
          계정 설정을 완료하려면 몇 가지 추가 정보를 입력하세요.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nickname" className={styles.label}>닉네임</label>
            <input
              type="text"
              id="nickname"
              className={styles.inputField}
              value={nickname}
              onChange={handleNicknameChange}
              maxLength="20"
              required
              placeholder="닉네임을 입력하세요 (20자 이내)"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender" className={styles.label}>성별</label>
            <select
              id="gender"
              className={styles.selectField}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">성별 선택</option>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="ageRange" className={styles.label}>나이</label>
            <select
              id="ageRange"
              className={styles.selectField}
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              required
            >
              <option value="">나이 선택</option>
              <option value="TWENTIES">20대</option>
              <option value="THIRTIES">30대</option>
              <option value="FORTIES">40대</option>
              <option value="FIFTIES">50대 이상</option>
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>저장하기</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
