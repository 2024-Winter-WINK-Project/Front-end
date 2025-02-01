import React, {useEffect, useRef, useState} from "react";
import * as styled from "./styles";
import me from "../../icons/me.png";

const ListBox = ({data}) => {
    const [boxHeight,setBoxHeight] = useState();

    useEffect(() => {
        if (data.length !== undefined){
            setBoxHeight(50 + (data.length* 50));
        }
        else{
            setBoxHeight(50);
        }
    }, [data.length]);

    return (
        <styled.BoxContainerList style={{height : `${boxHeight}px`}}>
            <styled.BoxContentsContainerList>

                <styled.ListElement>
                    {data && data.map(elements => (
                        <>
                            <div style={{width : "95%", display: "flex", alignItems : "center"}}>
                                <styled.ProfilePicWrapper>
                                    {elements.profilePicture !== "" ?
                                        <styled.ProfilePic src={elements.profilePicture}/>
                                        :
                                        <div style={{background : `${me}`}}/>
                                    }

                                </styled.ProfilePicWrapper>
                                <styled.ListElements>
                                    {elements.nickName}
                                </styled.ListElements>
                                {elements.socialId === 20250101000 ?
                                    <img src={me} style={{width: "30px", height: "30px"}}></img>
                                    :
                                    <div style={{width: "30px", height: "30px"}}></div>
                                }
                            </div>
                            <styled.DivideLine/>
                        </>


                    ))}
                </styled.ListElement>

            </styled.BoxContentsContainerList>
        </styled.BoxContainerList>

    )
}

export default ListBox;
