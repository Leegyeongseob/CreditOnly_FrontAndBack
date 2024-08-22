import React, { useState, useEffect } from "react";
import axios from "axios";

const useAddress = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 }); // 위도, 경도
  const [addr, setAddr] = useState(""); // 주소

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // 현재 위치 가져오기
  const onSuccess = (position) => {
    console.log(
      "현재 위치 : " + position.coords.latitude,
      position.coords.longitude
    );
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };
  const onError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          "위치 정보 제공이 거부되었습니다. 설정에서 위치 권한을 허용해주세요."
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert("위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        alert("위치 정보 요청 시간이 초과되었습니다.");
        break;
      default:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
    }
  };

  // 현재 위치가 변경되면 주소를 가져온다.
  useEffect(() => {
    console.log(location.lat, location.long);
    if (location.lat !== 0 && location.long !== 0) {
      getGeocodeKakao(location.lat, location.long);
    }
  }, [location.lat, location.long]); // 의존성 배열에 lat과 long 추가

  // 주소 가져 오기
  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK 04d45aae874ce7501064815cf8305dc7`,
          },
        }
      );
      const fullAddress = response.data.documents[0].address;
      const neighborhoodAddress = `${fullAddress.region_1depth_name} ${fullAddress.region_2depth_name} ${fullAddress.region_3depth_name}`;
      setAddr(neighborhoodAddress);
    } catch (error) {
      console.error("Kakao Geocoding error:", error);
    }
  };

  return { addr, location };
};

export default useAddress;
