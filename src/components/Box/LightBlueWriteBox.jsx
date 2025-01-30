import React from "react";
import location from "../../icons/location.png";
import * as styled from "./styles";
import mediaQuery from "react-responsive/src/mediaQuery";

const LightBlueBoxSingleLine = ({boxtitle, feature, to, popup, onDataChange}) => {

    const sendDataToParent = (event) => {
        onDataChange(event.target.id, event.target.value);
    }

    let dest = null;
    if (to !== null){
        dest = to;
    }
    else if (popup !== null){
        dest = popup;
    }

    return(
            <styled.BoxContainerSmall>
                {feature === "nickname" ?
                    <styled.BoxContentsContainerSmall>
                        <styled.InputContainer style={{width : "90%"}}>
                            <styled.TextContainer>
                                <styled.TextBox style={{
                                    width : "80px",
                                    fontSize : '20px',
                                }}>{boxtitle}</styled.TextBox>
                            </styled.TextContainer>
                            <styled.InputBox
                                             id = "nickName"
                                             style=
                                                 {{backgroundColor : "#E7EBF7",
                                                 color : "black"}}
                                             placeholder={"닉네임을 입력해 주세요."}
                                             onChange={sendDataToParent}/>

                        </styled.InputContainer>
                    </styled.BoxContentsContainerSmall>
                    :
                    <styled.BoxContentsContainerSmall>
                        <styled.InputContainer style={{width : "90%"}}>

                            <styled.TextContainer style={{width : "95%"}}>
                                <styled.TextBox style={{
                                    fontSize: '20px',
                                    width : '80px'
                                }}>{boxtitle}</styled.TextBox>
                            </styled.TextContainer>
                            <styled.BoxIcon src={location}
                                            onClick={() => {window.open(dest)}}/>

                        </styled.InputContainer>
                    </styled.BoxContentsContainerSmall>
                }

            </styled.BoxContainerSmall>

    )
}

export default LightBlueBoxSingleLine;
