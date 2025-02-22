import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
        margin-top: 10vh;
        width: 600px;
        height: 90vh;
    }
`;

export const FormContainer = styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  > div {
    font-size: 16px;
    color: #8D8D8D;
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;
