import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Input from '../../components/Input/input.jsx';
import * as style from './styles.jsx';

export default function ViewHistory() {
  const location = useLocation();
  const transaction = location.state || {};
  const isManager = transaction.isManager || false;

  const [description, setDescription] = useState(transaction.description || '');
  const [amount, setAmount] = useState(transaction.amount || '');
  const [memo, setMemo] = useState(transaction.memo || '');

  if (!transaction.id) return <span>거래 내역 없음</span>;

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
              onClick={() => alert('삭제 기능 구현 필요')} // 삭제 기능 연결 필요
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
    </>
  );
}
