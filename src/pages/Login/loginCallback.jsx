import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as crypto from "../../components/Others/Crypto";

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  // code : 인가코드
  const navigate = useNavigate();

  const requestAccess = async () => {
    fetch(`http://localhost:8080/auth/kakao/login?code=${code}`,{
      method : 'get',
      headers : {
        'content-type' : 'application/json'
      },
      credentials : 'include'
    })
        .then((res) => res.json())
        .then((backendData) => {
            sessionStorage.setItem('userId',crypto.encrypt(toString(backendData.memberId)));
            sessionStorage.setItem('profileUrl',crypto.encrypt(backendData.profileUrl));
            sessionStorage.setItem('nickName',crypto.encrypt(backendData.nickName));
            navigate(`/home?id=${crypto.encrypt(toString(backendData.memberId))}`);
        })
        .catch(() => {
            alert('로그인 오류 발생');
            navigate('/');
        });
  }

  useEffect(() => {
      requestAccess();
  }, []);


  return <span>카카오 로그인 진행중입니다.</span>;
};

export default LoginCallback;
