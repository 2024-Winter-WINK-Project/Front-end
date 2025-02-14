import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  // code : 인가코드
  console.log("인가 코드 타입 : ",typeof(code),"인가 코드 : ",code);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState();
  const cookies = new Cookies;

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
    requestAccess();
  }, [code]);

  return (
      <>
        <span>카카오 로그인 진행중입니다.</span>
      </>
  );
};

export default LoginCallback;
