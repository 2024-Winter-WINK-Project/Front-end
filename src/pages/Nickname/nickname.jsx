import React from 'react';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import Input from "../../components/Input/input.jsx"
import * as style from './styles.jsx';

export default function Nickname() {
  return (
      <>
      <TopNavBar pageName={"모익 가입"} feature={"done"} isModalRequired={true}/>
      <style.Wrapper>
        <style.FormContainer>
          <Input
            width={'376px'}
            height={'60px'}
            type={'text'}
            name={'income'}
            placeholder={'닉네임을 입력해 주세요'}
          />
          <div>
            모임에서 사용할 닉네임을 입력해 주세요.
            <br />
            이번 모임에서만 사용되는 닉네임 이예요.
          </div>
        </style.FormContainer>
      </style.Wrapper>
    </>
  );
}