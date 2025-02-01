import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    @media (min-width: 600px) {
        width: 600px;
    }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  > div {
    font-size: 16px;
    color: #8D8D8D;
    margin-top: 40px;
  }
`;