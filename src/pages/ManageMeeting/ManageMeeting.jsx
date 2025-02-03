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
import DoneModal from "../../components/Modal/DoneModal";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import InviteLinkModal from "../../components/Modal/InviteLinkModal";


const ManageMeeting = () => {
    const {meetingId} = useParams();
    const [meetingData, setMeetingData] = useState();
    const [placeData, setPlaceData] = useState();
    const [memberData, setMemberData] = useState();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);




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
            <styled.BodyContainer key={elements.id}>
                {elements.isManager ?
                    // isManager : 모임장인 경우
                    // true : 모임장
                    <>
                        <TopNavBar pageName={"모임 조회"}
                                   feature={"done"}
                                   isModalRequired={false}
                                   isBackRequired={true}
                                   dest={"/"}/>
                        <styled.FormContainer>
                            <DarkBlueReadBox feature={""}
                                              boxtitle={"모임명"}
                                              eventTitle={elements.title}/>
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"길찾기"}
                                                    web={"https://map.kakao.com/link/from/현재위치," + lat +","+ lon + "/to/" + elements.placeName +","+ elements.placeLat +","+ elements.placeLon}/>
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
                            <TwoButtons ButtonColor={"#E7EBF7"}
                                        TextColor={"black"}
                                        ButtonText1={"모임 편집"}
                                        ButtonIcon={"edit"}
                                        Dest={`managemeeting/${elements.id}/edit`}
                                        ButtonText2={"초대링크 재생성"}
                                        ButtonIcon2={"add"}
                                        isModalRequired={true}/>
                            <TwoButtons ButtonColor={"#F7E7E7"}
                                        TextColor={"black"}
                                        ButtonText1={"모임장 위임"}
                                        ButtonIcon={"change"}
                                        Dest={`managemeeting/${elements.id}/changemanager`}
                                        ButtonText2={"멤버 삭제"}
                                        ButtonIcon2={"remove"}
                                        Dest2={`managemeeting/${elements.id}/removemembers`}/>
                            <OneButton ButtonColor={"#F7E7E7"}
                                       ButtonIcon={"remove"}
                                       ButtonText1={"모임 삭제"}
                                       isModalRequired={true}/>
                        </styled.FormContainer>
                        <ModalTemplate isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
                            <InviteLinkModal onDataChange={() => setInviteModalOpen(false)}/>
                        </ModalTemplate>
                        <ModalTemplate isOpen={deleteModalOpen} onClose={() =>setDeleteModalOpen(false)}>
                            <InviteLinkModal onDataChange={() => setDeleteModalOpen(false)}/>
                        </ModalTemplate>
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
                                                    boxtitle={"길찾기"}
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
                            <OneButton ButtonColor={"#F7E7E7"}
                                       ButtonIcon={"quit"}
                                       ButtonText1={"모임 나가기"}/>

                        </styled.FormContainer>
                    </>
                }

            </styled.BodyContainer>
        ))}
        </>
    )
}

export default ManageMeeting;
