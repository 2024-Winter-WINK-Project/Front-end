import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useParams, useSearchParams} from "react-router-dom";
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
import AskModal from "../../components/Modal/AskModal";


const ManageMeeting = () => {
    const {meetingId} = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const userId = localStorage.getItem("userId");

    // 사용자의 브라우저에서 제공받은 쿠키 (크롬 개발자 ->Application/Cookies/jwt라 쓰여진 쿠키 속 jwt access key 사용)
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3Mzk1MjMyNjcsImV4cCI6MTczOTUyNTA2N30.U5v-_ZuKoVDB_LAKdczPZqwJ8ODuHYeYBRgE9NBZ_Dw";

    const handleDataChange = async (id,value) => {
        console.log(id, ":",value);
        if (id === "inviteModal"){
            setInviteModalOpen(value);
        }
        else if(id === "deleteModal"){
            setDeleteModalOpen(value);
        }
        else if(id === "leaveModal"){
            setLeaveModalOpen(value);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getMemberData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${token}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}/members`,
            });
            console.log(getMemberData)

            const getMeetingData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${token}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}`,

            });
            if(getMeetingData.status === 200 && getMemberData.status === 200)
            {
                var tmpMeetingData = [];
                var tmpMemberData = [];
                tmpMeetingData.push(getMeetingData.data);
                setMeetingData(tmpMeetingData);
                tmpMemberData.push(getMemberData.data);
                setMemberData(tmpMemberData);
            }

            if (navigator.geolocation) {
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLat(position.coords.latitude);
                    setLon(position.coords.longitude); // 경도
                });
                console.log(lat)
            }

            else{
                alert("현재 위치를 찾을 수 없어요. 위치 권한을 다시 설정해 보세요.");
            }
        }
        fetchData();

    }, [lat,lon]);
    // console.log(meetingData[0])

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id}>
                {searchParams.get("owner") === "true" ?
                    // isManager : 모임장인 경우
                    // true : 모임장
                    <>
                        <TopNavBar pageName={"모임 보기"}
                                   feature={"done"}
                                   isModalRequired={false}
                                   isBackRequired={true}
                                   dest={"/"}/>
                        <styled.FormContainer>
                            <DarkBlueReadBox feature={""}
                                              boxtitle={"모임명"}
                                              eventTitle={elements.name}/>
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"길찾기"}
                                                    web={"https://map.kakao.com/link/from/현재위치," + lat +","+ lon + "/to/" + elements.place.name +","+ elements.place.latitude +","+ elements.place.longitude}/>
                            <KakaoMap lat={elements.place.latitude}
                                      lon={elements.place.longitude}
                                      pName={elements.placeName}/>
                            <DoubleColumnsBox feature={"calendar"}
                                              firstLine={"모임 시작일시"}
                                              secondLine={"모임 종료일시"}
                                              isEditable={false}
                                              startDate={`${elements.startTime.slice(0,10)}  ${elements.startTime.slice(11,16)}`}
                                              endDate={`${elements.endTime.slice(0,10)}  ${elements.endTime.slice(11,16)}`}/>
                            {memberData && <ListBox data={memberData}/>}
                            <TwoButtons ButtonColor={"#E7EBF7"}
                                        TextColor={"black"}
                                        ButtonText1={"모임 편집"}
                                        ButtonIcon={"edit"}
                                        Dest={`managemeeting/${elements.id}/edit`}
                                        ButtonText2={"초대링크 생성"}
                                        ButtonIcon2={"add"}
                                        Tag={"inviteModal"}
                                        onDataChange={handleDataChange}
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
                                       onDataChange={handleDataChange}
                                       Tag={"deleteModal"}
                                       isModalRequired={true}/>
                        </styled.FormContainer>
                        <ModalTemplate isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
                            <InviteLinkModal onDataChange={() => setInviteModalOpen(false)}/>
                        </ModalTemplate>
                        <ModalTemplate isOpen={deleteModalOpen} onClose={() =>setDeleteModalOpen(false)}>
                            <AskModal mode={"모임 삭제"} onDataChange={() => setDeleteModalOpen(false)}/>
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
                                                    eventTitle={elements.name}/>
                            <LightBlueWriteBox feature={"location"}
                                                    style={{paddingTop : "none"}}
                                                    boxtitle={"길찾기"}
                                                    web={"https://map.kakao.com/link/from/현재위치," + lat +","+ lon + "/to/" + elements.place.name +","+ elements.place.latitude +","+ elements.place.longitude}
                            />
                            <KakaoMap lat={elements.place.latitude}
                                      lon={elements.place.longitude}
                                      pName={elements.place.name}/>
                            <DoubleColumnsBox feature={"calendar"}
                                              firstLine={"모임 시작날짜"}
                                              secondLine={"모임 종료날짜"}
                                              isEditable={false}
                                              startDate={`${elements.startTime.slice(0,10)}  ${elements.startTime.slice(11,16)}`}
                                              endDate={`${elements.endTime.slice(0,10)}  ${elements.endTime.slice(11,16)}`}/>
                            {memberData && <ListBox data={memberData}/>}
                            <OneButton ButtonColor={"#F7E7E7"}
                                       ButtonIcon={"quit"}
                                       ButtonText1={"모임 나가기"}
                                       Tag={"leaveModal"}
                                       isModalRequired={true}
                                       onDataChange={handleDataChange}/>
                            <ModalTemplate isOpen={leaveModalOpen} onClose={() =>setLeaveModalOpen(false)}>
                                <AskModal mode={"모임 탈퇴"} onDataChange={() => setLeaveModalOpen(false)}/>
                            </ModalTemplate>
                        </styled.FormContainer>
                    </>
                }

            </styled.BodyContainer>
        ))}
        </>
    )
}

export default ManageMeeting;
