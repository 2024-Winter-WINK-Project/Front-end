import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useLocation, useParams} from "react-router-dom";
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


const ChangeManager = () => {
    const {meetingId} = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [radioModalOpen, setRadioModalOpen] = useState(false);
    const handleDataChange = async (id, value) => {
        setRadioModalOpen(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const getMeetingData = await axios.get(`http://localhost:8000/meeting?id=${meetingId}`);
            const getMemberData = await axios.get(`http://localhost:8000/members?id=${meetingId}`);
            if(getMeetingData !== undefined &&
                getMemberData !== undefined)
            {
                setMeetingData(getMeetingData.data);
                setMemberData(getMemberData.data);
            }
        }
        fetchData();

    }, []);

    if(meetingData  && memberData){
        Object.assign(meetingData[0],memberData[0]);
    }

    return(
        <>
        {meetingData && meetingData.map(elements=>(
            <styled.BodyContainer key={elements.id}>
                <TopNavBar pageName={"모임장 위임"}
                           feature={"done"}
                           isModalRequired={true}
                           isBackRequired={true}
                           onDataChange={handleDataChange}/>
                <styled.FormContainer>
                    <DarkBlueReadBox feature={""}
                                     boxtitle={"모임명"}
                                     eventTitle={elements.title}/>

                    {memberData && <ListBox
                        data={memberData}
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
