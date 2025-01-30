import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import MeetingListBox from "../../components/Box/MeetingListBox.jsx";
import * as styled from "../Home/styles";

const MeetingList = () =>{
    const [createdGroup, setCreatedGroup] = useState(null);
    const [invitedgroup, setInvitedGroup] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/meeting?isManager=true&_sort=startDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCreatedGroup(data);

            });
        fetch("http://localhost:8000/meeting?isManager=false&_sort=startDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setInvitedGroup(data);

            });
    }, []);
    return (
        <styled.BodyContainer>
            <TopNavBar pageName={"모임 관리"}
                       feature={"add"}></TopNavBar>
            <styled.ContentContainer>
                <styled.TextWrapper>
                    <styled.TextBox>내가 만든 모임</styled.TextBox>
                </styled.TextWrapper>
                {createdGroup && <MeetingListBox group={createdGroup} isList={true}/>}
                <styled.TextWrapper>
                    <styled.TextBox>내가 초대받은 모임</styled.TextBox>
                </styled.TextWrapper>
                {invitedgroup && <MeetingListBox group={invitedgroup} isList={true}/>}
            </styled.ContentContainer>

        </styled.BodyContainer>
    )
}
export default MeetingList;
