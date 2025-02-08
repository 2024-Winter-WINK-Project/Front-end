import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px) {
        width: 600px;
        padding-top: 10vh;
    }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 12px;
    margin-top: 4px;
  }
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const HistoryTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-top: 16px;
  margin-right: 280px;
`;