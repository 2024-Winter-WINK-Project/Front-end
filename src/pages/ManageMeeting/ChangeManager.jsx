import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import ListBox from "../../components/Box/ListBox";
import AskModal from "../../components/Modal/AskModal";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import {useNavigateBack} from "../../components/Others/useNavigateBack";
import * as ValuesCheck from "../../components/Others/ValuesCheck";

const ChangeManager = () => {
    const params = useParams();
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [radioModalOpen, setRadioModalOpen] = useState(false);
    const navigateBack = useNavigateBack();

    const handleDataChange = async (id, value) => {
        setRadioModalOpen(value);
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
