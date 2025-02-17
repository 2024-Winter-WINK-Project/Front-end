import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Withdrawal from '../../assets/Budget/withdrawal.svg';
import Deposit from '../../assets/Budget/deposit.svg';
import Add from '../../assets/Budget/history.svg';
import Transfer from '../../assets/Budget/transfer.svg';
import * as style from './styles.jsx';

export default function History() {
  const [btnState, setBtnState] = useState('all');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();
  const { meetingId } = useParams();

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        // 모임장 여부
        const meetingResponse = await axios.get(`http://localhost:8000/meeting?id=${meetingId}`);
        if (meetingResponse.data.length > 0) {
          setIsManager(meetingResponse.data[0].isManager);
        }
        
        // 가계부 데이터
        const ledgerResponse = await axios.get(`http://localhost:8000/ledgers?id=${meetingId}`);
        const ledger = ledgerResponse.data[0];

        if (!ledger) return;

        setBalance(ledger.balance);

        const detailsResponse = await axios.get(`http://localhost:8000/ledgerDetails?id=${meetingId}`);
        const filteredDetails = detailsResponse.data;

        const formattedTransactions = filteredDetails.map(detail => ({
          id: detail.id,
          type: detail.type,
          image: detail.amount > 0 ? Withdrawal : Deposit,
          description: detail.description,
          amount: detail.type === "income" ? `+${detail.amount.toLocaleString()}` : `-${detail.amount.toLocaleString()}`
        }));

        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchLedgerData();
  }, [meetingId]);

  const handleButtonClick = (type) => {
    if (type === 'addHistory') {
      if (isManager) {
        setBtnState(type);
        navigate('/addhistory');
      } else {
        alert('모임장만 추가 가능합니다.');
      }
    } else if (type === 'transfer') {
      navigate(`/budget/${meetingId}/transfer`);
    } else {
      setBtnState(type);
    }
  };  

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
          amount={`${balance.toLocaleString()}원`}
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
              onClick={() => handleButtonClick('expenditure')}
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
              onClick={() => handleButtonClick('transfer')}
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
              onClick={() => navigate(`/history/${transaction.id}`, { state: { ...transaction, isManager } })}
            />
          ))}
        </style.HistoryContainer>
      </style.Wrapper>
    </>
  );
}