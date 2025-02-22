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
                        정산 기능은 송금코드나 계좌번호 등으로 구현이 가능하나,
                        모임장이 오히려 돈을 나누어 줘야 하는 상황에서는 멤버들이 모두 계좌 정보를 등록하고,
                        오픈 뱅킹 API 등을 이용해서 송금을 처리해야 합니다.
                    </styled.TextBox>
                    <styled.TextBox style={{fontSize: "18px", marginTop: "10px", textAlign: "justify", width: "95%", lineHeight: "30px"}}>
                     다만 이를 이용하기 위해서는 사업자 등록번호가 필요하고, 금전적으로 부담이 되는 비용이 들어 미처 구현하지 못했습니다. 이용자 여러분의 양해 바랍니다.
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
