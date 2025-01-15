import React, { useState } from 'react';
import {useMediaQuery} from "react-responsive";
import TopBar from "../../components/TopBar.jsx";
import Button from '../../components/Button/BudgetButton.jsx'
import Input from '../../components/Input/input.jsx'
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

  const handleButtonClick = (type) => {
    setBtnState(type);
  };

  return (
      <>
      <TopBar></TopBar>
        <Mobile>
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
                onClick={() => handleButtonClick('outcome')}
              />
            </style.ButtonWrapper>
            <style.FormContainer>
              <Input
                width={'360px'}
                height={'60px'}
                type={'text'}
                placeholder={'거래내역 작성...'}
                name={btnState}
              />
              <Input
                width={'360px'}
                height={'60px'}
                type={'number'}
                placeholder={'금액 작성...'}
                name={btnState}
              />
              <Input
                width={'360px'}
                height={'360px'}
                type={'textarea'}
                placeholder={'메모...'}
                name={btnState}
              />
            </style.FormContainer>
          </style.Wrapper>
        </Mobile>
        <PC>
          <style.WrapperPC>
          <style.ButtonWrapper>
            <Button
              width={'188px'}
              height={'68px'}
              name={'income'}
              type={'detail'}
              content={'수입'}
              onClick={() => handleButtonClick('income')}
            />
            <Button
              width={'188px'}
              height={'68px'}
              name={'outcome'}
              type={'detail'}
              content={'지출'}
              onClick={() => handleButtonClick('outcome')}
            />
            </style.ButtonWrapper>
            <style.FormContainer>
              <Input
                width={'400px'}
                height={'60px'}
                type={'text'}
                placeholder={'거래내역 작성...'}
                name={btnState}
              />
              <Input
                width={'400px'}
                height={'60px'}
                type={'number'}
                placeholder={'금액 작성...'}
                name={btnState}
              />
              <Input
                width={'400px'}
                height={'280px'}
                type={'textarea'}
                placeholder={'메모...'}
                name={btnState}
              />
            </style.FormContainer>
          </style.WrapperPC>
        </PC>
      </>
    );
}