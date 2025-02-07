import React, {useEffect} from "react";
import * as styled from "./ButtonStyles";
import quit from "../../icons/quit.png";
import remove from "../../icons/remove.png";
import {useNavigate} from "react-router-dom";

const OneButton = ({ButtonColor, ButtonText1, ButtonText2, ButtonIcon, TextColor, Dest,isCopyRequired,isModalRequired, onDataChange,Tag}) =>{
    const iconList = { quit, remove };
    const navigate = useNavigate();
    const feat = iconList[ButtonIcon] || null;
    const openModal = () => {
        onDataChange(`${Tag}`,true);
    }
    return (
        <styled.ButtonContainer >
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                {/*아이콘 있는 버튼*/}
                {feat !== null ?
                    <>
                        {isModalRequired ?
                            <styled.OneButton onClick={openModal}>
                                <styled.TextBox>{ButtonText1}</styled.TextBox>
                                <styled.Icon src={feat}/>
                            </styled.OneButton>
                            :
                            <styled.OneButton onClick={() => navigate(`${Dest}`)}>
                                <styled.TextBox>{ButtonText1}</styled.TextBox>
                                <styled.Icon src={feat}/>
                            </styled.OneButton>
                        }

                    </>

                    :
                    <>
                        {/*아이콘 없는 버튼*/}
                        {/*텍스트 2개짜리*/}
                        {isCopyRequired ?
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}>
                                <styled.TextBox
                                    style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                                {ButtonText2 ?
                                    <styled.TextBox>{ButtonText2}</styled.TextBox>
                                    :
                                    <></>
                                }
                            </styled.OneButton>
                            :
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}
                                              onClick={() => navigate(`${Dest}`)}>
                                <styled.TextBox
                                    style={{color: `${TextColor}`, fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                            </styled.OneButton>
                        }

                    </>
                }

            </styled.ButtonContentContainer>
        </styled.ButtonContainer>
    );
}

export default OneButton;
