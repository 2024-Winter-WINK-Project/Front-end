import React from 'react';
import Logo from '../../assets/Login/logoo.svg'
import kakaoLogo from '../../assets/Login/Kakao.svg'
import * as style from './styles';

export default function Login() {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoLink; // 카카오 로그인 페이지로 리디렉션
  };

  return (
    <>
      <style.Wrapper>
        <style.LoginContainer>
          <style.TextWrapper>
            <span>모임이 쉬워지는</span>
            <img src={Logo} alt="로고" />
          </style.TextWrapper>
          <style.KakaoButton onClick={handleLogin}>
            <img src={kakaoLogo} alt="카카오 로고" />
            <span>카카오로 시작하기</span>
          </style.KakaoButton>
        </style.LoginContainer>
      </style.Wrapper>
    </>
  );
}
