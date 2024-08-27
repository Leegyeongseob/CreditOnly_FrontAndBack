import axios from "axios";

const SimpleLoginAxios = {
  getToken: async (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      code: code,
      client_secret: process.env.REACT_APP_KAKAO_REST_API_KEY,
    };
    try {
      const response = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams(data).toString(),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      console.log("Token response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Kakao token:", error);
      throw error;
    }
  },
  tokenInfo: async (ACCESS_TOKEN) => {
    return await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  },
};
export default SimpleLoginAxios;
