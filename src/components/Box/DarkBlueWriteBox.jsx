import React, {useRef, useState} from "react";
import search from "../../icons/search_w.png";
import * as styled from "./styles";

const DarkBlueWriteBox = ({boxTitle, feature, onDataChange, onDataChange2}) => {
    const [place,setPlace] = useState();
    const groupName = useRef(null);
    const saveData = event => {
        setPlace(event.target.value);
    }
    const saveData2 = event => {
        groupName.current = event.target.value;
        sendDataToParent2();
    }

    const sendDataToParent = () => {
        onDataChange(place);
    }

    const sendDataToParent2 = () => {
        onDataChange2(groupName);
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
                            <styled.BoxIcon src={search} onClick={sendDataToParent}/>
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
                            <styled.InputBox placeholder={"모임 제목을 입력해 주세요."} onChange={saveData2}/>
                        </styled.InputContainer>
                }
            </styled.BoxContentsContainerSmall>
        </styled.BoxContainerSmall>
    )
}

export default DarkBlueWriteBox;
