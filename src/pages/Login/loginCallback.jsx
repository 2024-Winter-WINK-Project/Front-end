import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // accessToken 요청
      fetch(`https://kauth.kakao.com/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: `${process.env.REACT_APP_REST_API_KEY}`,
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;

          // accessToken을 사용하여 로그인 요청
          return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/kakao/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken: accessToken,
            }),
          });
        })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('token', data.token);
          navigate('/main');
        })
        .catch((error) => {
          console.log(error);
          alert('로그인 콜백 오류');
          navigate('/login');
        });
    }
  }, [code]);

  return (
    <>
      <span>카카오 로그인 진행중입니다.</span>
    </>
  );
};

export default LoginCallback;
