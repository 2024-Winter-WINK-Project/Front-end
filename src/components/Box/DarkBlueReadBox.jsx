import React, {useEffect, useRef, useState} from "react";
import group_manager from "../../icons/group_manager.png";
import location from "../../icons/location.png";
import calendar from "../../icons/calendar.png";
import add from "../../icons/add.png";
import edit from "../../icons/edit.png";
import done from "../../icons/done.png";
import search from "../../icons/search_w.png";
import {useNavigate} from "react-router-dom";
import * as styled from "./styles";

const LightBlueBoxSingleLine = ({boxtitle, feature, to, popup, onDataChange, onDataChange2, isEditable, eventTitle}) => {
    const iconList = [location,edit,search];
    const [place,setPlace] = useState();
    const navigate = useNavigate();
    const groupName = useRef(null);
    const nickName = useRef(null)
    const saveData = event => {
        setPlace(event.target.value);
    }
    const saveData2 = event => {
        groupName.current = event.target.value;
        sendDataToParent2();
    }

    const saveData3 = event => {
        nickName.current = event.target.value;
        sendDataToParent3();
    }
    const sendDataToParent = () => {
        onDataChange(place);
    }

    const sendDataToParent2 = () => {
        onDataChange2(groupName);
    }

    const sendDataToParent3 = () => {
        onDataChange2(nickName);
    }

    let resIcon = null;
    let isBlank = false;
    let isPopup = false;
    let isSearchBox = false;
    let isNickName = false;
    let dest = null;
    if (to !== null){
        dest = to;
        isPopup = false;
    }
    else if (popup !== null){
        dest = popup;
        isPopup = true;
    }



    return(
        <>
            <styled.BoxContainerSmall>
                {/*파란색 박스*/}
                <styled.BoxContentsContainerSmall style={{
                        backgroundColor : "#0234A8",
                        boxShadow: "0 10px 3px -5px rgba(86, 86, 86, 0.30)"
                    }}>
                        {feature === "search"?
                            // 검색 박스, 읽기 전용
                            <styled.InputContainer style={{width : "90%"}}>
                                <styled.InputBox value={place} placeholder={"어디로 떠나볼까요?"} onChange={saveData}/>
                                <styled.BoxIcon src={resIcon} onClick={sendDataToParent}/>
                            </styled.InputContainer>
                            :
                            // 모임 제목 입력하는 박스, 읽기 전용
                            <styled.InputContainer style={{width : "90%"}}>
                                <styled.TextContainer>
                                    <styled.TextBox style={{
                                        width : "60px",
                                        fontSize : '20px',
                                        color : "white",
                                    }}>{boxtitle}</styled.TextBox>
                                </styled.TextContainer>
                                <styled.TextBox style={{
                                    width :"100%",
                                    fontSize : "20px",
                                    color :"white"}}>{eventTitle}</styled.TextBox>
                            </styled.InputContainer>
                        }
                    </styled.BoxContentsContainerSmall>

            </styled.BoxContainerSmall>
        </>

    )
}

export default LightBlueBoxSingleLine;
