import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (min-width: 600px){
        margin-top: 10vh;
        width : 600px;
    }

`;

export const FormContainer = styled.div`
    width : 90%;
    @media (min-width: 600px){
        width: 550px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const DivideLine = styled.hr`
    border: 0;
    width: 95%;
    height: 1px;
    background-color: gray;
`;

export const FormBoxContainer =styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    @media (max-width: 599px){
        width: 100%;

    }
`;

export const TextWrapper = styled.div`
    width : 100%;
    @media (min-width: 600px){
        width: 550px;
    }
`;
