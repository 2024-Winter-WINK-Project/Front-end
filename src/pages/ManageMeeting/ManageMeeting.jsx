import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import ListBox from "../../components/Box/ListBox";
import TwoButtons from "../../components/Button/TwoButtons";
import OneButton from "../../components/Button/OneButton";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import InviteLinkModal from "../../components/Modal/InviteLinkModal";
import AskModal from "../../components/Modal/AskModal";
import * as crypto from "../../components/Others/Crypto";
import * as ValuesCheck from "../../components/Others/ValuesCheck";

const ManageMeeting = () => {
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [leaveModalOpen, setLeaveModalOpen] = useState(false);
    const params = useParams();
    const handleDataChange = async (id,value) => {
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
        ValuesCheck.ValuesCheck("isOwner",params.skey);
        const fetchData = async () => {
            const getMemberData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: `http://localhost:8080/meetings/${params.meetingId}/members`,
            });

            const getMeetingData = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
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
            }

            else{
                alert("현재 위치를 찾을 수 없어요. 위치 권한을 다시 설정해 보세요.");
            }
        }
        fetchData();

    }, [lat,lon]);

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id}>
                {crypto.decrypt(params.skey) === "true" ?
                    // true : 모임장
                    <>
                        <TopNavBar pageName={"모임 보기"}
                                   feature={"done"}
                                   isModalRequired={false}
                                   isBackRequired={true}
                                   mode={"모임장 위임"}
                                   dest={`/home?id=${sessionStorage.getItem("userId")}`}/>
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
                                              startDate={elements.startTime.replace('T',' ')}
                                              endDate={elements.endTime.replace('T', ' ')}/>
                            {memberData && <ListBox data={memberData}/>}
                            <TwoButtons ButtonColor={"#E7EBF7"}
                                        TextColor={"black"}
                                        ButtonText1={"모임 편집"}
                                        ButtonIcon={"edit"}
                                        Dest={`managemeeting/${elements.id}/edit/${params.skey}`}
                                        ButtonText2={"초대코드 생성"}
                                        ButtonIcon2={"add"}
                                        Tag={"inviteModal"}
                                        onDataChange={handleDataChange}
                                        isModalRequired={true}/>
                            <TwoButtons ButtonColor={"#F7E7E7"}
                                        TextColor={"black"}
                                        ButtonText1={"모임장 위임"}
                                        ButtonIcon={"change"}
                                        Dest={`managemeeting/${elements.id}/changemanager/${params.skey}`}
                                        ButtonText2={"멤버 삭제"}
                                        ButtonIcon2={"remove"}
                                        Dest2={`managemeeting/${elements.id}/removemembers/${params.skey}`}/>
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
                                   isModalRequired={false}
                                   isBackRequired={true}
                                    dest={`/home?id=${sessionStorage.getItem("userId")}`}/>
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
                                              startDate={elements.startTime.replace('T',' ')}
                                              endDate={elements.endTime.replace('T',' ')}/>
                            {memberData && <ListBox data={memberData}/>}
                            {/*<OneButton ButtonColor={"#E7EBF7"}*/}
                            {/*           ButtonIcon={"add"}*/}
                            {/*           ButtonText1={"초대코드 생성"}*/}
                            {/*           Tag={"inviteModal"}*/}
                            {/*           isModalRequired={true}*/}
                            {/*           onDataChange={handleDataChange}/>*/}
                            <OneButton ButtonColor={"#F7E7E7"}
                                       ButtonIcon={"quit"}
                                       ButtonText1={"모임 나가기"}
                                       Tag={"leaveModal"}
                                       isModalRequired={true}
                                       onDataChange={handleDataChange}/>
                            <ModalTemplate isOpen={leaveModalOpen} onClose={() =>setLeaveModalOpen(false)}>
                                <AskModal mode={"모임 탈퇴"} onDataChange={() => setLeaveModalOpen(false)}/>
                            </ModalTemplate>
                            <ModalTemplate isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)}>
                                <InviteLinkModal onDataChange={() => setInviteModalOpen(false)}/>
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
