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
    }
  };

  const transactions = [
    { id: 1, type: 'income', image: Withdrawal, description: '1차 회비', amount: '+500,000' },
    { id: 2, type: 'outcome', image: Deposit, description: '1일차 점심', amount: '-150,000', memo: '명동교자 단체 식사'},
    { id: 3, type: 'income', image: Withdrawal, description: '2차 회비', amount: '+1,500,000' },
    { id: 4, type: 'income', image: Withdrawal, description: '호텔 환불', amount: '+800,000' }
  ];

  const filteredTransactions = btnState === 'all' 
    ? transactions 
    : transactions.filter(item => item.type === btnState);

  return (
      <>
      <TopNavBar pageName={"가계부"} isModalRequired={true}/>
      <style.Wrapper>
        <Button
          name={'budget'}
          description={'잔액'}
          amount={'1,450,000원'}
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
          {filteredTransactions.map((transaction) => (
              <Button 
                key={transaction.id}
                width={'360px'}
                height={'80px'}
                name={transaction.type}
                image={transaction.image}
                description={transaction.description}
                amount={transaction.amount}
                memo={transaction.memo}
                onClick={() => navigate(`/history/${transaction.id}`, { state: transaction })}
              />
            ))}
          </style.HistoryContainer>
        </style.Wrapper>
      </>
    );
}
