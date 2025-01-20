import React, {useEffect, useRef, useState} from "react";
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

const LightBlueBoxDoubleLines = ({firstLine, secondLine, feature, isEditable, startDate, endDate, onDataChange}) => {
    const iconSelect = [calendar,add,edit];
    const [resIcon, setResIcon] = useState();
    const [isCalendar, setIsCalendar] = useState(false);
    const [calendarSwitch,setCalsendarSwitch] = useState(false);
    const [sDate, setSDate] = useState(0);
    const [eDate, setEDate] = useState(0);
    const saveSDate = useRef(0);
    const saveEDate = useRef(0);


    const saveData = event => {
        saveSDate.current = Number(event.target.value.replace(/-/g,""));
        sendDataToParent();
    }
    const saveData2 = event => {
        saveEDate.current = Number(event.target.value.replace(/-/g,""));
        sendDataToParent();
    }

    const sendDataToParent = () => {
        onDataChange(saveSDate, saveEDate);
    }


    useEffect(() => {
        if (feature === "plus"){
            setResIcon(iconSelect[1]);
            setIsCalendar(false);
        }
        else if (feature === "calendar"){
            setResIcon(iconSelect[0]);
            setIsCalendar(true);
        }
        else if (feature === "edit"){
            setResIcon(iconSelect[2]);
            setIsCalendar(false);
        }
        setSDate(startDate);
        setEDate(endDate);
    }, []);



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
                                    {isEditable ?
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value="sDate"
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                fontSize: "15px"
                                            }}
                                            onChange={saveData}
                                        />
                                        :
                                        <>
                                            <LBText>{sDate}</LBText>
                                            <LBIcon src={calendar}/>
                                        </>}
                                        </LBTextContainer>
                                        <DivideLine/>
                                <LBTextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"}}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <LBText>{secondLine}</LBText>
                                    </div>
                                    {isEditable ?
                                    <input type="date"
                                           name="endDate"
                                           id="endDate"
                                           style={{
                                                border: "none",
                                                background: "transparent",
                                                fontSize: "15px",
                                                borderRadius: "10px"
                                                }}
                                           onChange={saveData2}
                                    />
                                    :
                                    <>
                                        <LBText>{eDate}</LBText>
                                        <LBIcon src={calendar}/>
                                    </>}

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
