import React from 'react';
import Button from '../Button/ProfileButton';
import * as style from './styles';

const DeleteModal = ({ isOpen, handleConfirm, closeModal }) => {
  return (
    isOpen && (
      <style.ModalContainer>
        <style.ModalContent>
          <p>탈퇴 하시겠습니까?</p>
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

export default DeleteModal;