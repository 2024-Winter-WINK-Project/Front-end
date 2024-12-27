import React from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import BottomNavigation from "../components/BottomNavigation.jsx"

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
    height: 100vh;
    display: flex;
    align-items: end;
`;

const WrapperPC = styled.div`
    width: 500px;
    height: 100vh;
    display: flex;
    align-items: end;
`;

const Home = () =>{
    return (
        <>
            <Mobile>
                <Wrapper>
                    <BottomNavigation></BottomNavigation>
                </Wrapper>
            </Mobile>
            <PC style={{display : 'flex', justifyContent : 'center'}}>
                <WrapperPC>
                    <BottomNavigation></BottomNavigation>
                </WrapperPC>
            </PC>
        </>


    )
}
export default Home