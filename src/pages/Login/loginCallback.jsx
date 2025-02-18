import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginCallback = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const navigate = useNavigate();
  const isFetching = useRef(false);

  
//   const requestAccess = async () => {
//     fetch(`http://localhost:8080/auth/kakao/login?code=${code}`,{
//       method : 'get',
//       headers : {
//         'content-type' : 'application/json'
//       },
//       credentials : 'include'
//     })
//         .then((res) => res.json())
//         .then((backendData) => {
//           console.log(backendData);
//             // localStorage.setItem('token', backendData.token);
//             sessionStorage.setItem('userId',backendData.memberId);
//             navigate(`/home/${backendData.memberId}`);
//         })
//         .catch(() => {
//             alert('로그인 오류 발생');
//             navigate('/login');
//         });
//   }
  
    useEffect(() => {
      if (!code) {
          alert("카카오 로그인 실패");
          navigate('/login');
          return;
      }

      if (isFetching.current) return; // 중복 요청 방지
      isFetching.current = true;

      const fetchLogin = async () => {
          try {
              const res = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/auth/kakao/login`,
                  {
                      params: { code },
                      headers: { 'Content-Type': 'application/json' },
                      withCredentials: true,
                  }
              );

              const data = res?.data;
              console.log(res);
              localStorage.setItem('token', data.token);
              sessionStorage.setItem('userId',data.memberId);
              navigate(`/home/${data.memberId}`);
          }
          catch (error) 
          {
              console.error('로그인 오류:', error);
              alert('로그인 오류 발생');
              navigate('/login');
          }
          finally 
          {
              isFetching.current = false;
          }
    };
      fetchLogin();

    }, [code, navigate]);
  
  

  return (
    <>
      <span>카카오 로그인 진행중입니다.</span>
    </>
  );
};

export default LoginCallback;