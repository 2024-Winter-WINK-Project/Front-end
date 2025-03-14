import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import MeetingListBox from "../../components/Box/MeetingListBox.jsx";
import * as styled from "../Home/styles";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import * as ValuesCheck from "../../components/Others/ValuesCheck";

const MeetingList = () =>{
    const [createdGroup, setCreatedGroup] = useState(null);
    const [invitedgroup, setInvitedGroup] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    useEffect(() => {
        ValuesCheck.ValuesCheck("userId",id);
        const fetchData = async () => {
            const getCreatedGroup = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: 'http://localhost:8080/meetings',

            });

            if(getCreatedGroup.status === 200)
            {
                var tmpCreatedGroupList = [];
                var tmpInvitedGroupList = [];
                for (var i = 0; i < getCreatedGroup.data.length; i++) {
                    if(getCreatedGroup.data[i].owner === true){
                        Object.assign(tmpCreatedGroupList.push(getCreatedGroup.data[i]));
                    }
                    else{
                        Object.assign(tmpInvitedGroupList.push(getCreatedGroup.data[i]));
                    }
                }
                setInvitedGroup(tmpInvitedGroupList.reverse());
                setCreatedGroup(tmpCreatedGroupList.reverse());
            }
        }
        fetchData();
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
                {invitedgroup !== undefined ?
                    <MeetingListBox group={invitedgroup} isList={true}/>
                :
                    <div>아직 등록된 모임이 없어요.</div>}
            </styled.ContentContainer>
        </styled.BodyContainer>
    )
}
export default MeetingList;
