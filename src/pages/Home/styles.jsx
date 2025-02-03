import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px){
        width : 600px;
        padding-top: 10vh;
    }

`;

export const ContentContainer = styled.div`
    width : 90%;
`;

export const TextWrapper = styled.div`
    width: 85%;
    height: 60%;
    display: flex;
    justify-content: left;
    align-items: center;

    @media (min-width: 600px){
        height: 10%;
    }
`;

export const TextBox = styled.text`
    font-size: 20px;
    line-height: 40px;
`;



