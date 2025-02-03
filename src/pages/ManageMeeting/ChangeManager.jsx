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


const ChangeManager = () => {
    const {meetingId} = useParams();
    const location = useLocation();
    const currPath = location.pathname.slice(17)
    const [meetingData, setMeetingData] = useState();
    const [memberData, setMemberData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMeetingData(json)
            })
            .catch((error) => {
                console.log(error)
            });


        fetch(`http://localhost:8000/members?id=${meetingId}`)
            .then((response) => response.json())
            .then((json) => {
                setMemberData(json)
            })
            .catch((error) => {
                console.log(error)
            });

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
                                   isModalRequired={true}/>
                        <styled.FormContainer>
                            <DarkBlueReadBox feature={""}
                                             boxtitle={"모임명"}
                                             eventTitle={elements.title}/>

                            {memberData && <ListBox
                                data={memberData}
                                mode={"radio"}/>}
                        </styled.FormContainer>
            </styled.BodyContainer>
        ))}
        </>
    )
}

export default ChangeManager;
