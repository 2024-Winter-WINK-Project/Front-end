import React, {useEffect} from "react";
import * as styled from "./ButtonStyles";
import quit from "../../icons/quit.png";
import remove from "../../icons/remove.png";
import {useNavigate} from "react-router-dom";

const OneButton = ({isModalRequired, ButtonColor, ButtonText1, ButtonText2, ButtonIcon, TextColor, Dest}) =>{
    const iconList = { quit, remove };
    const navigate = useNavigate();
    const feat = iconList[ButtonIcon] || null;
    const handleBankAccGet = () => {
        alert("계좌번호가 복사되었어요.")
    }


    return (
        <styled.ButtonContainer >
            <styled.ButtonContentContainer style={{backgroundColor: `${ButtonColor}`}}>
                {/*아이콘 있는 버튼*/}
                {feat !== null ?
                    <styled.OneButton onClick={() => navigate(`${Dest}`)}>
                        <styled.TextBox>{ButtonText1}</styled.TextBox>
                        <styled.Icon src={feat}/>
                    </styled.OneButton>
                    :
                    <>
                        {/*아이콘 없는 버튼*/}
                        {/*텍스트 2개짜리*/}
                        {ButtonText2 ?
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}
                                              onClick={handleBankAccGet}>
                                <styled.TextBox
                                    style={{fontWeight: "bold", fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                                <styled.TextBox>{ButtonText2}</styled.TextBox>
                            </styled.OneButton>
                            :
                            <styled.OneButton style={{display: 'flex', justifyContent: "center", gap: "40px"}}
                                              onClick={() => navigate(`${Dest}`)}>
                                <styled.TextBox
                                    style={{color: `${TextColor}`,fontSize: "20px"}}>{ButtonText1}</styled.TextBox>
                            </styled.OneButton>
                        }
                    </>
                }

            </styled.ButtonContentContainer>
        </styled.ButtonContainer>
    );
}

export default OneButton;
