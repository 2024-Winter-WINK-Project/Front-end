import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";
import TopBar from "../../components/TopBar.jsx";
import Profile from '../../assets/MyPage/profile.svg';
import Button from '../../components/Button/ProfileButton.jsx';
import SingOutModal from '../../components/Modal/signout.jsx';
import DeleteModal from '../../components/Modal/delete.jsx';
import LightBlueBox from "../../components/LightBlueBox.jsx";
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

export default function MyPage() {
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openSignOutModal = () => {
    setIsSignOutModalOpen(true);
  }

  const closeSignOutModal = () => {
    setIsSignOutModalOpen(false);
  }

  const handleSignOutConfirm = () => {
    console.log("sign out");
    closeSignOutModal();
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const handleDeleteConfirm = () => {
    console.log("delete account");
    closeDeleteModal();
  }
  const [latestGroup, setLatestGroup] = useState();
  useEffect(() => {
      fetch("http://localhost:8000/groups?_limit=1&_sort=eventStartDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
          .then(res => {
              return res.json();
          })
          .then(data => {
              setLatestGroup(data);
          });
  }, []);
  return (
    <>
      <TopBar></TopBar>
      <Mobile>
        <style.Wrapper>
          <style.ProfileContainer>
            <style.ProfileTitle>나의 프로필</style.ProfileTitle>
            <style.UserInfoContainer>
              <style.Profile>
                <img src={Profile} alt="프로필 사진" />
              </style.Profile>
              <style.UserInfoBox>
                <style.UserInfo>
                  <span>이름</span>
                  <span>홍길동</span>
                </style.UserInfo>
                <style.UserInfo>
                  <span>이메일</span>
                  <span>gildong@gmail.com</span>
                </style.UserInfo>
              </style.UserInfoBox>
            </style.UserInfoContainer>
            <style.ButtonContainer>
                <div>
                  <Button size="big" content="로그아웃" onClick={openSignOutModal} />
                  <Button size="big" content="탈퇴하기" onClick={openDeleteModal} />
                </div>
              </style.ButtonContainer>
            <style.ProfileTitle>가장 가까운 모임</style.ProfileTitle>
            {latestGroup && <LightBlueBox group={latestGroup} isList={false}/>}
          </style.ProfileContainer>
        </style.Wrapper>
      </Mobile>
      <PC>
        <style.WrapperPC>
          <style.ProfileContainer>
            <style.ProfileTitle>나의 프로필</style.ProfileTitle>
            <style.UserInfoContainer>
              <style.Profile>
                <img src={Profile} alt="프로필 사진" />
              </style.Profile>
              <style.UserInfoBox>
                <style.UserInfo>
                  <span>이름</span>
                  <span>홍길동</span>
                </style.UserInfo>
                <style.UserInfo>
                  <span>이메일</span>
                  <span>gildong@gmail.com</span>
                </style.UserInfo>
              </style.UserInfoBox>
            </style.UserInfoContainer>
            <style.ButtonContainer>
                <div>
                  <Button size="big" content="로그아웃" onClick={openSignOutModal} />
                  <Button size="big" content="탈퇴하기" onClick={openDeleteModal} />
                </div>
              </style.ButtonContainer>
            <style.ProfileTitle>가장 가까운 모임</style.ProfileTitle>
            <LightBlueBox
              eventTitle={"제주도 여행"}
              eventStartDate={"2025-02-10"}
              eventEndDate={"2025-02-15"}>
            </LightBlueBox>
          </style.ProfileContainer>
        </style.WrapperPC>
      </PC>
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
