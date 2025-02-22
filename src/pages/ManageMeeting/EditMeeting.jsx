import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import * as SStorageCleaner from "../../components/Session/SessionStorageCleaner";
import * as ValuesCheck from "../../components/Others/ValuesCheck";

const EditMeeting = () => {
    const [meetingData, setMeetingData] = useState();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        ValuesCheck.ValuesCheck("isOwner",params.skey);
        const fetchData = async () => {
            const getMeetingData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}`,

            });

            if(getMeetingData.status === 200)
            {
                var tmpMeetingData = [];
                tmpMeetingData.push(getMeetingData.data);
                setMeetingData(tmpMeetingData);
            }

            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude); // 경도
                });
            }

            else{
                alert("현재 위치를 찾을 수 없어요. 위치 권한을 다시 설정해 보세요.");
            }
        }
        fetchData();

    }, [lat,lon]);

    const handleSubmit = (e) =>{
        // e.preventDefault();
        let editedData = {};
        let isEmpty = true;
        if (sessionStorage.getItem("meetingName") === '' ||
            sessionStorage.getItem("meetingName") === null){
            editedData.name = meetingData[0].name;

        }
        else{
            editedData.name = sessionStorage.getItem("meetingName");
            isEmpty = false;
        }

        if (sessionStorage.getItem("meetingStartTime") === "NaN-0NaN-0NaNT0NaN:0NaN:00" ||
            sessionStorage.getItem("meetingStartTime") === "" ||
            sessionStorage.getItem("meetingStartTime") === null){
            editedData.startTime = meetingData[0].startTime;
        }
        else{
            editedData.startTime = sessionStorage.getItem("meetingStartTime");
            isEmpty = false;
        }

        if (sessionStorage.getItem("meetingEndTime") === "NaN-0NaN-0NaNT0NaN:0NaN:00" ||
            sessionStorage.getItem("meetingEndTime") === "" ||
            sessionStorage.getItem("meetingEndTime") === null){
            editedData.endTime = meetingData[0].endTime;
        }
        else{
            editedData.endTime = sessionStorage.getItem("meetingEndTime");
            isEmpty = false;
        }

        if (sessionStorage.getItem("place") === "" ||
            sessionStorage.getItem("place") === null){
            editedData.place = meetingData[0].place;
        }
        else{
            editedData.place = JSON.parse(sessionStorage.getItem("place"));
            isEmpty = false;
        }
        if (isEmpty === true){
            alert("편집할 내용을 입력해 주세요.");
        }
        else{
            axios(`http://localhost:8080/meetings/${meetingData[0].id}`, {
                method : 'put',
                headers : {
                    Authorization : `Bearer ${document.cookie}`,
                    withCredentials : true
                },
                data : {
                    name : sessionStorage.getItem("meetingName"),
                    startTime : sessionStorage.getItem("meetingStartTime"),
                    endTime : sessionStorage.getItem("meetingEndTime"),
                    place : JSON.parse(sessionStorage.getItem("place")),
                }
            })

                .then(res=>{
                    if (res.status === 200){
                        alert("모임 편집을 완료했어요. 확인 버튼을 누르면 모임조회 페이지로 이동해요.");
                        SStorageCleaner.SessionStorageCleaner(res.status);
                        navigate(`/managemeeting/${meetingData[0].id}/${params.skey}`);
                    }
                })
                .catch(e=>{
                    if (e.status === 401){
                        alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                        SStorageCleaner.SessionStorageCleaner(e.status);
                        navigate('/');
                    }
                    else{
                        alert("모임 편집에 실패했어요.");
                    }

                });
        }

    }


    const handleDataChange = async (id,value) => {
        if (id === "modal"){
            setOpen(value);
        }
        else{
            sessionStorage.setItem(id,`${value}`);
        }
    }

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id}>
                <TopNavBar pageName={"모임 편집"}
                           feature={"done"}
                           onDataChange={handleSubmit}
                           isModalRequired={true}/>
                <styled.FormContainer>
                    <DarkBlueWriteBox feature={""}
                                     boxTitle={"모임명"}
                                     eventTitle={elements.name}
                                     onDataChange={handleDataChange}/>
                    <LightBlueWriteBox feature={"location"}
                                       style={{paddingTop: "none"}}
                                       boxtitle={"모임 장소"}
                                       page={"/movingkakaomap"}/>
                    <KakaoMap lat={sessionStorage.getItem('place') ?
                                  parseFloat(JSON.parse(sessionStorage.getItem('place')).latitude)
                                :
                                elements.place.latitude}
                              lon={sessionStorage.getItem('place') ?
                                  parseFloat(JSON.parse(sessionStorage.getItem('place')).longitude)
                                  :
                                  elements.place.longitude}
                              pName={sessionStorage.getItem('place') ?
                                  JSON.parse(sessionStorage.getItem('place')).name
                                :
                                  elements.place.name}/>
                    <DoubleColumnsBox feature={"calendar"}
                                      firstLine={"모임 시작날짜"}
                                      secondLine={"모임 종료날짜"}
                                      isEditable={true}
                                      startDate={sessionStorage.getItem('meetingStartTime') ?
                                          sessionStorage.getItem('meetingStartTime')
                                          :
                                          elements.startTime}
                                      endDate={sessionStorage.getItem('meetingEndTime') ?
                                          sessionStorage.getItem('meetingEndTime')
                                          :
                                          elements.endTime}/>
                </styled.FormContainer>
            </styled.BodyContainer>
        ))}
        </>
    )
}

export default EditMeeting;
