import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Input from '../../components/Input/input.jsx';
import * as style from './styles.jsx';

export default function History() {
  const [btnState, setBtnState] = useState('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const groupId = meetingId;
  const [searchParams] = useSearchParams();
  const isOwner = searchParams.get("owner") === "true";

  const handleButtonClick = (type) => {
    setBtnState(type);
  };

  const handleSubmit = async () => {
    if (!description.trim() || !amount.trim()) {
      alert("필수 정보를 입력해 주세요.");
      return;
    }

    // 숫자로 변환 후, 수입/지출에 따라 부호 적용
    let numericAmount = parseInt(amount, 10) || 0; // 정수 변환, 빈값은 0 처리
    numericAmount = btnState === "expenditure" ? -numericAmount : numericAmount;
    console.log("변환된 amount 값:", numericAmount);

    // 전송할 데이터 객체
    const requestData = {
      category: btnState,
      description,
      amount: numericAmount,
      // memo,
    };

    console.log(`추가하려는 데이터:`, requestData);

    try {
      const res = await axios.post(
        `http://localhost:8080/groups/${groupId}/ledger/transactions`,
        requestData,
        {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${document.cookie}`,
            },
        }
      );
      alert("내역이 추가되었습니다.");
      navigate(`/budget/${meetingId}?owner=${isOwner}`);
    } catch (error) {
      console.error("내역 추가 실패:", error);
      alert("내역 추가 실패");
    }
  };

  return (
    <>
      <TopNavBar pageName={"내역 추가"} feature={"done"} isModalRequired={true} onDataChange={handleSubmit} dest={"/"}/>
      <style.Wrapper>
        <style.ButtonWrapper>
          <Button
            width={'168px'}
            height={'68px'}
            name={'income'}
            type={'detail'}
            content={'수입'}
            onClick={() => handleButtonClick('income')}
          />
          <Button
            width={'168px'}
            height={'68px'}
            name={'outcome'}
            type={'detail'}
            content={'지출'}
            onClick={() => handleButtonClick('expenditure')}
          />
        </style.ButtonWrapper>
        <style.FormContainer>
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            placeholder={'거래내역 작성...'}
            name={btnState}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            placeholder={'금액 작성...'}
            name={btnState}
            value={amount}
            onChange={(e) => {
              const input = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
              setAmount(input);
            }}
          />
          <Input
            width={'376px'}
            height={'376px'}
            type={'textarea'}
            placeholder={'메모...'}
            name={btnState}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </style.FormContainer>
      </style.Wrapper>
    </>
  );
}
