import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  // code : 인가코드
  console.log("인가 코드 타입 : ",typeof(code),"인가 코드 : ",code);
  const navigate = useNavigate();
  const isFetching = useRef(false);


  const requestAccess = async () => {
    fetch(`http://localhost:8080/auth/kakao/login?code=${code}`,{
      method : 'get',
      headers : {
        'content-type' : 'application/json'
      },
      credentials : 'include'
    })
        .then((res) => {
          if (res.status === 200){
            navigate("/")
          }
          else{
            alert("카카오 로그인에 실패했습니다.")
          }
        })
    
  }
  
  useEffect(() => {
    if (!code) {
      alert("카카오 로그인에 실패");
      navigate('/login');
      return;
    }

    if (isFetching.current) return; // 중복 요청 방지
    isFetching.current = true;

    // accessToken 요청
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_REST_API_KEY,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code: code,
        client_secret: import.meta.env.VITE_API_SECRET_KEY,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {
        const accessToken = tokenData.access_token;

        // accessToken으로 사용자 정보 요청
        return fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }).then(res => res.json()).then(userData => ({ accessToken, userData }));
      })
      .then(({ accessToken, userData }) => {
        const nickname = userData.kakao_account?.profile?.nickname || 'Unknown';
        const profileImage = userData.kakao_account?.profile?.profile_image_url || '';

        // 백엔드로 사용자 정보 전송
        return fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/kakao/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessToken,
            nickname,
            profileImage,
          }),
        });
      })
      .then((res) => res.json())
      .then((backendData) => {
        localStorage.setItem('token', backendData.token);
        navigate('/main');
      })
      .catch(() => {
        alert('로그인 오류 발생');
        navigate('/login');
      });
  }, [code, navigate]);

  return (
      <>
        <span>카카오 로그인 진행중입니다.</span>
      </>
  );
};

export default LoginCallback;
