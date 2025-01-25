import styled from "styled-components";

export const BarContainer = styled.nav`
    background-color: white;
    opacity: 90%;
    width: 100vw;
    height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
`;

export const BarContentsContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    width: 90%;
`;

export const ButtonIcons = styled.img`
    width: 30px;
    height: 30px;
`;


export const TextWrapper = styled.div`
    width: 100%;
    display: flex;
`;

export const TextBox = styled.text`
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;
