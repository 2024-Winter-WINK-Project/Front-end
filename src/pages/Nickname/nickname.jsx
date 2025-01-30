import React, { useState } from 'react';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Input from "../../components/Input/input.jsx";
import Modal from "../../components/Modal/modal.jsx";
import * as style from './styles.jsx';

export default function Nickname() {
  const [nickname, setNickname] = useState('');
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value); // 입력값이 변경될 때마다 상태 업데이트
  };

  const handleSubmit = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력해 주세요');
      setJoinModalOpen(false); // 모달이 열리지 않도록 처리
    } else {
      setJoinModalOpen(true); // 닉네임이 있으면 모달 열기
    }
  };

  const closeJoinModal = () => {
    setJoinModalOpen(false);
    alert('모임 가입 완료');
  };

  return (
    <>
      <TopNavBar pageName={"모임 가입"} feature={"done"} isModalRequired={true} onDataChange={handleSubmit} />
      <style.Wrapper>
        <style.FormContainer>
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={'income'}
            placeholder={'닉네임을 입력해 주세요'}
            value={nickname}
            onChange={handleNicknameChange}
          />
          <div>
            모임에서 사용할 닉네임을 입력해 주세요.
            <br />
            이번 모임에서만 사용되는 닉네임 이예요.
          </div>
        </style.FormContainer>
      </style.Wrapper>

      <Modal 
        isOpen={isJoinModalOpen}
        handleConfirm={closeJoinModal}
        closeModal={() => setJoinModalOpen(false)}
        message={"모임에 가입하시겠습니까?"}
      />
    </>
  );
}