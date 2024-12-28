import React from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import back from "../icons/back.png";
import done from "../icons/done.png";
import add from "../icons/add.png";

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

const Background_Bar = styled.nav`
    background-color: white;
    width: 100vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
`;

const Background_BarPC = styled.div`
    background-color: white;
    width: 500px;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
`;

const ButtonIcons = styled.img`
    width: 30px;
    height: 30px;
`;

const BarWrapper = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    width: 90%;
`;

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const Text = styled.text`
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

const TopBar = () => {
    return (
        <>
            <Mobile>
                <Background_Bar>
                    <BarWrapper>
                        <ButtonIcons src={back}/>
                        <TextWrapper>
                            <Text>텍스트</Text>
                        </TextWrapper>
                        {/*<ButtonIcons src={done}/>*/}
                        <ButtonIcons src={add}/>
                    </BarWrapper>
                </Background_Bar>
            </Mobile>
            <PC>
                <Background_BarPC>
                    <BarWrapper>
                        <ButtonIcons src={back}/>
                        <TextWrapper>
                            <Text>텍스트</Text>
                        </TextWrapper>
                        <ButtonIcons src={done}/>
                    </BarWrapper>
                </Background_BarPC>
            </PC>

        </>)

}

export default TopBar;