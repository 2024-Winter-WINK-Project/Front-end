import React, {useRef, useState} from "react";
import * as styled from "./UploadModalStyles";
import OneButton from "../Button/OneButton.jsx";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";

const UploadModal = ({isOpen, content,onDataChange}) => {
    const URL = useRef(null);

    const sendDatatoParent = (event) => {
        onDataChange(event.target.id,event.target.value);
    }
    const closeModal = () => {
        onDataChange("modal",false);
    }
    const getURL = (newData) => {
        URL.current = newData;
    }
    return (
        isOpen && (
                <styled.ModalContainer>
                    <styled.ModalBoxContainer>
                        <styled.ModalContentContainer>
                            {content === "URL" ?
                                <styled.ModalContent>
                                    <styled.TitleBoxContainer>
                                        <styled.TitleBox>
                                            <styled.TextBox>정산링크 등록</styled.TextBox>
                                        </styled.TitleBox>
                                        <styled.CloseIcon src={close} onClick={closeModal}/>
                                    </styled.TitleBoxContainer>
                                    <styled.TextBox style={{fontSize : "19px", marginTop : "10px", textAlign : "left", width : "90%"}}>정산 방식을 선택해 주세요.</styled.TextBox>
                                    <styled.TransferURLBox>

                                        <styled.UploadURLBox>
                                            <styled.TextContainer>
                                                <styled.TextBox style={{fontSize : "17px", textAlign : "left"}}>카카오페이 송금코드 등록</styled.TextBox>
                                                <Html5QrcodePlugin onDataGet={sendDatatoParent}/>
                                            </styled.TextContainer>
                                            <styled.Line/>
                                        </styled.UploadURLBox>
                                        <styled.UploadURLBox>
                                            <styled.TextContainer>
                                                <styled.TextBox style={{fontSize : "17px", textAlign : "left"}}>토스 송금코드 등록</styled.TextBox>
                                                <Html5QrcodePlugin onDataGet={sendDatatoParent}/>
                                            </styled.TextContainer>
                                            <styled.Line/>
                                        </styled.UploadURLBox>
                                        <styled.UploadURLBox>
                                            <styled.TextContainer>
                                                <styled.TextBox style={{fontSize : "17px", textAlign : "left"}}>계좌번호 등록</styled.TextBox>
                                                <div style={{width : "40%", height : "100%", display : "flex", alignItems : "center"}}>
                                                    <input id="bankAccNum"
                                                           type="text"
                                                           placeholder="계좌번호를 입력하세요."
                                                           style={{
                                                               border: "none",
                                                               width: "100%",
                                                               fontSize : "15px",
                                                               outline : "none"
                                                           }}

                                                    />
                                                </div>
                                                <styled.UploadIcon src={upload} />
                                            </styled.TextContainer>
                                            <styled.Line/>
                                        </styled.UploadURLBox>
                                    </styled.TransferURLBox>

                                    <styled.InfoBox>
                                        <styled.TextBox style={{color:'gray', fontSize : '15px', textAlign : 'left',lineHeight : '20px', fontWeight :'bold'}}>
                                            카카오페이 송금코드 등록방법</styled.TextBox>
                                        <styled.TextBox style={{color:'gray', fontSize : '12px', textAlign : 'left',lineHeight : '20px', marginBottom : '8px'}}>
                                            카카오페이 앱 > 상단 메뉴 > 프로필 이미지 클릭</styled.TextBox>
                                        <styled.TextBox style={{color:'gray', fontSize : '15px', textAlign : 'left',lineHeight : '20px', fontWeight :'bold'}}>
                                            토스 송금코드 등록방법</styled.TextBox>
                                        <styled.TextBox style={{color:'gray', fontSize : '12px', textAlign : 'left',lineHeight : '20px', marginBottom : '8px'}}>
                                            토스 앱 > 전체 > 송금 > 계좌 사진으로 보내기 > QR코드 발급</styled.TextBox>
                                        <styled.TextBox style={{color:'gray', fontSize : '10px', textAlign : 'left', fontWeight :'bold'}}>
                                            * 카카오페이와 토스 송금코드는 해당 서비스 가입자만 이용 가능해요.</styled.TextBox>

                                    </styled.InfoBox>

                                </styled.ModalContent>
                            :
                                <styled.ModalContent>
                                    <p style={{color : "black"}}>{content}</p>
                                    <OneButton onClick={closeModal}
                                               buttonContent={"확인"}
                                    ></OneButton>
                                </styled.ModalContent>
                            }
                        </styled.ModalContentContainer>
                    </styled.ModalBoxContainer>
                </styled.ModalContainer>
        )
    );
};

export default UploadModal;
