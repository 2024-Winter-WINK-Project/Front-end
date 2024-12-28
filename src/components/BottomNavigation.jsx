import React from "react";
import {useMediaQuery} from "react-responsive";
import styled, { css } from "styled-components";
import home from "../icons/home.png";
import home_filled from "../icons/home_filled.png";
import group_setting from "../icons/group_setting.png";
import group_setting_filled from "../icons/group_setting_filled.png";
import notifications from "../icons/notifications.png";
import notifications_filled from "../icons/notifications_filled.png";
import mypage from "../icons/mypage.png";
import mypage_filled from "../icons/mypage_filled.png";

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

const Background_Nav = styled.nav`
    background-color: white;
    width: 100vw;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -10px 5px -4px rgba(86, 86, 86, 0.20);
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
`;

const Background_NavPC = styled.div`
    background-color: white;
    width: 500px;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -10px 5px -4px rgba(86, 86, 86, 0.20);
    position: fixed;
    bottom: 0;
`;

const ButtonWrapper = styled.div`
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonIcons = styled.img`
    width: 30px;
    height: 30px;
`;

const ButtonIconsPC = styled.img`
    width: 30px;
    height: 30px;
`;

const StyledButton = styled.div`
    width: 100%;
    height: 25px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-align: center;
    font-size: 13px;
`;

const StyledButtonPC = styled.div`
    width: 100%;
    height: 25px;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-align: center;
    font-size: 13px;
`;

const Navigation = styled.div`
    background-color: white;
    display: flex;
    width: 90%;
`;


const BottomNavigation = () => {
    return(
        <>
            <Mobile>
                <Background_Nav>
                    <Navigation>
                        <ButtonWrapper>
                            <ButtonIcons src={home}/>
                            <StyledButton>홈</StyledButton>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIcons src={group_setting}/>
                            <StyledButton>모임 관리</StyledButton>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIcons src={notifications}/>
                            <StyledButton>받은 알림</StyledButton>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIcons src={mypage}/>
                            <StyledButton>마이페이지</StyledButton>
                        </ButtonWrapper>
                    </Navigation>
                </Background_Nav>
            </Mobile>
            <PC>
                <Background_NavPC>
                    <Navigation>
                        <ButtonWrapper>
                            <ButtonIconsPC src={home}/>
                            <StyledButtonPC>홈</StyledButtonPC>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIconsPC src={group_setting}/>
                            <StyledButtonPC>모임 관리</StyledButtonPC>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIconsPC src={notifications}/>
                            <StyledButtonPC>받은 알림</StyledButtonPC>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <ButtonIconsPC src={mypage}/>
                            <StyledButtonPC>마이페이지</StyledButtonPC>
                        </ButtonWrapper>
                    </Navigation>
                </Background_NavPC>
            </PC>
        </>




    )
}

export default BottomNavigation;