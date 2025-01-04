import React from "react";
import styled from "styled-components";
import group_manager from "../icons/group_manager.png";
import {useMediaQuery} from "react-responsive";

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
    width: 25px;
    height: 30px;
`;

const LightBlueBox = ({eventTitle,eventStartDate,eventEndDate}) => {
    return(
        <>
            <Mobile>
                <Wrapper style={{width : "100vw"}}>
                    <LBBox>
                        <LBTextContainer>
                            <LBText style={{
                                fontSize : '25px',
                                fontWeight : 'bold'
                            }}>{eventTitle}</LBText>
                            <LBText>{eventStartDate} ~ {eventEndDate}</LBText>
                        </LBTextContainer>
                        <LBIcon src={group_manager}></LBIcon>
                    </LBBox>
                </Wrapper>
            </Mobile>
            <PC>
                <Wrapper style={{width : "500px"}}>
                    <LBBox>
                        <LBTextContainer>
                            <LBText style={{
                                fontSize : '25px',
                                fontWeight : 'bold'
                            }}>{eventTitle}</LBText>
                            <LBText>{eventStartDate} ~ {eventEndDate}</LBText>
                        </LBTextContainer>
                        <LBIcon src={group_manager}></LBIcon>
                    </LBBox>
                </Wrapper>
            </PC>
        </>

    )
}

export default LightBlueBox;
