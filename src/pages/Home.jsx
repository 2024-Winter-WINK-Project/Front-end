import React from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import TitleBox from "../components/TitleBox.jsx";
import TopBar from "../components/TopBar.jsx";
import TwoButtons from "../components/TwoButtons.jsx";
import ThreeButtons from "../components/ThreeButtons.jsx";
import OneButton from "../components/OneButton.jsx";

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
    padding-top: 11vh;
`;

const WrapperPC = styled.div`
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 11vh;
    
`;

const Home = () =>{
    return (
        <>
            <Mobile>
                <Wrapper>
                    <TopBar></TopBar>
                    <OneButton></OneButton>
                    <TwoButtons></TwoButtons>
                    <ThreeButtons></ThreeButtons>
                </Wrapper>
            </Mobile>
            <PC>
                <WrapperPC>
                    <TopBar></TopBar>
                    <OneButton></OneButton>
                    <TwoButtons></TwoButtons>
                    <ThreeButtons></ThreeButtons>
                </WrapperPC>
            </PC>
        </>


    )
}
export default Home;