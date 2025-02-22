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
import * as crypto from "../../components/Others/Crypto";


export default function Budget() {
  const [btnState, setBtnState] = useState('all');
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const isOwner = searchParams.get("owner") === "true";
  const { meetingId } = useParams();
  const groupId = meetingId;
  const isOwner  = useParams().skey;

  // 가계부 데이터 가져오는 함수
  const fetchLedgerData = async () => {
    try {
      const ledgerResponse = await axios.get(`http://localhost:8080/groups/${groupId}/ledger`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${document.cookie}`,
        },
      });

      console.log("API 응답:", ledgerResponse.data);

      if (ledgerResponse.status === 200) {
        const { totalAmount, details } = ledgerResponse.data;

        if (typeof totalAmount !== "undefined") {
          console.log("가져온 잔액:", totalAmount);
          setTotalAmount(totalAmount);
        }

        if (Array.isArray(details)) {
          console.log("가져온 거래 내역:", details);

          // 거래 내역을 가공하여 필요한 데이터 추가
          const formattedTransactions = details.map((transaction) => ({
            id: transaction.id,
            category: transaction.category,
            image: transaction.category === "income" ? Deposit : Withdrawal,
            description: transaction.description,
            amountFormatted: transaction.category === "income"
              ? `+${transaction.amount.toLocaleString()}원`
              : `-${transaction.amount.toLocaleString()}원`,
            amount: transaction.amount,
          }));

          setTransactions(formattedTransactions);
        }
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchLedgerData();
    }
  }, [groupId, totalAmount]);
  console.log(Boolean(crypto.decrypt(`${isOwner}`)))
  const handleButtonClick = (type) => {
    if (type === "addHistory") {
        if (Boolean(crypto.decrypt(`${isOwner}`)) === true) {
            navigate(`/budget/${meetingId}/addhistory/` + `${isOwner}`);
        } else {
            alert("모임장만 추가할 수 있습니다.");
        }
    } else if (type === "transfer") {
        navigate(`/budget/${groupId}/transfer/` + `${isOwner}`);
    } else {
        setBtnState(type);
    }
  };

  const filteredTransactions = btnState === 'all'
    ? transactions
    : transactions.filter(item => item.category  === btnState);


  return (
    <>
      <TopNavBar pageName={"가계부"} isModalRequired={false} isBackRequired={true}/>
      <style.Wrapper>
        <Button
          name={"budget"}
          description={"잔액"}
          amount={`${totalAmount.toLocaleString()}원`}
        />
        <style.ButtonWrapper>
          <style.Label>
            <Button name={"options"} image={Withdrawal} onClick={() => handleButtonClick("income")} />
            <span>수입만 보기</span>
          </style.Label>
          <style.Label>
            <Button name={"options"} image={Deposit} onClick={() => handleButtonClick("expenditure")} />
            <span>지출만 보기</span>
          </style.Label>
          <style.Label>
            <Button name={"options"} image={Add} onClick={() => handleButtonClick("addHistory")} />
            <span>내역 추가</span>
          </style.Label>
          <style.Label>
            <Button name={"options"} image={Transfer} onClick={() => handleButtonClick("transfer")} />
            <span>정산하기</span>
          </style.Label>
        </style.ButtonWrapper>
        <style.HistoryContainer>
          <style.HistoryTitle>거래 내역</style.HistoryTitle>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <Button
                key={transaction.id}
                width={"360px"}
                height={"80px"}
                name={transaction.category}
                image={transaction.image}
                description={transaction.description}
                amount={transaction.amountFormatted}
                onClick={() => navigate((`/history/${meetingId}/${transaction.id}/` + crypto.encrypt(`${isOwner}`)), {
                  state: { transaction, groupId, isOwner },
                })}
              />
            ))
          ) : (
            <p>거래 내역이 없습니다.</p>
          )}
        </style.HistoryContainer>
      </style.Wrapper>
    </>
  );
}
