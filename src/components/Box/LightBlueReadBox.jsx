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

    if (feature === "location"){
        resIcon = iconList[0];
        isBlank = false;
    }
    else if (feature === "search"){
        resIcon = iconList[2];
        isBlank = true;
        isSearchBox = true;
    }
    else if (feature === "edit"){
        resIcon = iconList[1];
        isBlank = false;
    }
    else if (feature === ""){
        isBlank = true;
    }
    else if (feature === "nickName"){
        isBlank = false;
        isNickName = true;
    }

    return(
            <>
                {isNickName ?
                    <styled.BoxContentsContainer>
                        <styled.InputContainer>
                            <styled.TextContainer style={{width : "45%"}}>
                                <LBText style={{
                                    width : "70%",
                                    fontSize : '20px',
                                    color : "white",
                                }}>{boxtitle}:</LBText>
                            </styled.TextContainer>
                            <styled.InputBox placeholder={"닉네임을 입력해 주세요."} onChange={saveData3}/>

                        </styled.InputContainer>
                    </styled.BoxContentsContainer>
                    :
                    <styled.BoxContentsContainer href={dest}>
                        <styled.InputContainer>
                            <styled.TextContainer>
                                <styled.TextBox style={{
                                    fontSize: '20px',
                                }}>{boxtitle}</styled.TextBox>
                            </styled.TextContainer>
                            <styled.BoxIcon src={resIcon}
                                            onClick={() => navigate(dest, {replace: true})}/>

                        </styled.InputContainer>
                    </styled.BoxContentsContainer>
                }

            </>

    )
}

export default LightBlueBoxSingleLine;
