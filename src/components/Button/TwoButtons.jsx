import React, {useEffect, useState} from "react";
import * as styled from "./ButtonStyles";
import edit from "../../icons/edit.png";
import add from "../../icons/add.png";
import all from "../../icons/settle_up_for_all.png";
import select from "../../icons/settle_up_for_selected_members.png";
import change from "../../icons/change_manager.png";
import remove from "../../icons/remove_members.png";
import {useNavigate,useLocation} from "react-router-dom";


const TwoButtons = ({isModalRequired,ButtonColor,
                        ButtonText1,ButtonText2,
                        ButtonColor2, ButtonIcon,
                        ButtonIcon2, Dest, Dest2,
                        onDataChange,Tag, Type, onSubmit}) =>{
    const navigate = useNavigate();
    const iconList = { add, edit, all, select, change, remove };
    const feat = iconList[ButtonIcon] || null;
    const feat2 = iconList[ButtonIcon2] || null;
    const openModal = () => {
        onDataChange(`${Tag}`,true);
    }

    const submitData = () =>{
        if (Type === '멤버 삭제'){
            onSubmit('deletemember');
        }
        else if (Type === '모임 삭제'){
            onSubmit('deletemeeting');
        }
        else if (Type === '모임 탈퇴'){
            onSubmit('quitmeeting')
        }
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
                                style={{backgroundColor: `${ButtonColor}`}} onClick={() => submitData()}>
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
                                    if (Dest === null) {
                                        alert("모임장이 해당 송금코드를 등록하지 않았어요. 다른 방법으로 시도해 주세요.")
                                    }
                                    else {
                                        window.open(`${Dest}`)
                                    }
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
                                                                   if (Dest2 === null) {
                                                                       alert("모임장이 해당 송금코드를 등록하지 않았어요. 다른 방법으로 시도해 주세요.")
                                                                   }
                                                                   else {
                                                                       window.open(`${Dest2}`)
                                                                   }
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
