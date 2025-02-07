import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Input from '../../components/Input/input.jsx';
import Modal from '../../components/Modal/modal.jsx';
import * as style from './styles.jsx';

export default function ViewHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = location.state || {};
  const isManager = transaction.isManager || false;

  const [description, setDescription] = useState(transaction.description || '');
  const [amount, setAmount] = useState(transaction.amount || '');
  const [memo, setMemo] = useState(transaction.memo || '');

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!transaction.id) return <span>거래 내역 없음</span>;

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/ledgerDetails/${transaction.id}`);
      closeModal();
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
      <>
      {isManager ? (
        <TopNavBar pageName={"내역 수정"} feature={"done"} isModalRequired={true} />
      ) : (
        <TopNavBar pageName={"내역 보기"} isModalRequired={true} />
      )}
      <style.Wrapper>
        <style.ButtonWrapper>
          <Button
            width={'168px'}
            height={'68px'}
            name={'income'}
            type={'detail'}
            content={'수입'}
          />
          <Button
            width={'168px'}
            height={'68px'}
            name={'expenditure'}
            type={'detail'}
            content={'지출'}
          />
        </style.ButtonWrapper>
        <style.FormContainer>
          {isManager && (
            <Button
              width={'376px'}
              height={'60px'}
              name={'expenditure'}
              type={'detail'}
              content={'삭제'}
              onClick={openModal}
            />
          )}
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={transaction.type}
            value={description}
            readOnly={!isManager}
            onChange={(e) => isManager && setDescription(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={transaction.type}
            value={amount}
            readOnly={!isManager}
            onChange={(e) => isManager && setAmount(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'376px'}
            type={'textarea'}
            name={transaction.type}
            value={memo}
            readOnly={!isManager}
            onChange={(e) => isManager && setMemo(e.target.value)}
          />
        </style.FormContainer>
      </style.Wrapper>

      <Modal
        isOpen={isModalOpen}
        handleConfirm={handleDeleteConfirm}
        closeModal={closeModal}
        message={"현재 내역을 삭제하시겠습니까?"}
      />
    </>
  );
}
