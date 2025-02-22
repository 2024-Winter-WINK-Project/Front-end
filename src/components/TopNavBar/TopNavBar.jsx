import React, {useState} from "react";
import back from "../../icons/back.png";
import done from "../../icons/done.png";
import add from "../../icons/add.png";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/modal.jsx";
import * as styled from "./styles";
import * as SessionCleaner from "../../components/Session/SessionStorageCleaner";
import {useNavigateBack} from "../Others/useNavigateBack";

const TopNavBar = ({pageName, feature, isModalRequired,isBackRequired, onDataChange, dest}) =>{
    const iconList = { add, done };
    const feat = iconList[feature] || null;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isJoinModalOpen, setJoinModalOpen] = useState(false);
    const navigateBack = useNavigateBack();

    const closeJoinModal = () => {
        setJoinModalOpen(false);
        navigate(dest);
    }

    const openModal = () => {
        onDataChange(`${feat}Modal`,true);
    }

    const sendSubmit = () => {
        navigate(dest);
        if (onDataChange && onDataChange(true)) {
            setOpen(true);
        }
        if (pageName === "모임 가입" && Nickname.trim() !== '') {
            setJoinModalOpen(true);
        }
    };


    return (
        <>
            {isModalRequired ?
                <>
                    <styled.BarContainer>
                        <styled.BarContentsContainer>
                            <styled.ButtonIcons src={back} onClick={() => {
                                SessionCleaner.SessionStorageCleaner();
                                navigateBack();}} />
                            <styled.TextWrapper>
                                <styled.TextBox>{pageName}</styled.TextBox>
                            </styled.TextWrapper>
                            {feat && <styled.ButtonIcons src={feat} onClick={openModal} /> /* feat이 있을 때만 버튼 표시 */}
                        </styled.BarContentsContainer>
                    </styled.BarContainer>
                    <Modal
                        isOpen={isJoinModalOpen}
                        handleConfirm={closeJoinModal}
                        closeModal={closeJoinModal}
                        message={"모임에 가입하시겠습니까?"}
                    />
                </>
                :
                <styled.BarContainer>
                    {isBackRequired ?
                        <styled.BarContentsContainer>
                            <styled.ButtonIcons src={back} onClick={() => {
                                SessionCleaner.SessionStorageCleaner();
                                navigateBack();
                            }}/>
                            <styled.TextWrapper>
                                <styled.TextBox>{pageName}</styled.TextBox>
                            </styled.TextWrapper>
                            {feat ?
                                <styled.ButtonIcons src={feat} onClick={sendSubmit}/>
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
