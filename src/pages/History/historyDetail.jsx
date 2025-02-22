import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Input from '../../components/Input/input.jsx';
import Modal from '../../components/Modal/modal.jsx';
import * as style from './styles.jsx';

export default function ViewHistory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOwner = searchParams.get("owner") === "true";
  const { meetingId } = useParams();
  const groupId = meetingId;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transaction = location.state?.transaction || {};
  const [transactionId, setTransactionId] = useState(transaction?.id || '');
  const [selectedType, setSelectedType] = useState(transaction?.category || 'income');
  const [description, setDescription] = useState(transaction?.description || '');
  const [amount, setAmount] = useState(transaction?.amount || '');
  const [memo, setMemo] = useState(transaction?.memo || '');

  useEffect(() => {
    if (!transaction || Object.keys(transaction).length === 0) {
      console.error("거래 데이터가 없습니다.");
    }
  }, [transaction]);

  const handleButtonClick = (category) => {
    if (isOwner) {
      setSelectedType(category);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    if (!transactionId) {
      alert("거래 내역을 찾을 수 없습니다.");
      return;
    }

    const parsedAmount = selectedType === 'income' ? Math.abs(Number(amount)) : -Math.abs(Number(amount));
  
    try {
      const res = await axios.put(
        `http://localhost:8080/groups/${groupId}/ledger/transactions/${transactionId}`,
        {
          id: transactionId,
          category: selectedType,
          description,
          amount: parsedAmount,
          memo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${document.cookie}`,
          },
        }
      );
  
      console.log("수정 성공:", res.data);
      alert("거래 내역이 수정되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!transactionId) {
      alert("거래 내역을 찾을 수 없습니다.");
      return;
    }
  
    try {
      await axios.delete(
        `http://localhost:8080/groups/${groupId}/ledger/transactions/${transactionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${document.cookie}`,
          },
        }
      );
  
      alert("거래 내역이 삭제되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!transaction) return <span>거래 내역 없음</span>;

  return (
      <>
      {isOwner ? (
        <TopNavBar pageName={"내역 수정"} feature={"done"} isModalRequired={true} onDataChange={handleUpdate} dest={"/"} />
      ) : (
        <TopNavBar pageName={"내역 보기"} isModalRequired={true} dest={"/"} />
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
            name={'expenditure'}
            type={'detail'}
            content={'지출'}
            onClick={() => handleButtonClick('expenditure')}
            isSelected={selectedType === 'expenditure'}
          />
        </style.ButtonWrapper>
        <style.FormContainer>
          {isOwner && (
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
            readOnly={!isOwner}
            onChange={(e) => isOwner && setDescription(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={selectedType}
            value={amount}
            readOnly={!isOwner}
            onChange={(e) => isOwner && setAmount(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'376px'}
            type={'textarea'}
            name={selectedType}
            value={memo}
            readOnly={!isOwner}
            onChange={(e) => isOwner && setMemo(e.target.value)}
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