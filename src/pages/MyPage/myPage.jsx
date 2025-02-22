import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Profile from '../../assets/MyPage/profile.svg';
import Button from '../../components/Button/ProfileButton.jsx';
import Modal from '../../components/Modal/modal.jsx';
import * as style from './styles';

export default function MyPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // 사용자 정보 불러오기
  const memberId = sessionStorage.getItem("userId");
  const nickName = sessionStorage.getItem("nickName") || "사용자";
  const profilePicture = sessionStorage.getItem("profileUrl") || Profile;

  useEffect(() => {
    console.log("마이페이지 로드됨");
    console.log("memberId:", memberId);
    console.log("nickName:", nickName);
    console.log("profilePicture:", profilePicture);

    if (!memberId) {
      alert("로그인이 필요합니다.");
      navigate('/login');
    }
  }, [memberId, navigate]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  // 로그아웃
  const handleSignOutConfirm = async () => {
    try {
      await axios.get(`http://localhost:8080/auth/logout`, {
        withCredentials: true,
      });
  
      sessionStorage.clear();
      alert("로그아웃 완료");
      navigate('/login');
    } catch (error) {
      console.error("로그아웃 실패:", error.response?.data || error.message);
      alert("로그아웃 실패");
    }
  };

  // 탈퇴
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/auth/withdraw`, {
        withCredentials: true,
      });
  
      sessionStorage.clear();
      alert("회원 탈퇴 완료");
      navigate('/login');
    } catch (error) {
      console.error("탈퇴 실패:", error.response?.data || error.message);
  
      if (error.response?.status === 400) {
        alert("소속된 모임이 있어 탈퇴할 수 없습니다.");
      } else {
        alert("회원 탈퇴 실패");
      }
    }
  };

return (
  <>
    <TopNavBar pageName={"마이페이지"} isBackRequired={true}/>
    <style.Wrapper>
      <style.ProfileContainer>
        <style.ProfileTitle>나의 프로필</style.ProfileTitle>
        <style.UserInfoContainer>
          <style.Profile>
            <img src={profilePicture} alt="프로필 사진" />
          </style.Profile>
          <style.UserInfo>
            <span>이름</span>
            <span>{nickName}</span>
          </style.UserInfo>
        </style.UserInfoContainer>
        <style.ButtonContainer>
          <div>
            <Button size="big" content="로그아웃" onClick={() => openModal("signout")} />
            <Button size="big" content="탈퇴하기" onClick={() => openModal("delete")} />
          </div>
        </style.ButtonContainer>
        <style.ProfileTitle>자주 묻는 질문</style.ProfileTitle>
      </style.ProfileContainer>
    </style.Wrapper>
    <Modal
      isOpen={isModalOpen}
      handleConfirm={modalType === "signout" ? handleSignOutConfirm : handleDeleteConfirm}
      closeModal={closeModal}
      message={modalType === "signout" ? "로그아웃 하시겠습니까?" : "탈퇴 하시겠습니까?"}
    />
  </>
  );
}