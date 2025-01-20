import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import HomeTopBar from "../components/HomeTopBar.jsx";
import LightBlueBox from "../components/LightBlueBox.jsx";
import {useNavigate} from "react-router-dom";
import Modal from "../components/Modal.jsx";
import axios from "axios";



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
    const [latestGroup, setLatestGroup] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/groups?_limit=5&_sort=eventStartDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setLatestGroup(data);
            });
    }, []);

    return (
        <>
            <Mobile>
                <Wrapper>
                    <HomeTopBar nickName={"홍길동"} destination={"creategroup"}></HomeTopBar>
                    <BodyWrapper>
                        <Text onClick={() => setOpen(true)}>다가오는 모임 일정이예요</Text>
                    </BodyWrapper>
                    {latestGroup && <LightBlueBox group={latestGroup} isList={false}/>}

                </Wrapper>
            </Mobile>
            <PC>
                <WrapperPC>
                    <HomeTopBar nickName={"홍길동"} destination={"creategroup"}></HomeTopBar>
                    <BodyWrapper>
                        <Text>다가오는 모임 일정이예요</Text>
                    </BodyWrapper>
                    {latestGroup && <LightBlueBox group={latestGroup} isList={false}/>}
                </WrapperPC>
            </PC>
        </>


    )
}
export default Home;
