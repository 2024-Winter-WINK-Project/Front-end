import styled from "styled-components";

export const modalOverlay = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    width: 100%;
    height: 100%;
    background : rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
`;

export const modalContents = styled.div`
    background: white;
    border-radius: 10px;
    border: 2px solid black;
    width: 90%;
    padding: 20px;
    position: relative;
    @media (min-width: 600px){
        width : 600px;
    }
`;

export const TitleBoxContainer = styled.div`
    width : 100%;
    height: 10%;
    display: flex;
    align-items: center;
    @media (min-width: 600px){
        width : 550px;
        height: 100px;
    }
`;

export const TitleBox = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;

`;
export const TextBox = styled.div`
    font-size: 25px;
    text-align: center;
`;

export const CloseIcon = styled.img`
    width: 30px;
    height: 30px;

`;

//송금코드 등록 박스
export const TransferURLBox = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

export const InfoBox = styled.div`
    width: 90%;
    margin-top: 20px;
`;

export const UploadURLBox = styled.li`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const TextContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`;

export const Line = styled.div`
    border : 0;
    height: 0;
    border-bottom : 1px solid black;
    width : 100%;
    
`;

export const UploadIcon = styled.img`
    width: 30px;
    height: 30px;
`;
