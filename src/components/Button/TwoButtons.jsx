import React, {useEffect, useState} from "react";
import * as styled from "./ButtonStyles";
import edit from "../../icons/edit.png";
import add from "../../icons/add.png";
import all from "../../icons/settle_up_for_all.png";
import select from "../../icons/settle_up_for_selected_members.png";
import change from "../../icons/change_manager.png";
import {useNavigate} from "react-router-dom";
import done from "../../icons/done.png";


const TwoButtons = ({ButtonColor, ButtonText1,ButtonText2, ButtonIcon, ButtonIcon2, Dest, Dest2}) =>{
    const navigate = useNavigate();

    const iconList = { add, edit, all, select, change, done };
    const feat = iconList[ButtonIcon] || null;
    const feat2 = iconList[ButtonIcon2] || null;

    return (
        <styled.ButtonContainer>
            {feat !== null && feat2 !== null ?
                <>
                    <styled.ButtonContentContainer
                        style={{backgroundColor: `${ButtonColor}`}} onClick={() => navigate(`/${Dest}`)}>
                        <styled.TwoButtons>
                            <styled.TextBox>{ButtonText1}</styled.TextBox>
                            <styled.Icon src={feat}/>
                        </styled.TwoButtons>
                    </styled.ButtonContentContainer>
                    <div style={{width: "20px"}}/>
                    <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}
                                                   onClick={() => navigate(`/${Dest2}`)}>
                        <styled.TwoButtons>
                            <styled.TextBox>{ButtonText2}</styled.TextBox>
                            <styled.Icon src={feat2}/>
                        </styled.TwoButtons>
                    </styled.ButtonContentContainer>
                </>
                :
                <>
                    <styled.ButtonContentContainer
                        style={{backgroundColor: `${ButtonColor}`}} onClick={() => navigate(`/${Dest}`)}>
                        <styled.TwoButtons style={{display : "flex", justifyContent : 'center'}}>
                            <styled.TextBox style={{fontWeight : "bold", fontSize  : "20px"}}>{ButtonText1}</styled.TextBox>
                        </styled.TwoButtons>
                    </styled.ButtonContentContainer>
                    <div style={{width: "20px"}}/>
                    <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}
                                                   onClick={() => navigate(`/${Dest2}`)}>
                        <styled.TwoButtons style={{display : "flex", justifyContent : 'center'}}>
                            <styled.TextBox style={{fontWeight : "bold", fontSize  : "20px"}}>{ButtonText2}</styled.TextBox>
                        </styled.TwoButtons>
                    </styled.ButtonContentContainer>
                </>
            }
        </styled.ButtonContainer>
    );
}

export default TwoButtons;
