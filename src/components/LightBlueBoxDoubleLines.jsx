import React, {useState} from "react";
import styled from "styled-components";
import group_manager from "../icons/group_manager.png";
import {useMediaQuery} from "react-responsive";
import calendar from "../icons/calendar.png";
import locationMap from "../icons/location.png";
import add from "../icons/add.png";
import edit from "../icons/edit.png";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';



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
    height: 150px;
    display: flex;
    justify-content: center;
`;

const LBBox = styled.div`
    border : none;
    border-radius: 10px;
    width: 90%;
    height: 140px;
    background-color: #E7EBF7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LBText = styled.div`
    text-align: left;
    color : black;
    font-size: 20px;
    height: 100%;
`;

const LBTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: space-evenly;
`;

const LBIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const DivideLine = styled.hr`
    border: 0px;
    width: 95%;
    height: 1px;
    background-color: #A8B5DC;
`;

const LightBlueBoxDoubleLines = ({firstLine, secondLine, feature}) => {
    const iconSelect = [calendar,add,edit];
    let resIcon = null;
    let isCalendar = false;
    let calendarSwitch = false;
    if (feature === "plus"){
        resIcon = iconSelect[1];
        isCalendar = false;
    }
    else if (feature === "calendar"){
        resIcon = iconSelect[0];
        isCalendar = true;
    }
    else if (feature === "edit"){
        resIcon = iconSelect[2];
        isCalendar = false;
    }
    const [startDate, setStartDate] = useState(new Date());


    return(
        <>
            <Mobile>
                <Wrapper style={{width : "100vw"}}>
                    {isCalendar ?
                        <LBBox>
                            <div style={{width : "90%",display : "flex", flexDirection : "column", justifyContent : "center"}}>
                                <LBTextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <LBText>{firstLine}</LBText>
                                    </div>

                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        style={{
                                            border : "none",
                                            background : "transparent",
                                            fontSize : "15px"
                                                }}
                                        />
                                </LBTextContainer>
                                <DivideLine/>
                                <LBTextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <LBText>{secondLine}</LBText>
                                </div>
                                <input type="date" name="endDate" id="endDate"  style={{border : "none", background : "transparent", fontSize : "15px", borderRadius :"10px"}}/>
                                </LBTextContainer>

                            </div>
                        </LBBox>
                        :
                        <LBBox>
                            <div style={{
                                width: "90%",
                                display : "flex", flexDirection : "column", justifyContent : "center"}}>
                                <LBTextContainer style={{width : "100%", display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
                                    <div style={{display : "flex", justifyContent:"center",alignItems :"center"}}>
                                        <LBText>{firstLine}</LBText>
                                    </div>
                                    <LBIcon src={resIcon}></LBIcon>
                                </LBTextContainer>
                                <DivideLine/>
                                <LBTextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <LBText style={{fontSize: "15px"}}>{secondLine}</LBText>
                                    </div>
                                </LBTextContainer>
                            </div>
                        </LBBox>
                    }
                </Wrapper>
            </Mobile>
            <PC>
                <Wrapper style={{width : "500px"}}>
                    <LBBox>
                        <div style={{width : "90%",display : "flex", flexDirection : "column", justifyContent : "center"}}>
                            <LBTextContainer style={{width : "100%", display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
                                <div style={{display : "flex", justifyContent:"center",alignItems :"center"}}>
                                    <LBText>{firstLine}</LBText>
                                </div>
                                <LBIcon src={resIcon}></LBIcon>
                            </LBTextContainer>
                            <DivideLine/>
                            {isCalendar ?
                                <LBTextContainer style={{width : "100%", display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems :"center"}}>
                                    <LBText>{secondLine}</LBText>
                                    <LBIcon src={resIcon}></LBIcon>
                                </LBTextContainer>
                                :
                                <LBTextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <LBText style={{fontSize: "15px", color: "grey"}}>{secondLine}</LBText>
                                    </div>
                                </LBTextContainer>
                            }

                        </div>
                    </LBBox>
                </Wrapper>
            </PC>
        </>

    )
}

export default LightBlueBoxDoubleLines;
