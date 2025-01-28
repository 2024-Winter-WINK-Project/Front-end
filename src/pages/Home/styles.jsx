import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10vh;
    
    @media (min-width: 600px){
        width : 600px;
    }

`;

export const TextWrapper = styled.div`
    width: 85%;
    height: 60%;
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const TextBox = styled.text`
    font-size: 20px;

`;

