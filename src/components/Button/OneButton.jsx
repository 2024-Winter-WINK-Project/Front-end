import React from "react";
import * as styled from "./ButtonStyles";
import quit from "../../icons/quit.png";

const OneButton = ({ButtonColor, ButtonText1}) =>{
    return (
        <styled.ButtonContainer >
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                <styled.OneButton>
                    <styled.TextBox>{ButtonText1}</styled.TextBox>
                    <styled.Icon src={quit}/>
                </styled.OneButton>
            </styled.ButtonContentContainer>
        </styled.ButtonContainer>
    );
}

export default OneButton;
