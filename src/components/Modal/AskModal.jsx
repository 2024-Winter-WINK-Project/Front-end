import React, {useRef, useState} from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";
import OneButton from "../Button/OneButton";
import TwoButtons from "../Button/TwoButtons";

const AskModal = ({mode,onDataChange}) => {
    const closeModal = () => {
        onDataChange("doneModal",false);
    }

    return (
        <>
            <styled.TitleBoxContainer>
                <styled.TitleBox>
                    <styled.TextBox style={{fontWeight: "bold"}}>{mode}</styled.TextBox>
                </styled.TitleBox>
                <styled.CloseIcon src={close} onClick={closeModal}/>
            </styled.TitleBoxContainer>
            <div style={{display: "flex", alignItems: "center", height: "80px"}}>
                <styled.TextBox
                    style={{fontSize: "20px", textAlign: "left", width: "90%"}}>
                    {mode} 후에는 취소가 불가해요. 이대로 진행하시겠어요?
                </styled.TextBox>
            </div>

            <TwoButtons ButtonColor={"#F7E7E7"}
                        TextColor={"black"}
                        ButtonText1={"예"}
                        Dest={``}
                        ButtonColor2={"#E7EBF7"}
                        ButtonText2={"아니오"}
                        isModalRequired={true}
                        Dest2={``}/>
        </>
    );
};

export default AskModal;
