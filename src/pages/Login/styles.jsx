import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  margin-bottom: 360px;
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