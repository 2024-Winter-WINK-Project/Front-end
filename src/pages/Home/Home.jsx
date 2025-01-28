import React, {useEffect, useState} from "react";
import LightBlueBox from "../../components/Box/LightBlueBox.jsx";
import * as styled from "./styles";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const Home = () =>{
    const [latestGroup,setLatestGroup] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?_limit=5&_sort=startDate`)
            .then((response) => response.json())
            .then((json) => {
                setLatestGroup(json)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    return (

        <styled.BodyContainer>
            <TopNavBar pageName={"홈"}
                       feature={"add"}
                       isModalRequired={false}
                       isBackRequired={false}
                       dest={"creategroup"}/>
            <styled.TextWrapper>
                <styled.TextBox>다가오는 모임 일정이예요</styled.TextBox>
            </styled.TextWrapper>
            {latestGroup && <LightBlueBox group={latestGroup} isList={false}/>}
        </styled.BodyContainer>
    )
}
export default Home;
