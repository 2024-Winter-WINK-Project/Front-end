import React, {useEffect, useRef, useState} from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";
import OneButton from "../Button/OneButton";
import axios from "axios";
import {useParams} from "react-router-dom";

const InviteLinkModal = ({onDataChange}) => {
    const [meetingData, setMeetingData] = useState();
    const [invitation, setInvitation] = useState();
    const {meetingId} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const getMeetingData = await axios.get(`http://localhost:8000/meeting?id=${meetingId}`);
            if (getMeetingData !== undefined) {
                setInvitation(getMeetingData.data[0].invitationLink);
            }

        }
        fetchData();
    },[]);
    console.log(invitation);
    const closeModal = () => {
        onDataChange("doneModal",false);
    }
    const handleCopy = async () => {
        try {
            await window.navigator.clipboard.writeText(invitation);
            alert('링크가 복사되었습니다.');
        } catch (e) {
            console.error(e);
            alert('클립보드 복사에 실패했습니다.');
        }
    };

    return (
        <>
            <styled.TitleBoxContainer>
                <styled.TitleBox>
                    <styled.TextBox style={{fontWeight : "bold"}}>초대링크 생성</styled.TextBox>
                </styled.TitleBox>
                <styled.CloseIcon src={close} onClick={closeModal}/>
            </styled.TitleBoxContainer>
            <styled.TextBox style={{fontSize: "20px", marginTop: "10px", textAlign: "left", width: "90%", lineHeight :"80px"}}>
                초대 링크 생성이 완료되었어요.
            </styled.TextBox>
            <div id={invitation} onClick={handleCopy}>
                <OneButton ButtonColor="#E7EBF7"
                           ButtonText1="클립보드에 복사하기"
                           TextColor={"Black"}
                           isCopyRequired={true}/>
            </div>


        </>
    );
};

export default InviteLinkModal;
