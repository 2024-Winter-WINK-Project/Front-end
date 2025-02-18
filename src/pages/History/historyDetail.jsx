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

  const [selectedType, setSelectedType] = useState(transaction.type || 'income');
  const [description, setDescription] = useState(transaction.description || '');
  const [amount, setAmount] = useState(transaction.amount || '');
  const [memo, setMemo] = useState(transaction.memo || '');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const groupId = transaction.groupId;
  const transactionId = transaction.id;

  const handleButtonClick = (type) => {
    if (isManager) {
      setSelectedType(type);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!transaction.id) return <span>거래 내역 없음</span>;

  const handleUpdate = async () => {
    // 숫자로 변환 후, 수입/지출에 따라 부호 적용
    let numericAmount = Number(String(amount).replace(/[^0-9.]/g, "")); // 숫자로 변환
  
    if (selectedType === "expenditure") {
      numericAmount = `-${numericAmount}`;
    } else {
      numericAmount = `+${numericAmount}`;
    }
  
    console.log("변환된 amount:", numericAmount);
  
    const updatedTransaction = {
      type: selectedType,
      description,
      amount: numericAmount,
      memo,
    };
  
    console.log("전송할 데이터:", updatedTransaction);
  
    try {
      const response = await axios.put(
        `http://localhost:8000/ledgerDetails/${transaction.id}`,
        updatedTransaction
      );

      closeModal();
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };  

  const handleDelete = async () => {
    console.log(`삭제하려는 데이터:`, transaction);

    try {
      await axios.delete(`http://localhost:8000/ledgerDetails/${transaction.id}`);
      closeModal();
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
      <>
      {isManager ? (
        <TopNavBar pageName={"내역 수정"} feature={"done"} isModalRequired={true} onDataChange={handleUpdate} dest={"/"} />
      ) : (
        <TopNavBar pageName={"내역 보기"} isModalRequired={true} onDataChange={handleDelete} dest={"/"} />
      )}
      <style.Wrapper>
        <style.ButtonWrapper>
          <Button
            width={'168px'}
            height={'68px'}
            name={'income'}
            type={'detail'}
            content={'수입'}
            onClick={() => handleButtonClick('income')}
            isSelected={selectedType === 'income'}
          />
          <Button
            width={'168px'}
            height={'68px'}
            name={'outcome'}
            type={'detail'}
            content={'지출'}
            onClick={() => handleButtonClick('expenditure')}
            isSelected={selectedType === 'expenditure'}
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
            name={selectedType}
            value={description}
            readOnly={!isManager}
            onChange={(e) => isManager && setDescription(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={selectedType}
            value={amount}
            readOnly={!isManager}
            onChange={(e) => isManager && setAmount(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'376px'}
            type={'textarea'}
            name={selectedType}
            value={memo}
            readOnly={!isManager}
            onChange={(e) => isManager && setMemo(e.target.value)}
          />
        </style.FormContainer>
      </style.Wrapper>

      <Modal
        isOpen={isModalOpen}
        handleConfirm={handleDelete}
        closeModal={closeModal}
        message={"현재 내역을 삭제하시겠습니까?"}
      />
    </>
  );
}
