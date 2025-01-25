import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import group_manager from "../../icons/group_manager.png";
import {useMediaQuery} from "react-responsive";
import location from "../../icons/location.png";
import calendar from "../../icons/calendar.png";
import add from "../../icons/add.png";
import edit from "../../icons/edit.png";
import done from "../../icons/done.png";
import search from "../../icons/search_w.png";
import {useNavigate} from "react-router-dom";

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

const Wrapper = styled.div`
    height: 70px;
    display: flex;
    justify-content: center;
`;

const LBBox = styled.a`
    border : none;
    border-radius: 10px;
    width: 90%;
    height: 60px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const LBText = styled.div`
    text-align: left;
    color : black;
    line-height: 30px;
`;

const LBTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

const LBIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const LBContainer = styled.div`
    width : 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputBox = styled.input`
    border: none;
    background-color: #0234A8;
    height: 70%;
    font-size: 18px;
    outline: none;
    color : white;
    width: 100%;
`;

const TextBox = styled.text`
    border: none;
    background-color: #0234A8;
    height: 70%;
    font-size: 20px;
    outline: none;
    color : white;
    width: 100%;
    display: flex;
    align-items: center;
`;

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
                <Wrapper style={{width : "100vw"}}>
                        {isBlank ?
                            //isBlank : 파란색 박스, 보통 제목이나 검색 박스로 활용됨
                            //true : 파란색 박스
                            <LBBox style={{
                                backgroundColor : "#0234A8",
                                boxShadow: "0 10px 3px -5px rgba(86, 86, 86, 0.30)"
                            }}>
                                {isSearchBox ?
                                    <LBContainer style={{width : "90%"}}>
                                        {isEditable ?
                                            <>
                                                <InputBox value={place} placeholder={"어디로 떠나볼까요?"} onChange={saveData}/>
                                                <LBIcon src={resIcon} onClick={sendDataToParent}/>
                                            </>
                                            :
                                            <>
                                                <InputBox value={place} placeholder={"어디로 떠나볼까요?"} onChange={saveData}/>
                                                <LBIcon src={resIcon} onClick={sendDataToParent}/>
                                            </>
                                        }

                                    </LBContainer>
                                    :
                                    <LBContainer style={{width : "90%"}}>
                                        {isEditable ?
                                            <>
                                                <LBTextContainer style={{width : "45%"}}>
                                                    <LBText style={{
                                                        width : "70%",
                                                        fontSize : '20px',
                                                        color : "white",
                                                    }}>{boxtitle}:</LBText>
                                                </LBTextContainer>
                                                <InputBox placeholder={"모임 제목을 입력해 주세요."} onChange={saveData2}/>
                                            </>
                                            :
                                            <>
                                                <LBTextContainer style={{width : "45%"}}>
                                                    <LBText style={{
                                                        width : "70%",
                                                        fontSize : '20px',
                                                        color : "white",
                                                    }}>{boxtitle}:</LBText>
                                                </LBTextContainer>
                                                <TextBox>{eventTitle}</TextBox>
                                            </>
                                        }
                                    </LBContainer>
                                }
                            </LBBox>
                            :
                            <>
                            {isNickName ?
                                <LBBox>
                                    <LBContainer>
                                        <LBTextContainer style={{width : "45%"}}>
                                            <LBText style={{
                                                width : "70%",
                                                fontSize : '20px',
                                                color : "white",
                                            }}>{boxtitle}:</LBText>
                                        </LBTextContainer>
                                        <InputBox placeholder={"닉네임을 입력해 주세요."} onChange={saveData3}/>

                                    </LBContainer>
                                </LBBox>
                                :
                                <LBBox href={dest}>
                                    <LBContainer>
                                        <LBTextContainer>
                                            <LBText style={{
                                                fontSize: '20px',
                                            }}>{boxtitle}</LBText>
                                        </LBTextContainer>
                                        <LBIcon src={resIcon}
                                                onClick={() => navigate(dest, {replace: true})}/>

                                    </LBContainer>
                                </LBBox>
                            }
                            </>
                        }
                </Wrapper>
        </>

    )
}

export default LightBlueBoxSingleLine;
