import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import group_manager from "../icons/group_manager.png";
import {useMediaQuery} from "react-responsive";
import location from "../icons/location.png";
import calendar from "../icons/calendar.png";
import add from "../icons/add.png";
import edit from "../icons/edit.png";
import done from "../icons/done.png";
import search from "../icons/search_w.png";
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

const LBBox = styled.div`
    border : none;
    border-radius: 10px;
    width: 90%;
    height: 60px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
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

const LightBlueBoxSingleLine = ({boxtitle, feature, to, popup, onDataChange, isEditable, eventTitle, isOut}) => {
    const iconList = [location,edit,search];
    const [place,setPlace] = useState("");
    const navigate = useNavigate();

    const saveData = event => {
        setPlace(event.target.value);
    }
    const sendDataToParent = () => {
        onDataChange(place);
    }
    let resIcon = null;
    let isBlank = false;
    let isPopup = false;
    let isSearchBox = false;
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

    return(
        <>
            <Mobile>
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
                                                <InputBox id={name} placeholder={"모임 제목을 입력해 주세요."}/>
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
                            <LBBox>
                                <LBContainer>
                                    <LBTextContainer>
                                        <LBText style={{
                                            fontSize : '20px',
                                        }}>{boxtitle}</LBText>
                                    </LBTextContainer>
                                    {isOut ?
                                        // isOut : 외부 사이트로 나가야 하는 경우
                                        // true : 외부 사이트로 이동
                                        <a href={dest}>
                                            <img alt={"아이콘"} src={resIcon} style={{
                                                backgroundImage : resIcon,
                                                width : "30px",
                                                height : "30px"
                                            }}/>
                                        </a>
                                        :
                                        // false : 내부 페이지 이동
                                        <LBIcon src={resIcon}
                                                onClick={() => navigate(dest, {replace : true})}/>
                                    }
                                </LBContainer>
                            </LBBox>
                        }
                </Wrapper>
            </Mobile>
            <PC>
                <Wrapper style={{width : "500px"}}>
                    {isBlank ?
                        //isBlank : 파란색 박스, 보통 제목이나 검색 박스로 활용됨
                        //true : 파란색 박스
                        <LBBox style={{
                            backgroundColor : "#0234A8",
                            boxShadow: "0 10px 3px -5px rgba(86, 86, 86, 0.30)"
                        }}>
                            {isSearchBox ?
                                //isSearchBox : 검색 박스 여부
                                //true : 검색 박스
                                <LBContainer style={{width : "90%"}}>
                                    <InputBox value={place}
                                              placeholder={"어디로 떠나볼까요?"}
                                              onChange={saveData}/>
                                    <LBIcon src={resIcon}
                                            onClick={sendDataToParent}/>
                                </LBContainer>
                                :
                                //false : 검색 기능이 없고, 텍스트 표시/ 편집 가능한 박스
                                <LBContainer style={{width : "90%"}}>
                                    {isEditable ?
                                        // isEditable : 편집 가능 여부
                                        // true : 모임장인 경우, 편집가능
                                        <>
                                            <LBTextContainer style={{width : "50%"}}>
                                                <LBText style={{
                                                    width : "50%",
                                                    fontSize : '20px',
                                                    color : "white",
                                                }}>{boxtitle}:</LBText>
                                            </LBTextContainer>
                                            <InputBox id={name} placeholder={"모임 제목을 입력해 주세요."}/>
                                        </>
                                        :
                                        // false : 모임 멤버인 경우, 편집 불가.
                                        <>
                                            <LBTextContainer style={{width : "50%"}}>
                                                <LBText style={{
                                                    width : "50%",
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
                        // false : 파란색 박스 아님. 일반 1줄짜리 하늘색 박스
                        <LBBox>
                            <LBContainer>
                                <LBTextContainer>
                                    <LBText style={{
                                        fontSize : '20px',
                                    }}>{boxtitle}</LBText>
                                </LBTextContainer>
                                {isOut ?
                                    // isOut : 외부 사이트로 나가야 하는 경우
                                    // true : 외부 사이트로 이동
                                    <a href={dest}>
                                        <img alt={"아이콘"} src={resIcon} style={{
                                            backgroundImage: resIcon,
                                            width: "30px",
                                            height: "30px"
                                        }}/>
                                    </a>
                                    :
                                    // false : 내부 페이지 이동
                                    <LBIcon src={resIcon}
                                            onClick={() => navigate(dest, {replace: true})}/>
                                }

                            </LBContainer>
                        </LBBox>
                    }
                </Wrapper>
            </PC>
        </>

    )
}

export default LightBlueBoxSingleLine;
