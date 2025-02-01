import React from "react";
import * as styled from "./ButtonStyles";
import edit from "../../icons/edit.png";
import add from "../../icons/add.png";
import change from "../../icons/change_manager.png";
import remove from "../../icons/remove.png";
import quit from "../../icons/quit.png";


const TwoButtons = ({ButtonColor, ButtonText1,ButtonText2, ButtonIcon, ButtonIcon2}) =>{
    return (
        <styled.ButtonContainer>
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                <styled.TwoButtons>
                    <styled.TextBox>{ButtonText1}</styled.TextBox>
                    {ButtonIcon === "edit" ?
                        <styled.Icon src={edit}/>
                        :
                        <styled.Icon src={change}/>
                    }
                </styled.TwoButtons>
            </styled.ButtonContentContainer>
            <div style={{width : "20px"}}/>
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                <styled.TwoButtons>
                    <styled.TextBox>{ButtonText2}</styled.TextBox>
                    {ButtonIcon2 === "add" ?
                        <styled.Icon src={add}/>
                        :
                        <styled.Icon src={remove}/>
                    }                </styled.TwoButtons>
            </styled.ButtonContentContainer>
        </styled.ButtonContainer>
    );
}

export default TwoButtons;
