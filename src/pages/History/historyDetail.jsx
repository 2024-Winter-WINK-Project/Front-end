import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx'
import Input from '../../components/Input/input.jsx'
import * as style from './styles.jsx';

export default function ViewHistory() {
  const location = useLocation();
  const transaction = location.state;

  if (!transaction) return <span>거래 내역 없음</span>;

  return (
      <>
      <TopNavBar pageName={"내역 보기"} isModalRequired={true}/>
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
            name={'outcome'}
            type={'detail'}
            content={'지출'}
          />
        </style.ButtonWrapper>
        <style.FormContainer>
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={transaction.type}
            value={transaction.description || ''}
            readOnly
          />
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={transaction.type}
            value={transaction.amount || ''}
            readOnly
          />
          <Input
            width={'376px'}
            height={'376px'}
            type={'textarea'}
            name={transaction.type}
            value={transaction.memo || ''}
            readOnly
          />
        </style.FormContainer>
      </style.Wrapper>
    </>
  );
}
