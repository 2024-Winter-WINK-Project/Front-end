import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Withdrawal from '../../assets/Budget/withdrawal.svg';
import Deposit from '../../assets/Budget/deposit.svg';
import Add from '../../assets/Budget/history.svg';
import Transfer from '../../assets/Budget/transfer.svg';
import * as style from './styles.jsx';

export default function History() {
  const [btnState, setBtnState] = useState('all');
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setBtnState(type);
    if (type === 'addHistory') {
      navigate('/addhistory');
    } else {
      setBtnState(type);
    }
  };

  const transactions = [
    { id: 1, type: 'income', image: Withdrawal, content1: '1차 회비', content2: '+500,000' },
    { id: 2, type: 'outcome', image: Deposit, content1: '1일차 점심', content2: '-150,000' },
    { id: 3, type: 'income', image: Withdrawal, content1: '2차 회비', content2: '+1,500,000' },
    { id: 4, type: 'income', image: Withdrawal, content1: '호텔 환불', content2: '+800,000' }
  ];

  const filteredTransactions = btnState === 'all' 
    ? transactions 
    : transactions.filter(item => item.type === btnState);

  return (
      <>
      <TopNavBar />
      <style.Wrapper>
        <Button
          name={'budget'}
          content1={'잔액'}
          content2={'1,450,000원'}
        />
        <style.ButtonWrapper>
          <style.Label>
            <Button
              name={'options'}
              image={Withdrawal}
              onClick={() => handleButtonClick('income')}
            />
            <span>수입만 보기</span>
          </style.Label>
          <style.Label>
            <Button
              name={'options'}
              image={Deposit}
              onClick={() => handleButtonClick('outcome')}
            />
            <span>지출만 보기</span>
          </style.Label>
          <style.Label>
            <Button
              name={'options'}
              image={Add}
              onClick={() => handleButtonClick('addHistory')}
            />
            <span>내역 추가</span>
          </style.Label>
          <style.Label>
            <Button
              name={'options'}
              image={Transfer}
            />
            <span>송금하기</span>
          </style.Label>
        </style.ButtonWrapper>
        <style.HistoryContainer>
          <style.HistoryTitle>거래 내역</style.HistoryTitle>
            {filteredTransactions.map(({ id, type, image, content1, content2 }) => (
              <Button key={id} width={'360px'} height={'80px'} name={type} image={image} content1={content1} content2={content2} />
            ))}
          </style.HistoryContainer>
        </style.Wrapper>
      </>
    );
}
