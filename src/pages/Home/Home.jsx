import React, {useEffect, useState} from "react";
import MeetingListBox from "../../components/Box/MeetingListBox.jsx";
import * as styled from "./styles";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import axios from "axios";


const Home = () =>{
    const [latestGroup,setLatestGroup] = useState();
    const [cookie, setCookie] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const getLatestGroup = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization : `Bearer ${document.cookie}`,
                },
                url: 'http://localhost:8080/meetings/latest',

            });
            if(getLatestGroup.status === 200)
            {
                setLatestGroup(getLatestGroup.data);
                console.log(getLatestGroup);
            }

        }
        fetchData();
    }, []);

    return (
        <styled.BodyContainer>
            <TopNavBar pageName={"홈"}
                       feature={"add"}
                       isModalRequired={false}
                       isBackRequired={false}
                       dest={"creategroup"}/>
            <styled.ContentContainer>
                <styled.TextWrapper>
                    <styled.TextBox>다가오는 모임 일정이예요</styled.TextBox>
                </styled.TextWrapper>
                {latestGroup !== undefined ?
                    <MeetingListBox group={latestGroup} isList={false}/>
                    :
                    <div>아직 등록된 모임이 없어요.</div>
                }
            </styled.ContentContainer>
        </styled.BodyContainer>
    )
}
export default Home;
