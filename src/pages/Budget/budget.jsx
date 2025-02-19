import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [searchParams] = useSearchParams();
  const isOwner = searchParams.get("owner") == "true";

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        // 가계부 데이터 요청
        const ledgerResponse = await axios.get(`http://localhost:8000/groups/${meetingId}/ledger`);
        const ledger = ledgerResponse.data[0];

        if (!ledger) return;

        setBalance(ledger.balance);

        // 거래 내역 데이터 요청
        const detailsResponse = await axios.get(`http://localhost:8000/groups/${meetingId}/ledger/transactions`);
        const filteredDetails = detailsResponse.data;

        // 거래 내역 데이터 가공
        const formattedTransactions = filteredDetails.map(detail => ({
          id: detail.id,
          type: detail.type,
          image: detail.amount > 0 ? Withdrawal : Deposit,
          description: detail.description,
          amountFormatted: detail.type === "income" ? `+${detail.amount.toLocaleString()}` : `-${detail.amount.toLocaleString()}`,
          amount: detail.amount
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
      if(isOwner) {
        navigate('/addhistory');
      } else {
        alert("모임장만 추가할 수 있습니다.");
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
              amount={transaction.amountFormatted}
              memo={transaction.memo}
              onClick={() => navigate(`/history/${transaction.id}`)}
            />
          ))}
        </style.HistoryContainer>
      </style.Wrapper>
    </>
  );
}
