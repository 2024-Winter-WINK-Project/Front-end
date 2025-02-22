import React from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";

import OneButton from "../Button/OneButton";

const DoneModal = ({onDataChange, isNotify}) => {
    const closeModal = () => {
        onDataChange("doneModal",false);
    }

    return (
        <>
            {isNotify === true ?
                <>
                    <styled.TitleBoxContainer>
                        <styled.TitleBox>
                            <styled.TextBox style={{fontWeight: "bold"}}>정산 관련 안내문</styled.TextBox>
                        </styled.TitleBox>
                        <styled.CloseIcon src={close} onClick={closeModal}/>
                    </styled.TitleBoxContainer>
                    <styled.TextBox style={{
                        fontSize: "18px",
                        marginTop: "10px",
                        textAlign: "justify",
                        width: "95%",
                        lineHeight: "30px"
                    }}>
                        정산 금액이 0보다 작아질 경우 모임장이 모임 멤버에게 돈을 돌려줘야 하는데,
                        기술적 문제와 금전적 문제로 인해 아직 이용할 수 없습니다. 사용자 여러분의 양해 부탁드립니다.
                    </styled.TextBox>
                </>
                :
                <>
                    <styled.TitleBoxContainer>
                        <styled.TitleBox>
                            <styled.TextBox style={{fontWeight: "bold"}}>모임 등록</styled.TextBox>
                        </styled.TitleBox>
                        <styled.CloseIcon src={close} onClick={closeModal}/>
                    </styled.TitleBoxContainer>
                    <styled.TextBox style={{
                        fontSize: "20px",
                        marginTop: "10px",
                        textAlign: "left",
                        width: "90%",
                        lineHeight: "80px"
                    }}>
                        모임 등록을 완료했어요.
                    </styled.TextBox>
                    <OneButton ButtonColor="#E7EBF7"
                               ButtonText1="홈으로"
                               TextColor={"Black"}
                               Dest={"/"}/>
                </>
            }


        </>
    );
};

export default DoneModal;
