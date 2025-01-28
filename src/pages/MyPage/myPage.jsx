import React, {useEffect, useRef, useState} from 'react';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import axios from 'axios';
import Profile from '../../assets/MyPage/profile.svg';
import Button from '../../components/Button/ProfileButton.jsx';
import SingOutModal from '../../components/Modal/signout.jsx';
import DeleteModal from '../../components/Modal/delete.jsx';
import * as style from './styles';


export default function MyPage() {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openSignOutModal = () => setIsSignOutModalOpen(true);
  const closeSignOutModal = () => setIsSignOutModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleSignOutConfirm = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
        closeSignOutModal();
        sessionStorage.removeItem('accessToken');
        alert("로그아웃 완료");
        navigate('/login')
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/auth/withdraw`, {
          data: { userId },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        });
        closeDeleteModal();
        sessionStorage.clear();
        alert("회원 탈퇴 완료");
        navigate('/login')
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
            alert("소속된 모임이 있어 탈퇴할 수 없습니다.");
        } else {
            alert("회원 탈퇴 실패");
        }
    }
  };

  const memberId = useRef(20250101000);
  const [profilePicture, setProfilePicture] = useState();
  const [nickName, setNickName] = useState();
  useEffect(() => {
      fetch(`http://localhost:8000/members?${memberId.current}`)
          .then((response) => response.json())
          .then((json) => {
              setProfilePicture(json[0].profilePicture);
              setNickName(json[0].socialId);
          })
          .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <TopNavBar pageName={"마이페이지"}
                 isBackRequired={true}/>
        <style.Wrapper>
          <style.ProfileContainer>
            <style.ProfileTitle>나의 프로필</style.ProfileTitle>
              <style.UserInfoContainer>
                  <style.Profile>
                    {profilePicture ?
                    <img src={profilePicture} alt="프로필 사진" />
                    :
                    <img src={Profile} alt="프로필 사진" />
                  }
                  </style.Profile>
                <style.UserInfo>
                  <span>이름</span>
                  <span>{nickName}</span>
                </style.UserInfo>
              </style.UserInfoContainer>
              <style.ButtonContainer>
                <div>
                  <Button size="big" content="로그아웃" onClick={openSignOutModal} />
                  <Button size="big" content="탈퇴하기" onClick={openDeleteModal} />
                </div>
              </style.ButtonContainer>
            <style.ProfileTitle>자주 묻는 질문</style.ProfileTitle>
          </style.ProfileContainer>
        </style.Wrapper>
      <SingOutModal
        isOpen={isSignOutModalOpen}
        handleConfirm={handleSignOutConfirm}
        closeModal={closeSignOutModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        handleConfirm={handleDeleteConfirm}
        closeModal={closeDeleteModal}
      />
    </>
  );
}
