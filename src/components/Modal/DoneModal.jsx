import React, {useRef, useState} from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";
import OneButton from "../Button/OneButton";

const DoneModal = ({onDataChange}) => {
    const URL = useRef(null);

    const sendDatatoParent = (event) => {
        onDataChange(event.target.id,event.target.value);
    }
    const closeModal = () => {
        onDataChange("doneModal",false);
    }
    const getURL = (newData) => {
        URL.current = newData;
    }
    return (
        <>
            <styled.TitleBoxContainer>
                <styled.TitleBox>
                    <styled.TextBox style={{fontWeight : "bold"}}>모임 등록</styled.TextBox>
                </styled.TitleBox>
                <styled.CloseIcon src={close} onClick={closeModal}/>
            </styled.TitleBoxContainer>
            <styled.TextBox style={{fontSize: "20px", marginTop: "10px", textAlign: "left", width: "90%", lineHeight :"80px"}}>
                모임 등록을 완료했어요.
            </styled.TextBox>
            <OneButton ButtonColor="#E7EBF7"
                       ButtonText1="홈으로"
                       TextColor={"Black"}
                       Dest={"/"}/>

        </>
    );
};

export default DoneModal;
