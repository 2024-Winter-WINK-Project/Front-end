import React from "react";
import styled from "styled-components";

const BlueBox = styled.div`
    background-color: #0234A8;
    border-radius: 15px;
    width: 360px;
    height: 90px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 6px 5px 1px rgba(86, 86, 86, 0.20);

`;

const TextBox = styled.text`
    width: 90%;
`;
const TitleBox = () =>{
    return(
        <BlueBox>
            <TextBox>제목 : </TextBox>
        </BlueBox>
    )
}


export default TitleBox;