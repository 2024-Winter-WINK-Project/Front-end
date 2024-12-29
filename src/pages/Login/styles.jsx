import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 11vh;
`;

export const WrapperPC = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 11vh;
    
`;

export const LoginContainer = styled.div`
  height: 72vh;
  display: flex;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 100px;
  margin-bottom: 320px;
  > span {
    font-size: 20px;
    font-weight: bold;
  }
  > img {
    width: 40px;
  }
`;

export const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  padding: 12px 24px;
  gap: 8px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  > img {
    margin-top: 4px;
  }
`;