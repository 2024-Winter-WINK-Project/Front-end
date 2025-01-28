import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import OneButton from "../Button/OneButton.jsx";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";


export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}

//모달 전체
const ModalContainer = styled.div`
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
const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 모달 흰박스
const ModalContentContainer = styled.div`
    width : 90%;
    height: 65%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;



const ModalContent = styled.div`
    width : 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleBoxContainer = styled.div`
    width : 90%;
    height: 10%;
    display: flex;
    align-items: center;
`;

const TitleBox = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;

`;
const Text = styled.div`
    font-size: 25px;
    text-align: center;
`;

const CloseIcon = styled.img`
    width: 30px;
    height: 30px;

`;

//송금코드 등록 박스
const TransferURLBox = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const InfoBox = styled.div`
    width: 90%;
    margin-top: 20px;
`;

const UploadURLBox = styled.li`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`;

const Line = styled.div`
    border : 0;
    height: 0;
    border-bottom : 1px solid black;
    width : 100%;
    
`;

const UploadIcon = styled.img`
    width: 30px;
    height: 30px;
`;



const UploadModal = ({isOpen, content,onDataChange, onDataChange2}) => {
    const URL = useRef(null);
    const closeModal = () => {
        onDataChange(false);
        onDataChange2(URL);
    }
    const getURL = (newData) => {
        URL.current = newData;
    }
    return (
        isOpen && (
        <>
            <Mobile>
                <ModalContainer>
                    <ModalWrapper>
                        <ModalContentContainer>
                            {content === "sendMoney" ?
                                <ModalContent>
                                    <TitleBoxContainer>
                                        <TitleBox>
                                            <Text>정산링크 등록</Text>
                                        </TitleBox>
                                        <CloseIcon src={close} onClick={closeModal}/>
                                    </TitleBoxContainer>
                                    <Text style={{fontSize : "19px", marginTop : "10px", textAlign : "left", width : "90%"}}>정산 방식을 선택해 주세요.</Text>
                                    <TransferURLBox>

                                        <UploadURLBox>
                                            <ContentWrapper>
                                                <Text style={{fontSize : "17px", textAlign : "left"}}>카카오페이 송금코드 등록</Text>
                                                <Html5QrcodePlugin onDataGet={getURL}/>
                                            </ContentWrapper>
                                            <Line/>
                                        </UploadURLBox>
                                        <UploadURLBox>
                                            <ContentWrapper>
                                                <Text style={{fontSize : "17px", textAlign : "left"}}>토스 송금코드 등록</Text>
                                                {/*<Html5QrcodePlugin/>*/}
                                            </ContentWrapper>
                                            <Line/>
                                        </UploadURLBox>
                                        <UploadURLBox>
                                            <ContentWrapper>
                                                <Text style={{fontSize : "17px", textAlign : "left"}}>계좌번호 등록</Text>
                                                <UploadIcon src={upload}/>

                                            </ContentWrapper>
                                            <Line/>
                                        </UploadURLBox>
                                    </TransferURLBox>

                                    <InfoBox>
                                        <Text style={{color:'gray', fontSize : '15px', textAlign : 'left',lineHeight : '20px', fontWeight :'bold'}}>
                                            카카오페이 송금코드 등록방법</Text>
                                        <Text style={{color:'gray', fontSize : '12px', textAlign : 'left',lineHeight : '20px', marginBottom : '8px'}}>
                                            카카오페이 앱 > 상단 메뉴 > 프로필 이미지 클릭</Text>
                                        <Text style={{color:'gray', fontSize : '15px', textAlign : 'left',lineHeight : '20px', fontWeight :'bold'}}>
                                            토스 송금코드 등록방법</Text>
                                        <Text style={{color:'gray', fontSize : '12px', textAlign : 'left',lineHeight : '20px', marginBottom : '8px'}}>
                                            토스 앱 > 전체 > 송금 > 계좌 사진으로 보내기 > QR코드 발급</Text>
                                        <Text style={{color:'gray', fontSize : '10px', textAlign : 'left', fontWeight :'bold'}}>
                                            * 카카오페이와 토스 송금코드는 해당 서비스 가입자만 이용 가능해요.</Text>

                                    </InfoBox>



                                </ModalContent>
                            :
                                <ModalContent>
                                    <p style={{color : "black"}}>{content}</p>
                                    <OneButton onClick={closeModal}
                                               buttonContent={"확인"}
                                    ></OneButton>
                                </ModalContent>
                            }
                        </ModalContentContainer>
                    </ModalWrapper>
                </ModalContainer>
            </Mobile>
            <PC>
                <ModalContainer>
                    <ModalWrapper style={{width : '500px'}}>
                        <ModalContentContainer>
                            <ModalContent>
                                <p style={{color : "black"}}>{content}</p>
                                <OneButton></OneButton>
                            </ModalContent>
                        </ModalContentContainer>
                    </ModalWrapper>
                </ModalContainer>
            </PC>
        </>
        )
    );
};

export default UploadModal;
