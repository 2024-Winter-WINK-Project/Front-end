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

const BackgroundBar = styled.nav`
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

const BackgroundBarPC = styled.div`
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

const TopBar = ({pageName, feature, isModalRequired, data}) =>{
    const iconList = [add, done];
    const [placeXPos, setPlaceXPos] = useState(0);
    const [placeYPos, setPlaceYPos] = useState(0);
    const [placeName, setPlaceName] = useState("");


    const SendInfo = () => {
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
                        <BackgroundBar>
                            <BarWrapper>
                                <ButtonIcons src={back} onClick={() => navigate('/', {replace : true })}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => {setOpen(true)}}/>
                            </BarWrapper>
                        </BackgroundBar>
                        {open === true ?
                            <Modal isOpen={open} onClose={() => {setOpen(false)}}></Modal>
                            :
                            null}
                    </>
                    :
                    <BackgroundBar>
                        <BarWrapper>
                            <ButtonIcons src={back} onClick={() => navigate("/",{replace : true})}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => SendInfo()}/>
                            </BarWrapper>
                    </BackgroundBar>
                }
            </Mobile>
            <PC>
                {isModalRequired ?
                    <>
                        <BackgroundBarPC>
                            <BarWrapper>
                                <ButtonIcons src={back} onClick={() => navigate('/', {replace : true })}/>
                                <TextWrapper>
                                    <Text>{pageName}</Text>
                                </TextWrapper>
                                <ButtonIcons src={feat} onClick={() => {setOpen(true)}}/>
                            </BarWrapper>
                        </BackgroundBarPC>
                        {open === true ?
                            <Modal isOpen={open} onClose={() => {setOpen(false)}}></Modal>
                            :
                            null}
                    </>
                    :
                    <BackgroundBarPC>
                        <BarWrapper>
                            <ButtonIcons src={back} onClick={() => navigate("/",{replace : true})}/>
                            <TextWrapper>
                                <Text>{pageName}</Text>
                            </TextWrapper>
                            <ButtonIcons src={feat} onClick={() => SendInfo()}/>
                        </BarWrapper>
                    </BackgroundBarPC>
                }
            </PC>

        </>)

}

export default TopBar;
