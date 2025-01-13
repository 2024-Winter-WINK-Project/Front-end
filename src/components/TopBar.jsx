import React, {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";
import styled from "styled-components";
import back from "../icons/back.png";
import done from "../icons/done.png";
import add from "../icons/add.png";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../components/Modal.jsx";
import TwoButtons from "./TwoButtons.jsx";


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

const Background_Bar = styled.nav`
    background-color: white;
    opacity: 90%;
    width: 100vw;
    height: 10vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    
`;

const Background_BarPC = styled.div`
    background-color: white;
    opacity: 90%;
    width: 500px;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
`;

const ButtonIcons = styled.img`
    width: 30px;
    height: 30px;
`;

const BarWrapper = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    width: 90%;
`;

const TextWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const Text = styled.text`
    width: 100%;
    font-size: 22px;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

function TopBar ({pageName, feature, isModalRequired, data}){
    const iconList = [add, done];
    const [placeXPos, setPlaceXPos] = useState(0);
    const [placeYPos, setPlaceYPos] = useState(0);
    const [placeName, setPlaceName] = useState("");


    const sendInfo = () => {
        if (placeXPos !== null && placeYPos !== null){
            navigate('/createevent', {state:{xPos : placeXPos, yPos : placeYPos, pName : placeName }});
        }
        else{
            navigate('/createevent');
        }

    }
    useEffect(() => {
        if (data !== undefined){
            setPlaceName(data[1]);
            setPlaceXPos(data[2]);
            setPlaceYPos(data[3]);
        }

    }, [data]);
    let feat = null;

    if (feature === "add"){
        feat = iconList[0];
    }
    else if (feature === "done"){
        feat = iconList[1];
    }
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Mobile>
                {isModalRequired ?
                    <>
                        <Background_Bar>
                            <BarWrapper>
                                <ButtonIcons src={back} onClick={() => navigate('/', {replace : true })}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => {setOpen(true)}}/>
                            </BarWrapper>
                        </Background_Bar>
                        {open == true ?
                            <Modal isOpen={open} onClose={() => {setOpen(false)}}></Modal>
                            :
                            null}
                    </>
                    :
                    <Background_Bar>
                        <BarWrapper>
                            <ButtonIcons src={back} onClick={() => navigate("/",{replace : true})}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => sendInfo()}/>
                            </BarWrapper>
                    </Background_Bar>
                }
            </Mobile>
            <PC>
                {isModalRequired ?
                    <>
                        <Background_BarPC>
                            <BarWrapper>
                                <ButtonIcons src={back} onClick={() => navigate('/', {replace : true })}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => {setOpen(true)}}/>
                            </BarWrapper>
                        </Background_BarPC>
                        {open == true ?
                            <Modal isOpen={open} onClose={() => {setOpen(false)}}></Modal>
                            :
                            null}
                    </>
                    :
                    <Background_BarPC>
                        <BarWrapper>
                            <ButtonIcons src={back} onClick={() => navigate("/",{replace : true})}/>
                            <TextWrapper>
                                <Text>{pageName}</Text>
                            </TextWrapper>
                            <ButtonIcons src={feat} onClick={() => sendInfo()}/>
                        </BarWrapper>
                    </Background_BarPC>
                }
            </PC>

        </>)

}

export default TopBar;
