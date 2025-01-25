import styled from "styled-components";

export const BarContainer = styled.nav`
    background-color: white;
    width: 100vw;
    height: 9vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -10px 5px -4px rgba(86, 86, 86, 0.20);
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
`;

export const BarContentsContainer = styled.div`
    background-color: white;
    display: flex;
    width: 90%;
`;

export const ButtonContainer = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ButtonIcons = styled.img`
    width: 25px;
    height: 25px;
`;

export const ButtonStyles = styled.div`
    width: 100%;
    height: 25px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-align: center;
    font-size: 13px;
`;


