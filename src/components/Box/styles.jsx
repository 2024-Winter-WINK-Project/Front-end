import styled from "styled-components";

export const BoxContainerSmall = styled.li`
    width : 100vw;
    height: 70px;
    display: flex;
    justify-content: center;
    
    @media (min-width: 600px){
        width : 600px;
    }
    
`;

export const BoxContainerMedium = styled.li`
    width: 100vw;
    height: 110px;
    display: flex;
    justify-content: center;
    
    @media (min-width: 600px){
        width : 600px;
    }
`;


export const BoxContainerBig = styled.li`
    height: 150px;
    display: flex;
    justify-content: center;

    @media (min-width: 600px){
        width : 600px;
    }
`;

export const BoxContentsContainer = styled.div`
    border : none;
    border-radius: 10px;
    width: 90%;
    height: 100px;
    //singleLine : 60px
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputContainer = styled.div`
    width : 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TextBox = styled.div`
    text-align: left;
    color : black;
    line-height: 30px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

export const BoxIcon = styled.img`
    width: 30px;
    height: 30px;
`;

export const InputBox = styled.input`
    border: none;
    background-color: #0234A8;
    height: 70%;
    font-size: 18px;
    outline: none;
    color : white;
    width: 100%;
`;

export const DivideLine = styled.hr`
    border: 0;
    width: 95%;
    height: 1px;
    background-color: #A8B5DC;
`;
