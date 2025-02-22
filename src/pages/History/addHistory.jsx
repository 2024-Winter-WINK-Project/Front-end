import React, { useState } from 'react';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx'
import Input from '../../components/Input/input.jsx'
import * as style from './styles.jsx';

export default function History() {
  const [btnState, setBtnState] = useState('income');

  const handleButtonClick = (type) => {
    setBtnState(type);
  };

  return (
      <>
      <TopNavBar pageName={"내역 추가"} feature={"done"} isModalRequired={true}/>
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
            />
            <Input
              width={'376px'}
              height={'60px'}
              type={'number'}
              placeholder={'금액 작성...'}
              name={btnState}
            />
            <Input
              width={'376px'}
              height={'376px'}
              type={'textarea'}
              placeholder={'메모...'}
              name={btnState}
            />
          </style.FormContainer>
        </style.Wrapper>
      </>
    );
}
