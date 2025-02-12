import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // 백엔드로 인가 코드 전달 (url에 포함)
      fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/kakao/login?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
