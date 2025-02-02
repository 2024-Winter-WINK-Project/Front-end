import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (min-width: 600px){
        width : 600px;
    }

`;

export const ContentContainer = styled.div`
    width : 90%;
`;

export const FormContainer = styled.div`
    width : 90%;
    @media (min-width: 600px){
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
