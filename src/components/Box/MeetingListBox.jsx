import React from "react";
import * as styled from "./styles";
import group_manager from "../../icons/group_manager.png";
import calculate from "../../icons/calculator.png";
import {useNavigate} from "react-router-dom";
import * as crypto from "../Others/Crypto";


const MeetingListBox = ({group,isList}) => {
    const navigate = useNavigate();

    return(
        <>
            {group && group.map(elements=>(
                    <styled.BoxContainerMedium key={elements.id}>
                        {isList ?
                            <styled.BoxContentsContainerMedium>
                                <styled.TextContainer onClick={() => {
                                    navigate((`/managemeeting/${elements.id}/` + crypto.encrypt(`${elements.owner}`)))}}>
                                    <styled.TextBox style={{
                                        fontSize: '25px',
                                        fontWeight: 'bold'
                                    }}>{elements.name}</styled.TextBox>
                                    <styled.TextBox>{elements.startTime.slice(0, 10)} ~ {elements.endTime.slice(0, 10)}</styled.TextBox>

                                </styled.TextContainer>
                                <styled.BoxIcon onClick={() => navigate((`/budget/${elements.id}/`)+ (crypto.encrypt(`${elements.owner}`)))}
                                                src={calculate}></styled.BoxIcon>
                            </styled.BoxContentsContainerMedium>
                            :
                            <styled.BoxContentsContainerMedium
                                onClick={() => navigate((`/managemeeting/${elements.id}/` + crypto.encrypt(`${elements.owner}`)))}>
                                <styled.TextContainer>
                                    <styled.TextBox style={{
                                        fontSize: '25px',
                                        fontWeight: 'bold'
                                    }}>{elements.name}</styled.TextBox>
                                    <styled.TextBox>{elements.startTime.slice(0,10)} ~ {elements.endTime.slice(0,10)}</styled.TextBox>

                                </styled.TextContainer>
                                {elements.owner ?
                                    <styled.BoxIcon src={group_manager}/>
                                    :
                                    <div style={{width: "30px", height: "30px", border: 'none'}}></div>
                                }
                            </styled.BoxContentsContainerMedium>
                        }
                    </styled.BoxContainerMedium>
            ))}

        </>

    )
}


export default MeetingListBox;
