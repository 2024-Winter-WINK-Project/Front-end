import React, {useEffect, useState} from "react";
import calendar from "../../icons/calendar.png";
import add from "../../icons/add.png";
import edit from "../../icons/edit.png";
import 'react-datepicker/dist/react-datepicker.css';
import * as styled from "./styles";

const DoubleColumnsBox = ({firstLine, secondLine, feature, isEditable, startDate, endDate, onDataChange}) => {
    const iconSelect = [calendar,add,edit];
    const [resIcon, setResIcon] = useState();
    const [isCalendar, setIsCalendar] = useState(false);
    const getTimeStamp = (t) => {
        const date = new Date(t);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth()+1 >= 10 ? date.getUTCMonth()+1 : '0'+(date.getUTCMonth()+1);
        const day = date.getUTCDate() >= 10 ? date.getUTCDate() : '0'+(date.getUTCDate());
        const hour = date.getUTCHours() >= 10 ? date.getUTCHours() : '0' +(date.getUTCHours());
        const minute = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : '0' + (date.getUTCMinutes());
        return (year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + "00");

    }

    const sendDataToParent = (event) => {
        onDataChange(event.target.id, event.target.value);
    }

    const openModal = () => {
        onDataChange("uploadModal",true);
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
    }, []);



    return (
        <styled.BoxContainerBig>
            {isCalendar ?
                <styled.BoxContentsContainer>
                    <div style={{width: "90%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <styled.TextContainer style={{
                            width: "95%",
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
                                    type="datetime-local"
                                    id="meetingStartTime"
                                    // value={today.toISOString().slice(0,-8)}
                                    // min={formattedDate}
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "10px"
                                    }}
                                    onChange={(e)=>{
                                        sessionStorage.setItem(e.target.id,getTimeStamp(e.target.valueAsNumber));
                                    }}
                                />
                                :
                                <div>
                                    <styled.TextBox>{startDate}</styled.TextBox>
                                </div>}
                        </styled.TextContainer>
                        <styled.DivideLine/>
                        <styled.TextContainer style={{
                            width: "95%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <styled.TextBox>{secondLine}</styled.TextBox>
                            </div>
                            {isEditable ?
                                <input type="datetime-local"
                                       id="meetingEndTime"
                                       // min={formattedDate}
                                       style={{
                                           border: "none",
                                           background: "transparent",
                                           fontSize: "10px",
                                       }}
                                       onChange={(e)=>{
                                           sessionStorage.setItem(e.target.id,getTimeStamp(e.target.valueAsNumber));
                                       }}
                                />
                                :
                                <div>
                                    <styled.TextBox>{endDate}</styled.TextBox>
                                </div>}

                        </styled.TextContainer>

                    </div>
                </styled.BoxContentsContainer>
                :
                // 2줄짜리 버튼있는 박스가 아니라 1줄에만 박스가 있는 경우
                <styled.BoxContentsContainer>
                    <div style={{
                        width: "90%",
                        display: "flex", flexDirection: "column", alignItems: "center"
                    }}>
                        <styled.TextContainer style={{
                            width: "95%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <styled.TextBox>{firstLine}</styled.TextBox>
                            </div>
                            <styled.BoxIcon src={resIcon}
                                            onClick={openModal}/>
                        </styled.TextContainer>
                        <styled.DivideLine/>
                        <styled.TextContainer style={{
                            width: "95%",
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
    )
}

export default DoubleColumnsBox;
