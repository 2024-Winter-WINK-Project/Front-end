import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useMediaQuery} from "react-responsive";
import TopBar from "../../components/TopBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx';
import Withdrawal from '../../assets/Budget/withdrawal.svg';
import Deposit from '../../assets/Budget/deposit.svg';
import Add from '../../assets/Budget/history.svg';
import Transfer from '../../assets/Budget/transfer.svg';
import * as style from './styles.jsx';

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}

export default function History() {
  const [btnState, setBtnState] = useState('income');
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setBtnState(type);
    if (type === 'addHistory') {
      navigate('/addhistory');
    }
  };

  return (
      <>
      <TopBar></TopBar>
        <Mobile>
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
                />
                <span>수입만 보기</span>
              </style.Label>
              <style.Label>
                <Button
                  name={'options'}
                  image={Deposit}
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
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'1차 회비'}
                content2={'+500,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'outcome'}
                image={Deposit}
                content1={'1일차 점심'}
                content2={'-150,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'2차 회비'}
                content2={'-1,500,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'호텔 환불'}
                content2={'+800,000'}
              />
            </style.HistoryContainer>
          </style.Wrapper>
        </Mobile>
        <PC>
          <style.WrapperPC>
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
                />
                <span>수입만 보기</span>
              </style.Label>
              <style.Label>
                <Button
                  name={'options'}
                  image={Deposit}
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
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'1차 회비'}
                content2={'+500,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'outcome'}
                image={Deposit}
                content1={'1일차 점심'}
                content2={'-150,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'2차 회비'}
                content2={'-1,500,000'}
              />
              <Button
                width={'360px'}
                height={'80px'}
                name={'income'}
                image={Withdrawal}
                content1={'호텔 환불'}
                content2={'+800,000'}
              />
            </style.HistoryContainer>
          </style.WrapperPC>
        </PC>
      </>
    );
}