import React from "react";
import styled from "styled-components";
import group_manager from "../icons/group_manager.png";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";

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
    height: 110%;
    display: flex;
    justify-content: center;
`;

const LBBox = styled.div`
    border : none;
    border-radius: 10px;
    width: 90%;
    height: 100px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LBText = styled.div`
    text-align: left;
    color : black;
    line-height: 30px;
`;

const LBTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

const LBIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const LightBlueBox = ({eventTitle,eventStartDate,eventEndDate, isManager, eventPlaceName, eventPlaceXPos, eventPlaceYPos}) => {
    const navigate = useNavigate();
    var ManagerIcon = null;
    if (isManager === "true"){
        ManagerIcon = group_manager;
    }
    return(
        <>
            <Mobile>
                <Wrapper style={{width : "100vw"}} onClick={() => navigate("/manageevent",
                    {state :{
                            xPos:eventPlaceXPos,
                            yPos:eventPlaceYPos,
                            pName:eventPlaceName,
                            eTitle:eventTitle,
                            eSDate:eventStartDate,
                            eEDate:eventEndDate,
                            manager:isManager
                        }})}>
                    <LBBox>
                        <LBTextContainer>
                            <LBText style={{
                                fontSize : '25px',
                                fontWeight : 'bold'
                            }}>{eventTitle}</LBText>
                            <LBText>{eventStartDate} ~ {eventEndDate}</LBText>
                        </LBTextContainer>
                        {ManagerIcon ?
                            <LBIcon src={ManagerIcon}></LBIcon>
                            :
                            <div style={{width : "30px", height : "30px", border : 'none'}}></div>
                        }
                    </LBBox>
                </Wrapper>
            </Mobile>
            <PC>
                <Wrapper style={{width : "500px"}} onClick={() => navigate("/manageevent",
                    {state : {
                                xPos:eventPlaceXPos,
                                yPos:eventPlaceYPos,
                                pName:eventPlaceName,
                                eTitle:eventTitle,
                                eSDate:eventStartDate,
                                eEDate:eventEndDate,
                                manager:isManager

                    }})}>
                    <LBBox>
                        <LBTextContainer>
                            <LBText style={{
                                fontSize : '25px',
                                fontWeight : 'bold'
                            }}>{eventTitle}</LBText>
                            <LBText>{eventStartDate} ~ {eventEndDate}</LBText>
                        </LBTextContainer>
                        {ManagerIcon ?
                            <LBIcon src={ManagerIcon}></LBIcon>
                            :
                            <div style={{width : "30px", height : "30px", border : "none"}}></div>
                        }
                    </LBBox>
                </Wrapper>
            </PC>
        </>

    )
}

export default LightBlueBox;
