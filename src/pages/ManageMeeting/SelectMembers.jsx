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
import DoneModal from "../../components/Modal/DoneModal";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import AskModal from "../../components/Modal/AskModal";


const SelectMembers = () => {
    const {meetingId} = useParams();
    const location = useLocation();
    const currPath = location.pathname
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [memberDeleteModalOpen, setMemberDeleteModalOpen] = useState(false);
    const [selectModalOpen, setSelectModalOpen] = useState(false);

    const handleDataChange = async (id, value) => {
        setMemberDeleteModalOpen(value);

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
                {currPath === `/managemeeting/${elements.id}/removemembers` ?
                    <TopNavBar pageName={"멤버 삭제"}
                               feature={"done"}
                               isModalRequired={true}
                               isBackRequired={true}
                               onDataChange={handleDataChange}
                    />
                    :
                    <TopNavBar pageName={"멤버 선택"}
                               feature={"done"}
                               isModalRequired={true}
                               isBackRequired={true}
                               onDataChange={handleDataChange}
                    />}

                <styled.FormContainer>
                    <DarkBlueReadBox feature={""}
                                     boxtitle={"모임명"}
                                     eventTitle={elements.title}/>

                    {memberData && <ListBox
                        data={memberData}
                        mode={"multiSelect"}/>}
                </styled.FormContainer>
                <ModalTemplate isOpen={memberDeleteModalOpen} onClose={() => setMemberDeleteModalOpen(false)}>
                    <AskModal mode={"멤버 삭제"} onDataChange={() => setMemberDeleteModalOpen(false)}/>
                </ModalTemplate>
                <ModalTemplate isOpen={selectModalOpen} onClose={() => setSelectModalOpen(false)}>
                    <DoneModal onDataChange={() => setSelectModalOpen(false)}/>
                </ModalTemplate>

            </styled.BodyContainer>
        ))}
        </>
    )
}

export default SelectMembers;
