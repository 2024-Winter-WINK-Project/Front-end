import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import ListBox from "../../components/Box/ListBox";
import TwoButtons from "../../components/Button/TwoButtons";
import OneButton from "../../components/Button/OneButton";
import AskModal from "../../components/Modal/AskModal";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import * as SessionCleaner from "../../components/Session/SessionStorageCleaner";
import {useNavigateBack} from "../../components/Others/useNavigateBack";

const ChangeManager = () => {
    const params = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [radioModalOpen, setRadioModalOpen] = useState(false);
    const navigate = useNavigate();
    const navigateBack = useNavigateBack();
    const sessionStorageClear = (responseCode) => {
        sessionStorage.removeItem("ownerId");
        if (responseCode === 401){
            sessionStorage.removeItem("userId");
        }
    }


    const handleDataChange = async (id, value) => {
        if(sessionStorage.getItem("ownerId")){
            axios(`http://localhost:8080/meetings/${meetingData[0].id}/delegate?newLeaderMemeberId=${sessionStorage.getItem("ownerId")}`, {
                method : 'post',
                headers : {
                    Authorization : `Bearer ${document.cookie}`,
                    withCredentials : true
                },
            })
                .then(res=>{
                    console.log(res.status);
                    if (res.status === 200){
                        alert("모임장 위임을 완료했어요. 확인 버튼을 누르면 모임조회 페이지로 이동해요.");
                        SessionCleaner.SessionStorageCleaner(res.status);
                        navigate(`/managemeeting/${meetingData[0].id}/${params.skey}`);
                    }
                })
                .catch(e=>{
                    console.log(e);
                    if (e.status === 401){
                        alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                        SessionCleaner.SessionStorageCleaner(e.status);
                        navigate('/');
                    }
                    else{
                        alert(`${e}모임장 위임에 실패했어요.`);
                    }

                });
        }
        // setRadioModalOpen(value);
    }

    useEffect(() => {
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
                if (getMemberData.data.length === 1){
                    alert("모임장을 위임할 멤버가 없습니다.");
                    navigateBack();
                }
            }
        }
        fetchData();

    }, []);

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id} style={{height : 'auto'}}>
                <TopNavBar pageName={"모임장 위임"}
                           feature={"done"}
                           isModalRequired={true}
                           isBackRequired={true}
                           onDataChange={handleDataChange}/>
                <styled.FormContainer>
                    <DarkBlueReadBox feature={""}
                                     boxtitle={"모임명"}
                                     eventTitle={elements.name}/>

                    {memberData && <ListBox
                        data={memberData}
                        owner = {meetingData[0].owner.id}
                        mode={"radio"}/>}
                </styled.FormContainer>
                <ModalTemplate isOpen={radioModalOpen} onClose={() => setRadioModalOpen(false)}>
                    <AskModal mode={"모임장 위임"} onDataChange={() => setRadioModalOpen(false)}/>
                </ModalTemplate>
            </styled.BodyContainer>

        ))}
        </>
    )
}

export default ChangeManager;
