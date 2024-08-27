import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const getUserInfo = async () => {

  try {
    const response = await axios.get(`${backendUrl}/api/v1/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
    throw error;
  }
};