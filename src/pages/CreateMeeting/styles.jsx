import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top : 10vh;
    @media (max-height: 740px){
        min-height: 120vh;
    }
    @media (min-width: 600px){
        width : 600px;
    }
`;

export const BodyContainerM = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top : 10vh;
    @media (max-height: 740px){
        min-height: 135vh;
    }
    @media (min-width: 600px){
        width : 600px;
    }
`;

export const FormContainer = styled.div`
    width : 90%;
    @media (min-width: 600px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;


