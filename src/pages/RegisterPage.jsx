import React, { useState } from 'react';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    const backendUrl = process.env.BACKEND_URL;

    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, gender, age }),
      });
      if (response.ok) {
        console.log('추가 정보가 성공적으로 제출되었습니다.');
      } else {
        console.error('추가 정보 제출에 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  return (
    <div className="background">
      <div className="register-container">
        <h1>추가 정보 입력</h1>
        <p>계정 설정을 완료하려면 몇 가지 추가 정보를 입력하세요.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">성별</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">성별 선택</option>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">나이</label>
            <select
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            >
              <option value="">나이 선택</option>
              <option value="TWENTIES">20대 이하</option>
              <option value="THIRTIES">30대</option>
              <option value="FORTIES">40대</option>
              <option value="FIFTIES">50대 이상</option>
            </select>
          </div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;