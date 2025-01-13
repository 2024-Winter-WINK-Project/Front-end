import React, {useRef, useState} from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";
import TwoButtons from "./TwoButtons.jsx";
import OneButton from "./OneButton.jsx";

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width : 768px)"
    });

    return <>{isMobile && children}</>
}

export const PC = ({children}) => {
    const isPC = useMediaQuery({
        query : "(min-width : 769px)"
    });

    return <>{isPC && children}</>
}


// const ModalWrapper = styled.div`
//     width : 100%;
//     height: 100vh;
//     opacity: 60%;
//     background-color: black;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1;
//     position: absolute;
// `;

const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color : rgb(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: fixed;
    margin-top: -10vh;
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


`;

const ModalContentContainer = styled.div`
    width : 80%;
    height: 45%;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;



const ModalContent = styled.div`
    width : 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Modal = ({isOpen}) => {
    const openControl = childData => {

        console.log(isOpen);
    }
    console.log(isOpen);
    return (
        <>
            <Mobile>
                <ModalWrapper>
                    <ModalContainer>
                        <ModalContentContainer>
                            <ModalContent>
                                <p style={{color : "black"}}>모달입니당</p>
                                <OneButton isOpen={isOpen} onClick={openControl}></OneButton>
                            </ModalContent>
                        </ModalContentContainer>
                    </ModalContainer>
                </ModalWrapper>
            </Mobile>
            <PC>
                <ModalWrapper>
                    <ModalContainer style={{width : '500px'}}>
                        <ModalContentContainer>
                            <ModalContent>
                                <p style={{color : "black"}}>모달입니당</p>
                                <OneButton isOpen={isOpen} onClick={openControl}></OneButton>
                            </ModalContent>
                        </ModalContentContainer>
                    </ModalContainer>
                </ModalWrapper>
            </PC>
        </>
    )
}

export default Modal;
