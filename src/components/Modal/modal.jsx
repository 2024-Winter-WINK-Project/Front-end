import React from 'react';
import Button from '../Button/ProfileButton';
import * as style from './styles';

const SignOutModal = ({ isOpen, handleConfirm, closeModal, message }) => {
  return (
    isOpen && (
      <style.ModalContainer>
        <style.ModalContent>
          <p>{message}</p>
          <style.ButtonContainer>
            <div>
              <Button
                size="small"
                num="one"
                content="확인"
                onClick={handleConfirm}
              />
              <Button
                size="small"
                num="two"
                content="취소"
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