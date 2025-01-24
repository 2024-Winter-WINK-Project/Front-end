import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalContent = styled.div`
  background: white;
  border: 2px solid black;
  padding: 36px 36px;
  border-radius: 10px;
  > p {
    font-weight: 600;
    display: flex;
    justify-content: center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;