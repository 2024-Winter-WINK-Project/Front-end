import React, {useState} from "react";
import back from "../../icons/back.png";
import done from "../../icons/done.png";
import add from "../../icons/add.png";
import {useNavigate, useParams} from "react-router-dom";
import UploadModal from "../Modal/UploadModal.jsx";
import * as styled from "./styles";

const TopNavBar = ({pageName, feature, isModalRequired,isBackRequired, onDataChange, dest}) =>{
    const iconList = [add, done];

    let feat = null;

    if (feature === "add"){
        feat = iconList[0];
    }
    else if (feature === "done"){
        feat = iconList[1];
    }

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        closeModal();
    }
    const closeModal = () => {
        setOpen(false);
        navigate(dest);
    }
    const sendSubmit = () => {
        if (onDataChange(true) === true){
            setOpen(true);
        }
    }
    return (
        <>
            {isModalRequired ?
                <>
                    <styled.BarContainer>
                        <styled.BarContentsContainer>
                            <styled.ButtonIcons src={back} onClick={() => navigate("/",{replace : true})}/>
                            <styled.TextWrapper>
                                <styled.TextBox>{pageName}</styled.TextBox>
                            </styled.TextWrapper>
                            <styled.ButtonIcons src={feat} onClick={sendSubmit}/>
                        </styled.BarContentsContainer>
                    </styled.BarContainer>
                    <UploadModal isOpen={open}
                                 confirm={handleConfirm}
                                 closeModal={closeModal}
                                 content={"모임 생성을 완료했어요."}/>
                </>
                :
                <styled.BarContainer>
                    {isBackRequired ?
                        <styled.BarContentsContainer>
                            <styled.ButtonIcons src={back} onClick={() => navigate("/", {replace: true})}/>
                            <styled.TextWrapper>
                                <styled.TextBox>{pageName}</styled.TextBox>
                            </styled.TextWrapper>
                            {feat ?
                                <styled.ButtonIcons src={feat} onClick={() => SendInfo()}/>
                                :
                                <div style={{width: "30px", height: "30px"}}/>
                            }
                        </styled.BarContentsContainer>
                        :
                        <styled.BarContentsContainer>
                            <div style={{width: "30px", height: "30px"}}/>
                            <styled.TextWrapper>
                                <styled.TextBox>{pageName}</styled.TextBox>
                            </styled.TextWrapper>
                            <styled.ButtonIcons src={feat} onClick={() => navigate("/createmeeting", {replace: true})}/>
                        </styled.BarContentsContainer>
                    }

                </styled.BarContainer>
            }
        </>)

}

export default TopNavBar;
