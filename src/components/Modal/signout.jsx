import React from 'react';
import Button from '../Button/ProfileButton';
import * as style from './styles';

const SignOutModal = ({ isOpen, handleConfirm, closeModal }) => {
  return (
    isOpen && (
      <style.ModalContainer>
        <style.ModalContent>
          <p>로그아웃 하시겠습니까?</p>
          <style.ButtonContainer>
            <div>
              <Button
                size="small"
                num="one"
                name="확인"
                onClick={handleConfirm}
              />
              <Button
                size="small"
                num="two"
                name="취소"
                onClick={closeModal}
              />
            </div>
          </style.ButtonContainer>
        </style.ModalContent>
      </style.ModalContainer>
    )
  );
};

export default SignOutModal;