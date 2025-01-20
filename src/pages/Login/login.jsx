import React, {useEffect} from 'react';
import {useMediaQuery} from "react-responsive";
import Logo from '../../assets/Login/logoEx.svg'
import kakaoLogo from '../../assets/Login/Kakao.svg'
import * as style from './styles';

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}

export default function Login() {
  const REST_API_KEY = '???';
  const REDIRECT_URI = '???';
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoLink; // 카카오 로그인 페이지로 리디렉션
  };

  return (
    <>
      <Mobile>
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
      </Mobile>
      <PC>
        <style.WrapperPC>
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
        </style.WrapperPC>
      </PC>
    </>
  );
}
