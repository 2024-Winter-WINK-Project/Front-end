import React, { useState } from 'react';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Input from "../../components/Input/input.jsx";
import Modal from "../../components/Modal/modal.jsx";
import * as style from './styles.jsx';
import * as crypto from "../../components/Others/Crypto";
import axios from "axios";

export default function Nickname() {
  const [nickname, setNickname] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [meetingId, setMeetingId] = useState();
  const [code, setCode] = useState();
  const handleNicknameChange = (e) => {
    setNickname(e.target.value); // 입력값이 변경될 때마다 상태 업데이트
  };

  const handleInvitationCodeChange = (e) => {
    setInvitationCode(e.target.value);
  };

  const handleSubmit = () => {
    if (nickname.trim() === '' || invitationCode.trim() === '') {
      alert('초대코드와 닉네임을 모두 입력해 주세요');
      setJoinModalOpen(false); // 모달이 열리지 않도록 처리
    } else {
      setMeetingId(crypto
          .decrypt(invitationCode)
          .slice(0,crypto
              .decrypt(invitationCode)
              .indexOf("/")));
      setCode(crypto
          .decrypt(invitationCode)
          .slice(crypto
              .decrypt(invitationCode)
              .indexOf("/")+1));
      setJoinModalOpen(true); // 닉네임이 있으면 모달 열기
    }
  };

  const closeJoinModal = () => {
    axios(`http://localhost:8080/meetings/invitations/${code}/request?nickname=${nickname}`, {
      method : 'post',
      headers : {
        Authorization : `Bearer ${document.cookie}`,
        withCredentials : true
      },
    })
        .then(res => {
          alert('모임 가입을 완료했어요. 확인 버튼을 누르면 홈 화면으로 이동해요.');
          window.location.replace(`/home?id=${sessionStorage.getItem("userId")}`)
        })
        .catch(e => {
          alert("모임 가입에 실패했어요. 초대 코드가 유효한지 확인해 주세요.");
        })

  };

  return (
    <>
      <TopNavBar pageName={"모임 가입"} feature={"done"} isModalRequired={true} onDataChange={handleSubmit} />
      <style.Wrapper>
        <style.FormContainer>
          <Input
              width={'90%'}
              height={'60px'}
              type={'text'}
              name={'income'}
              placeholder={'초대코드를 입력해 주세요'}
              value={invitationCode}
              onChange={handleInvitationCodeChange}
          />
          <div>
            모임장에게서 받은 초대 코드를 입력해 주세요.
          </div>
          <Input
            width={'90%'}
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
