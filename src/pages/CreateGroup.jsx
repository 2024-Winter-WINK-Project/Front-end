import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import TopBar from "../components/TopBar.jsx";
import LightBlueBoxSingleLine from "../components/LightBlueBoxSingleLine.jsx";
import LightBlueBoxDoubleLines from "../components/LightBlueBoxDoubleLines.jsx";
import KakaoMap from "../components/KakaoMap.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

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


const CreateGroup = () => {


    const location = useLocation();
    const xPosVal = location.state.xPos;
    const yPosVal = location.state.yPos;
    const pNameVal = location.state.pName;
    const startDate = useRef(0);
    const endDate = useRef(0);
    const groupName = useRef("");
    const [currId, setCurrId] = useState(0);
    const handleDataChange2 = (newData) => {
        groupName.current = newData;
    }
    const handleDataChange3 = async (newData, newData2) => {
        startDate.current = newData;
        endDate.current = newData2;
    }
    const [isSubmitting, setIsSubmitting] =useState(false);
    const [submittingError, setSubmittingError] = useState(null);
    const handleSubmit = (e) =>{
        // e.preventDefault();

        axios
            .post("http://localhost:8000/groups", {
                id:currId,
                eventTitle:groupName.current.current,
                eventStartDate:startDate.current.current,
                eventEndDate:endDate.current.current,
                isManager:true,
                eventPlaceName:pNameVal,
                eventPlaceXPos:xPosVal,
                eventPlaceYPos:yPosVal
            })
            .then((res) => console.log(res));

    }

    useEffect(() => {
        fetch(`http://localhost:8000/groups?_sort=-id&_limit=1`)
            .then((response) => response.json())
            .then((json) => setCurrId(Number(json[0].id)+1))
            .catch((error) => console.log(error));

    }, []);


    return(
        <>
            <Mobile>
                <Wrapper>
                    <TopBar pageName={"모임 생성"} feature={"done"} isModalRequired={true} onDataChange={handleSubmit}/>
                    <FormContainer>
                        <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={true} onDataChange2={handleDataChange2}/>
                        <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                        <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                        <LightBlueBoxDoubleLines feature={"calendar"}
                                                 firstLine={"모임 시작날짜"}
                                                 secondLine={"모임 종료날짜"}
                                                 isEditable={true}
                                                 onDataChange={handleDataChange3}/>
                        <LightBlueBoxDoubleLines feature={"plus"} firstLine={"정산링크 등록"} secondLine={"나중에 설정에서 변경할 수 있어요"}></LightBlueBoxDoubleLines>
                        <LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크 생성"} secondLine={"초대링크는 최대 30분 간 유효해요"}></LightBlueBoxDoubleLines>
                    </FormContainer>
                </Wrapper>


            </Mobile>

            <PC>
                <WrapperPC>
                    <TopBar pageName={"모임 생성"} feature={"done"} isModalRequired={true}/>
                    <FormContainer>
                        <LightBlueBoxSingleLine feature={""} boxtitle={"모임명"} isEditable={true}/>
                        <LightBlueBoxSingleLine feature={"location"} style={{paddingTop : "none"}} boxtitle={"모임 장소"} to={"/movingmap"}/>
                        <KakaoMap xPos={xPosVal} yPos={yPosVal} placeName={pNameVal}/>
                        <LightBlueBoxDoubleLines feature={"calendar"} firstLine={"모임 시작날짜"} secondLine={"모임 종료날짜"}></LightBlueBoxDoubleLines>
                        <LightBlueBoxDoubleLines feature={"plus"} firstLine={"정산링크 등록"} secondLine={"나중에 설정에서 변경할 수 있어요"}></LightBlueBoxDoubleLines>
                        <LightBlueBoxDoubleLines feature={"plus"} firstLine={"초대링크 생성"} secondLine={"초대링크는 최대 30분 간 유효해요"}></LightBlueBoxDoubleLines>
                    </FormContainer>
                </WrapperPC>
            </PC>
        </>
    )
}

export default CreateGroup;
