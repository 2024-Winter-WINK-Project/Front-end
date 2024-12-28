import React from "react";
import styled from "styled-components";
import {useMediaQuery} from "react-responsive";

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

const ButtonContainer = styled.div`
    width : 100vw;
    display: flex;
    justify-content: center;

`;
const ButtonContainerPC = styled.div`
    width : 500px;
    display: flex;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    // 모달창 버튼크기는 70%
    height: 70px;
    //margin-top : 20vh;
    text-align: center;
`;
const ColoredButton = styled.button`
    width: 80%;
    height: 100%;
    background-color: #0234A8;
    color: white;
    border-radius: 10px;
    border: none;
    display: inline-block;
`;

const TextBox = styled.text`
    font-size: 20px;
`;
const ThreeButtons = () =>{
    return (
        <>
            <Mobile>
                <ButtonContainer>
                    <ButtonWrapper>
                        <ColoredButton style={{marginRight : '3%'}}>
                            <TextBox>선택지 1</TextBox>
                        </ColoredButton>
                        <ColoredButton>
                            <TextBox>선택지 2</TextBox>
                        </ColoredButton>
                        <ColoredButton style={{marginLeft : '3%'}}>
                            <TextBox>선택지 3</TextBox>
                        </ColoredButton>
                    </ButtonWrapper>
                </ButtonContainer>


            </Mobile>
            <PC>
                <ButtonContainerPC>
                    <ButtonWrapper>
                        <ColoredButton style={{marginRight : '3%'}}>
                            <TextBox>선택지 1</TextBox>
                        </ColoredButton>
                        <ColoredButton>
                            <TextBox>선택지 2</TextBox>
                        </ColoredButton>
                        <ColoredButton style={{marginLeft : '3%'}}>
                            <TextBox>선택지 3</TextBox>
                        </ColoredButton>
                    </ButtonWrapper>
                </ButtonContainerPC>
            </PC>
        </>
    );
}

export default ThreeButtons;