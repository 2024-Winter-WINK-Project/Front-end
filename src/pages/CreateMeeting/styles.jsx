import styled from "styled-components";

export const BodyContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 600px){
        width : 600px;
        padding-top: 10vh;
        padding-bottom: 10vh;
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


