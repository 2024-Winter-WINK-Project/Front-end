import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import TopBar from "../components/TopBar.jsx";
import LightBlueBox from "../components/LightBlueBox.jsx";


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

const GroupList = () =>{
    const [createdGroup, setCreatedGroup] = useState(null);
    const [invitedgroup, setInvitedGroup] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8000/meeting?isManager=true&_sort=eventStartDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCreatedGroup(data);

            });
        fetch("http://localhost:8000/meeting?isManager=false&_sort=eventStartDate", {method: 'GET', headers:{'Content-Type' : 'application/json'},})
            .then(res => {
                return res.json();
            })
            .then(data => {
                setInvitedGroup(data);

            });
    }, []);
    return (
        <>
            <Mobile>
                <Wrapper>
                    <TopBar pageName={"모임 관리"} feature={"add"}></TopBar>
                    <BodyWrapper>
                        <Text>내가 만든 모임</Text>
                    </BodyWrapper>
                    {createdGroup && <LightBlueBox group={createdGroup} isList={true}/>}
                    <BodyWrapper>
                        <Text>내가 초대받은 모임</Text>
                    </BodyWrapper>
                    {invitedgroup && <LightBlueBox group={invitedgroup} isList={true}/>}
                </Wrapper>
            </Mobile>
            <PC>
                <WrapperPC>
                    <TopBar pageName={"모임 관리"} feature={"add"}></TopBar>
                    <BodyWrapper>
                        <Text>내가 만든 모임</Text>
                    </BodyWrapper>
                    {createdGroup && <LightBlueBox group={createdGroup} isList={true}/>}
                    <BodyWrapper>
                        <Text>내가 초대받은 모임</Text>
                    </BodyWrapper>
                    {invitedgroup && <LightBlueBox group={invitedgroup} isList={true}/>}
                </WrapperPC>
            </PC>
        </>


    )
}
export default GroupList;
