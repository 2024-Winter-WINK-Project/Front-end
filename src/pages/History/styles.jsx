import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
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
  gap: 20px;
  margin-top: 24px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;