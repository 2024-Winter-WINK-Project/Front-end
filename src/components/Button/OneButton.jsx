import React from "react";
import * as styled from "./ButtonStyles";
import quit from "../../icons/quit.png";
import remove from "../../icons/remove.png";

const OneButton = ({ButtonColor, ButtonText1, ButtonText2, ButtonIcon}) =>{
    const iconList = { quit, remove };
    const feat = iconList[ButtonIcon] || null;
    return (
        <styled.ButtonContainer >
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                {feat !== null ?
                    <styled.OneButton>
                        <styled.TextBox>{ButtonText1}</styled.TextBox>
                        <styled.Icon src={feat}/>
                    </styled.OneButton>
                    :
                    <>
                        {ButtonText2 ?
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}>
                                <styled.TextBox
                                    style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                                <styled.TextBox>{ButtonText2}</styled.TextBox>
                            </styled.OneButton>
                            :
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}>
                                <styled.TextBox
                                    style={{color: "#0234A8",fontSize: "25px"}}>{ButtonText1}</styled.TextBox>
                            </styled.OneButton>
                        }
                    </>
                }

            </styled.ButtonContentContainer>
        </styled.ButtonContainer>
    );
}

export default OneButton;
