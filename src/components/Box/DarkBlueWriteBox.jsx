import React, {useRef, useState} from "react";
import search from "../../icons/search_w.png";
import * as styled from "./styles";

const DarkBlueWriteBox = ({boxTitle, feature, onDataChange, eventTitle}) => {
    const [place,setPlace] = useState();
    const saveData = event => {
        setPlace(event.target.value);
    }

    const sendDataToParent = (event) => {
        onDataChange(event.target.id ,event.target.value);

    }
    return (
        <styled.BoxContainerSmall>
            {/*파란색 박스*/}
            <styled.BoxContentsContainerSmall style={{
                backgroundColor: "#0234A8",
                boxShadow: "0 10px 3px -5px rgba(86, 86, 86, 0.30)"
            }}>
                {feature === "search" ?
                        // 검색 박스, 쓰기 전용
                        <styled.InputContainer style={{width: "90%"}}>
                            <styled.InputBox value={place} placeholder={"어디로 떠나볼까요?"} onChange={saveData}/>
                            <styled.BoxIcon id = "place" src={search} onClick={sendDataToParent}/>
                        </styled.InputContainer>
                    :
                        // 모임 제목 입력하는 박스, 쓰기 전용
                        <styled.InputContainer style={{width: "90%"}}>
                            <styled.TextContainer>
                                <styled.TextBox style={{
                                    width: "60px",
                                    fontSize: '20px',
                                    color: "white",
                                }}>{boxTitle}
                                </styled.TextBox>
                            </styled.TextContainer>
                            <styled.InputBox id = "title" placeholder={`${eventTitle}`} onChange={sendDataToParent}/>
                        </styled.InputContainer>
                }
            </styled.BoxContentsContainerSmall>
        </styled.BoxContainerSmall>
    )
}

export default DarkBlueWriteBox;
