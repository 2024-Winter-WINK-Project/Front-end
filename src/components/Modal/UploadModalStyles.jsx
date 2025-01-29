import styled from "styled-components";

//모달 전체
export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color : rgb(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: fixed;
    margin-top: -10vh;
`;

// 모달 흰박스 위치..?
export const ModalBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 모달 흰박스
export const ModalContentContainer = styled.div`
    width : 90%;
    height: 65%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (min-width : 600px) {
        width : 500px;
    }
`;



export const ModalContent = styled.div`
    width : 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TitleBoxContainer = styled.div`
    width : 90%;
    height: 10%;
    display: flex;
    align-items: center;
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
    height: 40%;
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
