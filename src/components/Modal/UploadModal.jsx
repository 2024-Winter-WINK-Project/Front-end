import React, {useRef, useState} from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import done from "../../icons/done.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";


const UploadModal = ({onDataChange}) => {
    const URL = useRef(null);
    const modalRef = useRef(null);
    const [isBankNumUploaded, setIsBankNumUploaded] =
        useState(sessionStorage.getItem("bankAccountNumber") ? true : false);

    const closeModal = () => {
        onDataChange("uploadModal",false);
    }

    return (
        <div ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <styled.TitleBoxContainer>
                <styled.TitleBox>
                    <styled.TextBox style={{fontWeight: "bold"}}>정산링크 등록</styled.TextBox>
                </styled.TitleBox>
                <styled.CloseIcon src={close} onClick={closeModal}/>
            </styled.TitleBoxContainer>
            <styled.TextBox
                style={{fontSize: "19px", marginTop: "10px", textAlign: "left", width: "90%", lineHeight: "40px"}}>정산
                방식을 선택해
                주세요.
            </styled.TextBox>
            <styled.TransferURLBox>
                <styled.UploadURLBox>
                    <styled.TextContainer>
                        <styled.TextBox style={{fontSize: "17px", textAlign: "left"}}>카카오페이 송금코드 등록</styled.TextBox>
                        <Html5QrcodePlugin label="kakao"/>
                    </styled.TextContainer>
                    <styled.Line/>
                </styled.UploadURLBox>
                <styled.UploadURLBox>
                    <styled.TextContainer>
                        <styled.TextBox
                            style={{fontSize: "17px",
                                textAlign: "left"}}>
                            토스 송금코드 등록</styled.TextBox>
                        <Html5QrcodePlugin label="toss"/>
                    </styled.TextContainer>
                    <styled.Line/>
                </styled.UploadURLBox>
                <styled.UploadURLBox>
                    <styled.TextContainer>
                        <styled.TextBox style={{fontSize: "17px", textAlign: "left"}}>계좌번호 등록</styled.TextBox>
                        <div style={{width: "40%", height: "100%", display: "flex", alignItems: "center"}}>
                            <input
                                type="text"
                                placeholder="계좌번호 입력"
                                style={{
                                    border: "none",
                                    width: "100%",
                                    fontSize: "15px",
                                    outline: "none"
                                }}
                                onChange={(e)=>{
                                    sessionStorage.setItem("bankAccountNumber", e.target.value)
                                }}
                            />
                        </div>
                        <styled.UploadIcon src={isBankNumUploaded ? done : upload} onClick={() => {
                            if (sessionStorage.getItem('bankAccountNumber')) {
                                setIsBankNumUploaded(true);
                                alert('등록완료');
                            }
                        }}/>
                    </styled.TextContainer>
                    <styled.Line/>
                </styled.UploadURLBox>
            </styled.TransferURLBox>

            <styled.InfoBox>
                <styled.TextBox style={{
                    color: 'gray',
                    fontSize: '15px',
                    textAlign: 'left',
                    lineHeight: '20px',
                    fontWeight: 'bold'
                }}>
                    카카오페이 송금코드 등록방법
                </styled.TextBox>
                <styled.TextBox style={{
                    color: 'gray',
                    fontSize: '12px',
                    textAlign: 'left',
                    lineHeight: '20px',
                    marginBottom: '8px'
                }}>
                    카카오페이 앱 > 상단 메뉴 > 프로필 이미지 클릭
                </styled.TextBox>
                <styled.TextBox style={{
                    color: 'gray',
                    fontSize: '15px',
                    textAlign: 'left',
                    lineHeight: '20px',
                    fontWeight: 'bold'
                }}>
                    토스 송금코드 등록방법
                </styled.TextBox>
                <styled.TextBox style={{
                    color: 'gray',
                    fontSize: '12px',
                    textAlign: 'left',
                    lineHeight: '20px',
                    marginBottom: '8px'
                }}>
                    토스 앱 > 전체 > 송금 > 계좌 사진으로 보내기 > QR코드 발급
                </styled.TextBox>
                <styled.TextBox style={{color: 'gray', fontSize: '10px', textAlign: 'left', fontWeight: 'bold'}}>
                    * 카카오페이와 토스 송금코드는 해당 서비스 가입자만 이용 가능해요.
                </styled.TextBox>

            </styled.InfoBox>
        </div>
    );
};

export default UploadModal;
