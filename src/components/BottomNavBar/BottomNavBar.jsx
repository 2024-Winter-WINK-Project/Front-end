import React from "react";
import home from "../../icons/home.png";
import home_filled from "../../icons/home_filled.png";
import group_setting from "../../icons/group_setting.png";
import group_setting_filled from "../../icons/group_setting_filled.png";
import notifications from "../../icons/notifications.png";
import notifications_filled from "../../icons/notifications_filled.png";
import mypage from "../../icons/mypage.png";
import mypage_filled from "../../icons/mypage_filled.png";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import * as styled from "./styles";

const BottomNavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const userId = sessionStorage.getItem("userId");
    return(
        <>
            {currentPath === "/" ?
                <></>
                :
                <styled.BarContainer>
                    <styled.BarContentsContainer>
                        <styled.ButtonContainer onClick={() => navigate(`/home?id=${userId}`)}>
                            {currentPath === `/home` ?
                                <styled.ButtonIcons src={home_filled}/>
                                :
                                <styled.ButtonIcons src={home}/>
                            }
                            <styled.ButtonStyles>홈</styled.ButtonStyles>
                        </styled.ButtonContainer>
                        <styled.ButtonContainer onClick={() => navigate(`/meetinglist?id=${userId}`)}>
                            {currentPath === `/meetinglist` ?
                                <styled.ButtonIcons src={group_setting_filled}/>
                                :
                                <styled.ButtonIcons src={group_setting}/>
                            }
                            <styled.ButtonStyles>모임 관리</styled.ButtonStyles>
                        </styled.ButtonContainer>
                        <styled.ButtonContainer onClick={() => navigate("/")}>
                            <styled.ButtonIcons src={notifications}/>
                            <styled.ButtonStyles>받은 알림</styled.ButtonStyles>
                        </styled.ButtonContainer>
                        <styled.ButtonContainer onClick={() => navigate(`/mypage/${userId}`)}>
                            {currentPath === `/mypage/${userId}` ?
                                <styled.ButtonIcons src={mypage_filled}/>
                                :
                                <styled.ButtonIcons src={mypage}/>
                            }
                            <styled.ButtonStyles>마이페이지</styled.ButtonStyles>
                        </styled.ButtonContainer>
                    </styled.BarContentsContainer>
                </styled.BarContainer>
            }
        </>
    )
}

export default BottomNavBar;
