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
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
`;

const Background_BarPC = styled.div`
    background-color: white;
    width: 500px;
    height: 8vh;
    display: flex;
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
    align-items: flex-end;
    justify-content: space-between;
    width: 90%;
`;

const TextWrapper = styled.div`
    width: 150px;
    display: flex;
    align-items: center;
`;

const Text = styled.text`
    font-size: 30px;
    font-weight: bold;
    display: flex;
    //justify-content: center;
`;

const TopBar = ({nickName}) => {
    return (
        <>
            <Mobile>
                <Background_Bar>
                    <BarWrapper>
                        <TextWrapper>
                            <Text style={{
                                marginRight : '10px'
                            }}>{nickName}</Text>
                            <Text style={{
                                fontSize :'22px',
                                fontWeight : 'normal',
                            }}>님</Text>
                        </TextWrapper>
                        <ButtonIcons src={add}/>
                    </BarWrapper>
                </Background_Bar>
            </Mobile>
            <PC>
                <Background_BarPC>
                    <BarWrapper>
                        <TextWrapper>
                            <Text style={{
                                marginRight : '10px'
                            }}>{nickName}</Text>
                            <Text style={{
                                fontSize : '22px',
                                fontWeight : 'normal',
                                marginLeft : '10px'
                            }}>님</Text>
                        </TextWrapper>
                        <ButtonIcons src={add}/>
                    </BarWrapper>
                </Background_BarPC>
            </PC>

        </>)

}

export default TopBar;
