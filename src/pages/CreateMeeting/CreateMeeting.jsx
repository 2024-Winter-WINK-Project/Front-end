import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import axios from "axios";
import UploadModal from "../../components/Modal/UploadModal";
import * as styled from "./styles";
import DarkBlueBox from "../../components/Box/DarkBlueWriteBox";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import close from "../../icons/close.png";
import DoneModal from "../../components/Modal/DoneModal";


const CreateMeeting = () => {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [doneModalOpen, setDoneModalOpen] = useState(false);
    const navigate = useNavigate();
    const place = JSON.parse(sessionStorage.getItem('place')) ?
        {id : parseInt(JSON.parse(sessionStorage.getItem('place')).id),
            address : JSON.parse(sessionStorage.getItem('place')).address,
            latitude : parseFloat(JSON.parse(sessionStorage.getItem('place')).latitude),
            longitude : parseFloat(JSON.parse(sessionStorage.getItem('place')).longitude),
            name : JSON.parse(sessionStorage.getItem('place')).name}
        :
        {id : 126997376109, address : '서울 성북구 정릉로 77', latitude : 37.61099, longitude : 126.99726, name : '국민대학교'};
    const handleDataChange = async (id,value) => {
        console.log(id, ":",value);
        if (id === "uploadModal"){
            setUploadModalOpen(value);
        }
        else if(id === "doneModal"){
            setDoneModalOpen(value);
        }
        else{
            sessionStorage.setItem(id,`${value}`);
        }
    }
    const sessionStorageClear = (responseCode) => {
        sessionStorage.removeItem("bankAccountNumber");
        sessionStorage.removeItem("kakaoURL");
        sessionStorage.removeItem("tossURL");
        sessionStorage.removeItem("meetingStartTime");
        sessionStorage.removeItem("meetingEndTime");
        sessionStorage.removeItem("meetingName");
        sessionStorage.removeItem("meetingNickname");
        sessionStorage.removeItem("place");
        sessionStorage.removeItem("placeSearch");
        if (responseCode === 401){
            sessionStorage.removeItem("userId");
        }
    }
    const handleSubmit = (e) =>{
        // e.preventDefault();
        if(
            !(sessionStorage.getItem("meetingName") &&
            sessionStorage.getItem("meetingStartTime") &&
            sessionStorage.getItem("meetingEndTime") &&
            JSON.parse(sessionStorage.getItem("place")))
            || !(sessionStorage.getItem("kakaoURL")||
                sessionStorage.getItem("tossURL")||
                sessionStorage.getItem("bankAccountNumber"))
        )
        {
            alert("모임 가입에 필요한 필수 정보를 입력해 주세요.");
        }
        else{
            axios(`http://localhost:8080/meetings?nickname=${sessionStorage.getItem("meetingNickname")}`, {
                method : 'post',
                headers : {
                    Authorization : `Bearer ${document.cookie}`,
                    withCredentials : true
                },
                data : {
                    name : sessionStorage.getItem("meetingName"),
                    description : "",
                    startTime : sessionStorage.getItem("meetingStartTime"),
                    endTime : sessionStorage.getItem("meetingEndTime"),
                    ownerId : parseInt(sessionStorage.getItem("userId")),
                    place : JSON.parse(sessionStorage.getItem("place")),
                    settlement : {
                        accountNumber : sessionStorage.getItem("bankAccountNumber"),
                        kakaoPayString : sessionStorage.getItem("kakaoURL"),
                        tossPayString : sessionStorage.getItem("tossURL"),
                    }
                }
            })
                .then(res=>{
                    console.log(res.status);
                    if (res.status === 200){
                        alert("모임 등록을 완료했어요. 확인 버튼을 누르면 홈으로 이동해요.");
                        sessionStorageClear(res.status);
                        navigate(`/home/${sessionStorage.getItem('userId')}`);
                    }
                })
                .catch(e=>{
                    console.log(e);
                    if (e.status === 401){
                        alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                        sessionStorageClear(e.status);
                        navigate('/login');
                    }
                    else{
                        alert("모임 등록에 실패했어요.");
                    }

                });
        }
    }
    return (
        <styled.BodyContainer>
            <TopNavBar pageName={"모임 생성"}
                       feature={"done"}
                       isBackRequired={true}
                       isModalRequired={true}
                       onDataChange={handleSubmit}
                       dest={"/"}/>
            <styled.FormContainer>
                <DarkBlueWriteBox feature={""}
                                  boxTitle={"모임명"}
                                  eventTitle={"모임 제목을 입력해 주세요."}
                                  onDataChange={handleDataChange}/>
                <LightBlueWriteBox feature={"nickname"}
                                   boxtitle={"닉네임"}
                                   onDataChange={handleDataChange}/>
                <LightBlueWriteBox feature={"location"}
                                   style={{paddingTop: "none"}}
                                   boxtitle={"모임 장소"}
                                   page={"/movingkakaomap"}/>
                <KakaoMap lat={place.latitude}
                          lon={place.longitude}
                          pName={place.name}/>
                <DoubleColumnsBox feature={"calendar"}
                                  firstLine={"모임 시작날짜"}
                                  secondLine={"모임 종료날짜"}
                                  isEditable={true}
                                  onDataChange={handleDataChange}/>
                <DoubleColumnsBox feature={"plus"}
                                  firstLine={"정산링크 등록"}
                                  secondLine={"모임 생성 완료 후에는 수정이 불가해요."}
                                  isEditable={false}
                                  onDataChange={handleDataChange}/>
                <div onClick={(e) => e.stopPropagation()}>
                    <ModalTemplate isOpen={uploadModalOpen}>
                        <UploadModal onDataChange={handleDataChange}/>
                    </ModalTemplate>
                </div>
                <ModalTemplate isOpen={doneModalOpen} onClose={() => setDoneModalOpen(false)}>
                    <DoneModal onDataChange={() => setDoneModalOpen(false)}/>
                </ModalTemplate>
            </styled.FormContainer>
        </styled.BodyContainer>
    )
}

export default CreateMeeting;
