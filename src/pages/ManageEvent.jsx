import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import TopBar from "../components/TopBar.jsx";
import LightBlueBox from "../components/LightBlueBoxSingleLine.jsx";
import LightBlueBoxSingleLine from "../components/LightBlueBoxSingleLine.jsx";
import LightBlueBoxDoubleLines from "../components/LightBlueBoxDoubleLines.jsx";
import KakaoMap from "../components/KakaoMap.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import MovingKakaoMap from "./MovingKakaoMap.jsx";

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
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    margin-bottom: 50%;
`;

const WrapperPC = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    
`;

const FormContainer = styled.div`
    width: 100%;
`;


const ManageEvent = () => {
    const location = useLocation();
    const xPosVal = location.state.xPos;
    const yPosVal = location.state.yPos;
    const pNameVal = location.state.pName;
    const eTitleVal = location.state.eTitle;
    const eSDateVal = location.state.eSDate;
    const eEDateVal = location.state.eEDate;
    const isManager = location.state.manager;




    return(
        <>
            <Mobile>
                <Wrapper>
                    <TopBar pageName={"모임 보기"} feature={"done"} isModalRequired={true}/>
                    {isManager ?
                        <FormContainer>
                            <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={false} eventTitle={eTitleVal}/>
                            <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                            <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                            <LightBlueBoxDoubleLines feature={"calendar"} firstLine={"모임 시작날짜"} secondLine={"모임 종료날짜"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"edit"} firstLine={"정산링크"} secondLine={"옆의 수정버튼을 눌러 변경할 수 있어요"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크 재발급"} secondLine={"초대링크는 최대 30분 간 유효해요"}></LightBlueBoxDoubleLines>
                        </FormContainer>
                        :
                        <FormContainer>
                            <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={false} eventTitle={eTitleVal}/>
                            <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                            <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                            <LightBlueBoxDoubleLines feature={"calendar"} firstLine={"모임 시작날짜"} secondLine={"모임 종료날짜"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"edit"} firstLine={"정산링크"} secondLine={"모임장 이외에는 링크를 볼 수만 있어요"}></LightBlueBoxDoubleLines>
                            {/*<LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크"} secondLine={"모임장 이외에는 생성이 불가해요"}></LightBlueBoxDoubleLines>*/}
                        </FormContainer>
                    }
                </Wrapper>
            </Mobile>

            <PC>
                <WrapperPC>
                    <TopBar pageName={"모임 보기"} feature={"done"} isModalRequired={true}/>
                    {isManager ?
                        <FormContainer>
                            <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={false} eventTitle={eTitleVal}/>
                            <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                            <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                            <LightBlueBoxDoubleLines feature={"calendar"} firstLine={"모임 시작날짜"} secondLine={"모임 종료날짜"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"edit"} firstLine={"정산링크"} secondLine={"옆의 수정버튼을 눌러 변경할 수 있어요"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크 재발급"} secondLine={"초대링크는 최대 30분 간 유효해요"}></LightBlueBoxDoubleLines>
                        </FormContainer>
                        :
                        <FormContainer>
                            <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={false} eventTitle={eTitleVal}/>
                            <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                            <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                            <LightBlueBoxDoubleLines feature={"calendar"} firstLine={"모임 시작날짜"} secondLine={"모임 종료날짜"}></LightBlueBoxDoubleLines>
                            <LightBlueBoxDoubleLines feature={"edit"} firstLine={"정산링크"} secondLine={"모임장 이외에는 링크를 볼 수만 있어요"}></LightBlueBoxDoubleLines>
                            {/*<LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크"} secondLine={"모임장 이외에는 생성이 불가해요"}></LightBlueBoxDoubleLines>*/}
                        </FormContainer>
                    }
                </WrapperPC>
            </PC>
        </>
    )
}

export default ManageEvent;
