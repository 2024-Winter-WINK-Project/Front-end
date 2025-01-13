import React, {useState} from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import TitleBox from "../components/TitleBox.jsx";
import TopBar from "../components/TopBar.jsx";
import TwoButtons from "../components/TwoButtons.jsx";
import ThreeButtons from "../components/ThreeButtons.jsx";
import OneButton from "../components/OneButton.jsx";
import HomeTopBar from "../components/HomeTopBar.jsx";
import LightBlueBox from "../components/LightBlueBox.jsx";
import {useNavigate} from "react-router-dom";
import Modal from "../components/Modal.jsx";

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
`;

const WrapperPC = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    
`;

const BodyWrapper = styled.div`
    width: 85%;
    height: 60%;
    display: flex;
    justify-content: left;
    align-items: center;
`;


const Text = styled.text`
    font-size: 20px;

`;

const Home = () =>{
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const isOpen = childData => {
        setOpen(childData);
    };
    return (
        <>
            <Mobile>
                <Wrapper>
                    <HomeTopBar nickName={"홍길동"} destination={"createevent"}></HomeTopBar>
                    <BodyWrapper>
                        <Text onClick={() => setOpen(true)}>다가오는 모임 일정이예요</Text>
                    </BodyWrapper>
                    <LightBlueBox
                        eventTitle={"제주도 여행"}
                        eventStartDate={"2025-02-10"}
                        eventEndDate={"2025-02-15"}
                        isManager={"true"}
                        eventPlaceName={"제주공항"}
                        eventPlaceXPos={126.2934}
                        eventPlaceYPos={33.3044}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"WINK MT"}
                        eventStartDate={"2025-02-25"}
                        eventEndDate={"2025-02-26"}
                        isManager={"false"}
                        eventPlaceName={"강남역"}
                        eventPlaceXPos={127.028361548}
                        eventPlaceYPos={37.496486063}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"개강총회"}
                        eventStartDate={"2025-03-05"}
                        eventEndDate={"2025-03-05"}
                        isManager={"false"}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"한강 나들이"}
                        eventStartDate={"2025-03-10"}
                        eventEndDate={"2025-03-10"}
                        isManager={"true"}
                    >
                    </LightBlueBox>
                    {open == true ?
                        <Modal onClick={isOpen}></Modal>
                        :
                        null
                    }
                </Wrapper>

            </Mobile>
            <PC>
                <WrapperPC>
                    <HomeTopBar nickName={"홍길동"} destination={"createevent"}></HomeTopBar>
                    <BodyWrapper>
                        <Text>다가오는 모임 일정이예요</Text>
                    </BodyWrapper>
                    <LightBlueBox
                        eventTitle={"제주도 여행"}
                        eventStartDate={"2025-02-10"}
                        eventEndDate={"2025-02-15"}
                        isManager={"true"}
                        eventPlaceName={"제주공항"}
                        eventPlaceXPos={126.2934}
                        eventPlaceYPos={33.3044}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"WINK MT"}
                        eventStartDate={"2025-02-25"}
                        eventEndDate={"2025-02-26"}
                        isManager={"false"}
                        eventPlaceName={"강남역"}
                        eventPlaceXPos={127.028361548}
                        eventPlaceYPos={37.496486063}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"개강총회"}
                        eventStartDate={"2025-03-05"}
                        eventEndDate={"2025-03-05"}
                        isManager={"false"}
                    >
                    </LightBlueBox>
                    <LightBlueBox
                        eventTitle={"한강 나들이"}
                        eventStartDate={"2025-03-10"}
                        eventEndDate={"2025-03-10"}
                        isManager={"true"}
                    >
                    </LightBlueBox>
                    {open == true ?
                        <Modal onClick={isOpen}></Modal>
                        :
                        null
                    }
                </WrapperPC>
            </PC>
        </>


    )
}
export default Home;
