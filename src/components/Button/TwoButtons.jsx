import React, {useEffect, useState} from "react";
import * as styled from "./ButtonStyles";
import edit from "../../icons/edit.png";
import add from "../../icons/add.png";
import all from "../../icons/settle_up_for_all.png";
import select from "../../icons/settle_up_for_selected_members.png";
import change from "../../icons/change_manager.png";
import remove from "../../icons/remove_members.png";
import {useNavigate} from "react-router-dom";


const TwoButtons = ({isModalRequired,ButtonColor, ButtonText1,ButtonText2, ButtonColor2, ButtonIcon, ButtonIcon2, Dest, Dest2, onDataChange,Tag, Type}) =>{
    const navigate = useNavigate();

    const iconList = { add, edit, all, select, change, remove };
    const feat = iconList[ButtonIcon] || null;
    const feat2 = iconList[ButtonIcon2] || null;

    const openModal = () => {
        onDataChange(`${Tag}`,true);

    }
    return (
        <styled.ButtonContainer>
            {/*둘 다 아이콘 있는 버튼*/}
            {feat !== null && feat2 !== null ?
                <>
                    {isModalRequired ?
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
                                                           onClick={openModal}>
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

                    }

                </>
                :
                <>
                    {/*아이콘 없는 버튼*/}
                    {isModalRequired ?
                        <>
                            <styled.ButtonContentContainer
                                style={{backgroundColor: `${ButtonColor}`}} onClick={() => navigate(`/${Dest}`)}>
                                <styled.TwoButtons style={{display: "flex", justifyContent: 'center'}}>
                                    <styled.TextBox
                                        style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                                </styled.TwoButtons>
                            </styled.ButtonContentContainer>
                            <div style={{width: "20px"}}/>
                            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor2}`}}>
                                <styled.TwoButtons style={{display: "flex", justifyContent: 'center'}}>
                                    <styled.TextBox
                                        style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText2}</styled.TextBox>
                                </styled.TwoButtons>
                            </styled.ButtonContentContainer>
                        </>
                        :
                        <>
                            <styled.ButtonContentContainer
                                style={{backgroundColor: `${ButtonColor}`}} onClick={() => {
                                if (Type === 'URL') {
                                    window.open(`${Dest}`)
                                }
                                else {
                                    navigate(`/${Dest}`)
                                }
                            }}>
                                <styled.TwoButtons style={{display: "flex", justifyContent: 'center'}}>
                                    <styled.TextBox
                                        style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                                </styled.TwoButtons>
                            </styled.ButtonContentContainer>
                            <div style={{width: "20px"}}/>
                            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}
                                                           onClick={() => {
                                                               if (Type === 'URL') {
                                                                   window.open(`${Dest2}`)
                                                               }
                                                               else {
                                                                   navigate(`/${Dest2}`)
                                                               }
                                                           }}>
                                <styled.TwoButtons style={{display: "flex", justifyContent: 'center'}}>
                                    <styled.TextBox
                                        style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText2}</styled.TextBox>
                                </styled.TwoButtons>
                            </styled.ButtonContentContainer>
                        </>

                    }

                </>
            }
        </styled.ButtonContainer>
    );
}

export default TwoButtons;
