import React from "react";
import * as styled from "./styles";
import group_manager from "../../icons/group_manager.png";
import calculate from "../../icons/calculator.png";
import {useNavigate} from "react-router-dom";

const LightBlueBox = ({group,isList}) => {
    const navigate = useNavigate();
    return(
        <>
            {group && group.map(elements=>(
                    <styled.BoxContainerMedium key={elements.id} style={{width : "100vw"}} onClick={() => navigate((`/managegroup/${elements.id}`))}>
                        {isList ?
                            <styled.BoxContentsContainer>
                                <styled.TextContainer>
                                    <styled.TextBox style={{
                                        fontSize : '25px',
                                        fontWeight : 'bold'
                                    }}>{elements.title}</styled.TextBox>
                                    <styled.TextBox>{elements.startDate} ~
                                        {elements.endDate}</styled.TextBox>
                                </styled.TextContainer>
                                <styled.BoxIcon src={calculate}></styled.BoxIcon>
                            </styled.BoxContentsContainer>
                            :
                            <styled.BoxContentsContainer>
                                <styled.TextContainer>
                                    <styled.TextBox style={{
                                        fontSize : '25px',
                                        fontWeight : 'bold'
                                    }}>{elements.title}</styled.TextBox>
                                    <styled.TextBox>{elements.startDate} ~
                                        {elements.endDate}</styled.TextBox>
                                </styled.TextContainer>
                                {elements.isManager ?
                                    <styled.BoxIcon src={group_manager}/>
                                    :
                                    <div style={{width : "30px", height : "30px", border : 'none'}}></div>
                                }
                            </styled.BoxContentsContainer>
                        }
                    </styled.BoxContainerMedium>
            ))}

        </>

    )
}


export default LightBlueBox;
