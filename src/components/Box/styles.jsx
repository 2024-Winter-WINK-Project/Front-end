import styled from "styled-components";

export const BoxContainerSmall = styled.li`
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 600px){
        width : 550px;
    }
    
`;

export const BoxContainerMedium = styled.li`
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 600px){
        width : 550px;
    }
`;


export const BoxContainerBig = styled.li`
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 600px){
        width : 550px;
    }
`;

export const BoxContainerList = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 600px){
        width : 550px;
    }
`;

export const BoxContentsContainer = styled.div`
    border : none;
    border-radius: 10px;
    width: 100%;
    height: 100px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BoxContentsContainerMedium = styled.div`
    border : none;
    border-radius: 10px;
    width: 100%;
    height: 100px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const BoxContentsContainerSmall = styled.div`
    border : none;
    border-radius: 10px;
    width: 90vw;
    height: 60px;
    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
`;



export const BoxContentsContainerList = styled.div`
    border : none;
    border-radius: 10px;
    width: 100%;
    height: 100%;

    background-color: #E7EBF7;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ListElement = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ListElements = styled.div`
    width: 80%;
    height: 50px;
    display: flex;
    align-items: center;
`;

export const ProfilePicWrapper =styled.div`
    width : 50px;
    height : 50px;
    display : flex;
    align-items: center;
`;

export const ProfilePic = styled.img`
    width: 80%;
    height: 35px;
    border-radius: 30px;
    background-color: black;
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
    width: 200px;
    
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
