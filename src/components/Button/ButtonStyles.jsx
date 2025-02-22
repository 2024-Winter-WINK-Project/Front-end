import styled from "styled-components";

export const ButtonContainer = styled.div`
    background-color: white;
    display: flex;
    width: 100%;
    // 모달창 버튼크기는 80%
    height: 50px;
    margin-top : 10px;
    text-align: center;
    @media (min-width: 600px){
        width : 550px;
    }
`;

export const ButtonContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    border-radius: 10px;
`;

export const OneButton = styled.button`
    width: 90%;
    height: 100%;
    color: white;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;



export const TwoButtons = styled.button`
    width: 80%;
    height: 100%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const TextBox = styled.text`
    font-size: 15px;
    color: black;
`;

export const Icon = styled.img`
    width: 30px;
    height: 30px;
`;
