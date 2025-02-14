import React, {useEffect, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import MeetingListBox from "../../components/Box/MeetingListBox.jsx";
import * as styled from "../Home/styles";
import axios from "axios";

const MeetingList = () =>{
    const [createdGroup, setCreatedGroup] = useState(null);
    const [invitedgroup, setInvitedGroup] = useState(null);
    // 사용자의 브라우저에서 제공받은 쿠키 (크롬 개발자 ->Application/Cookies/jwt라 쓰여진 쿠키 속 jwt access key 사용)
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3Mzk1MjMyNjcsImV4cCI6MTczOTUyNTA2N30.U5v-_ZuKoVDB_LAKdczPZqwJ8ODuHYeYBRgE9NBZ_Dw";

    useEffect(() => {
        const fetchData = async () => {
            const getCreatedGroup = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${token}`,
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
                setInvitedGroup(tmpInvitedGroupList);
                setCreatedGroup(tmpCreatedGroupList);
            }

        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const getCreatedGroup = await axios.get(`http://localhost:8000/meeting?isManager=true&_sort=startDate`);
    //         const getInvitedGroup = await axios.get(`http://localhost:8000/meeting?isManager=false&_sort=startDate`);
    //         if(getCreatedGroup !== undefined &&
    //             getInvitedGroup !== undefined)
    //         {
    //             setCreatedGroup(getCreatedGroup.data);
    //             setInvitedGroup(getInvitedGroup.data);
    //         }
    //     }
    //     fetchData();
    //
    // }, []);
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
