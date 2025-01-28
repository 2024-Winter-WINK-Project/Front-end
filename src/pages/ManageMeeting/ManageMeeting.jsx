import React, {useEffect, useLayoutEffect, useState} from "react";
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


const ManageMeeting = () => {
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

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainerM key={elements.id}>
                {elements.isManager ?
                    // isManager : 모임장인 경우
                    // true : 모임장
                    <>
                        <TopNavBar pageName={"모임 조회 및 편집"}
                                   feature={"done"}
                                   isModalRequired={true}/>
                        <styled.FormContainer>
                            <DarkBlueReadBox feature={""}
                                              boxtitle={"모임명"}
                                              eventTitle={elements.title}/>
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"모임 장소 길찾기"}
                                                    to={"https://map.kakao.com/link/from/현재위치," + lat +","+ lon + "/to/" + elements.placeName +","+ elements.placeLat +","+ elements.placeLon}
                            />
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"모임 장소 편집"}
                                                    to={"/movingkakaomap"}
                            />
                            <KakaoMap lat={elements.placeLat}
                                      lon={elements.placeLon}
                                      pName={elements.placeName}/>
                            <DoubleColumnsBox feature={"calendar"}
                                              firstLine={"모임 시작날짜"}
                                              secondLine={"모임 종료날짜"}
                                              isEditable={true}/>
                            {memberData && <ListBox data={memberData}/>}
                            <DoubleColumnsBox feature={"edit"}
                                              firstLine={"정산링크"}
                                              secondLine={"옆의 수정버튼을 눌러 변경할 수 있어요"}
                                              isEditable={true}/>
                            <DoubleColumnsBox feature={"plus"}
                                              firstLine={"초대링크 재발급"}
                                              secondLine={"초대링크는 최대 30분 간 유효해요"}
                                              isEditable={true}/>
                        </styled.FormContainer>
                    </>
                    :
                    // false : 모임 멤버인 경우
                    <>
                        <TopNavBar pageName={"모임 보기"}
                                   feature={"done"}
                                   isModalRequired={true}/>
                        <styled.FormContainer>
                            <DarkBlueReadBox feature={""}
                                                    boxtitle={"모임명"}
                                                    eventTitle={elements.title}/>
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"모임 장소 길찾기"}
                                                    to={"https://map.kakao.com/link/from/현재위치," + lat +","+ lon + "/to/" + elements.placeName +","+ elements.placeLat +","+ elements.placeLon}
                            />
                            <KakaoMap lat={elements.placeLat}
                                      lon={elements.placeLon}
                                      pName={elements.placeName}/>
                            <DoubleColumnsBox feature={"calendar"}
                                              firstLine={"모임 시작날짜"}
                                              secondLine={"모임 종료날짜"}
                                              isEditable={false}
                                              startDate={elements.startDate}
                                              endDate={elements.endDate}/>
                            {memberData && <ListBox data={memberData}/>}
                            <DoubleColumnsBox feature={"edit"}
                                              firstLine={"정산링크"}
                                              secondLine={"모임장 이외에는 링크를 볼 수만 있어요"}
                                              isEditable={false}/>

                        </styled.FormContainer>
                    </>
                }

            </styled.BodyContainerM>
        ))}
        </>
    )
}

export default ManageMeeting;
