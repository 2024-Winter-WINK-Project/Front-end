import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import * as styled from "../CreateMeeting/styles";
import DarkBlueReadBox from "../../components/Box/DarkBlueReadBox";
import ListBox from "../../components/Box/ListBox";
import DoneModal from "../../components/Modal/DoneModal";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import AskModal from "../../components/Modal/AskModal";
import * as ValuesCheck from "../../components/Others/ValuesCheck";
import * as crypto from "../../components/Others/Crypto";
import {useNavigateBack} from "../../components/Others/useNavigateBack";

const SelectMembers = () => {
    const params = useParams();
    const location = useLocation();
    const currPath = location.pathname
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();
    const [memberDeleteModalOpen, setMemberDeleteModalOpen] = useState(false);
    const [selectModalOpen, setSelectModalOpen] = useState(false);
    const navigateBack = useNavigateBack();
    const handleDataChange = async (id, value) => {
        if (currPath === `/managemeeting/${meetingData[0].id}/${crypto.encrypt("true")}/removemembers`){
            setMemberDeleteModalOpen(value);
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
                if (window.location.pathname === `/managemeeting/${getMeetingData.data.id}/${params.skey}/removemembers`){
                    if (getMemberData && getMemberData.data.length === 1){
                        alert("삭제할 멤버가 없습니다.");
                        navigateBack();
                    }
                }
            }
        }
        fetchData();


    }, []);

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
                                     eventTitle={elements.name}/>

                    {memberData && <ListBox
                        data={memberData}
                        owner={meetingData[0].owner.id}
                        mode={"multiSelect"}/>}
                </styled.FormContainer>
                <ModalTemplate isOpen={memberDeleteModalOpen} onClose={() => setMemberDeleteModalOpen(false)}>
                    <AskModal mode={"멤버 삭제"}
                              onDataChange={handleDataChange}/>
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
