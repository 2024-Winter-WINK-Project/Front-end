import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import ListBox from "../../components/Box/ListBox";
import TwoButtons from "../../components/Button/TwoButtons";
import OneButton from "../../components/Button/OneButton";


const EditMeeting = () => {
    const {meetingId} = useParams();
    const [meetingData, setMeetingData] = useState();
    const [placeData, setPlaceData] = useState();
    const [memberData, setMemberData] = useState();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMeetingData(json)
            })
            .catch((error) => {
                console.log(error)
            });

        fetch(`http://localhost:8000/places?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setPlaceData(json)
            })
            .catch((error) => {
                console.log(error)
            });

        fetch(`http://localhost:8000/members?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMemberData(json)
            })
            .catch((error) => {
                console.log(error)
            });

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
    }, [lat,lon]);

    if(meetingData && placeData && memberData){
        Object.assign(meetingData[0],placeData[0],memberData[0]);
    }

    const handleDataChange = async (id,value) => {
        console.log(id, ":",value);
        // if (id === "modal"){
        //     setOpen(value);
        // }
    }

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id}>
                <TopNavBar pageName={"모임 편집"}
                           feature={"done"}
                           isModalRequired={true}/>
                <styled.FormContainer>
                    <DarkBlueWriteBox feature={""}
                                     boxTitle={"모임명"}
                                     eventTitle={elements.title}
                                     onDataChange={handleDataChange}/>
                    <LightBlueWriteBox feature={"location"}
                                       style={{paddingTop: "none"}}
                                       boxtitle={"모임 장소"}
                                       page={"/movingkakaomap"}/>
                    <KakaoMap lat={elements.placeLat}
                              lon={elements.placeLon}
                              pName={elements.placeName}/>
                    <DoubleColumnsBox feature={"calendar"}
                                      firstLine={"모임 시작날짜"}
                                      secondLine={"모임 종료날짜"}
                                      isEditable={true}
                                      startDate={elements.startDate}
                                      endDate={elements.endDate}/>
                </styled.FormContainer>
            </styled.BodyContainer>
        ))}
        </>
    )
}

export default EditMeeting;
