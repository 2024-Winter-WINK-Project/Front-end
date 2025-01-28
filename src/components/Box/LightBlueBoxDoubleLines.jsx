import React, {useEffect, useRef, useState} from "react";
import calendar from "../../icons/calendar.png";
import add from "../../icons/add.png";
import edit from "../../icons/edit.png";
import 'react-datepicker/dist/react-datepicker.css';
import * as styled from "./styles";

const LightBlueBoxDoubleLines = ({firstLine, secondLine, feature, isEditable, startDate, endDate, onDataChange}) => {
    const iconSelect = [calendar,add,edit];
    const [resIcon, setResIcon] = useState();
    const [isCalendar, setIsCalendar] = useState(false);
    const [calendarSwitch,setCalsendarSwitch] = useState(false);
    const [sDate, setSDate] = useState(null);
    const [eDate, setEDate] = useState(null);
    const saveSDate = useRef(0);
    const saveEDate = useRef(0);
    const today = new Date();


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

    const openModal = () => {
        onDataChange(true);
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
                <styled.BoxContainerBig>
                    {isCalendar ?
                        <styled.BoxContentsContainer>
                            <div style={{width : "90%",display : "flex", flexDirection : "column", justifyContent : "center"}}>
                                <styled.TextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <styled.TextBox>{firstLine}</styled.TextBox>
                                    </div>
                                    {isEditable ?
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            value={sDate}
                                            min={today}
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                fontSize: "15px"
                                            }}
                                            onChange={saveData}
                                        />
                                        :
                                        <>
                                            <styled.TextBoxt>{sDate}</styled.TextBoxt>
                                            <styled.IconBox src={calendar}/>
                                        </>}
                                        </styled.TextContainer>
                                        <styled.DivideLine/>
                                <styled.TextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"}}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                            <styled.TextBox>{secondLine}</styled.TextBox>
                                    </div>
                                    {isEditable ?
                                    <input type="date"
                                           name="endDate"
                                           id="endDate"
                                           value={eDate}
                                           min={today}
                                           style={{
                                                border: "none",
                                                background: "transparent",
                                                fontSize: "15px",
                                                }}
                                           onChange={saveData2}
                                    />
                                    :
                                    <>
                                        <styled.TextBox>{eDate}</styled.TextBox>
                                        <styled.IconBox src={calendar}/>
                                    </>}

                                </styled.TextContainer>

                            </div>
                        </styled.BoxContentsContainer>
                        :
                        // 2줄짜리 버튼있는 박스가 아니라 1줄에만 박스가 있는 경우
                        <styled.BoxContentsContainer>
                            <div style={{
                                width: "90%",
                                display : "flex", flexDirection : "column", justifyContent : "center"}}>
                                <styled.TextContainer style={{width : "100%", display : "flex", flexDirection : "row", justifyContent : "space-between", alignItems : "center"}}>
                                    <div style={{display : "flex", justifyContent:"center",alignItems :"center"}}>
                                        <styled.TextBox>{firstLine}</styled.TextBox>
                                    </div>
                                    <styled.BoxIcon src={resIcon}
                                            onClick={openModal}/>
                                </styled.TextContainer>
                                <styled.DivideLine/>
                                <styled.TextContainer style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <styled.TextBox style={{fontSize: "15px"}}>{secondLine}</styled.TextBox>
                                    </div>
                                </styled.TextContainer>
                            </div>
                        </styled.BoxContentsContainer>
                    }
                </styled.BoxContainerBig>
        </>

    )
}

export default LightBlueBoxDoubleLines;
