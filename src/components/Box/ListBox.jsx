import React, {useEffect, useRef, useState} from "react";
import * as styled from "./styles";
import me from "../../icons/me.png";

const ListBox = ({data,owner, mode}) => {
    const [boxHeight,setBoxHeight] = useState();
    // console.log(owner)
    // console.log(data)
    var deleteList = new Set([]);
    useEffect(() => {
        if (data.length !== undefined){
            setBoxHeight(50 + (data[0].length* 50));
        }
        else{
            setBoxHeight(50);
        }
    }, [data.length]);

    const onDataChange = (selectedMemberId) => {
        console.log(selectedMemberId)
        sessionStorage.setItem("ownerId",selectedMemberId);
    }

    return (
        <styled.BoxContainerList style={{height : `${boxHeight}px`}}>
            <styled.BoxContentsContainerList>
                <styled.ListElement>
                    {data[0] && data[0].map(elements => (
                        <>
                            <div style={{width : "95%", display: "flex", alignItems : "center"}}>
                                <styled.ProfilePicWrapper>
                                    {elements.profilePicture !== null ?
                                        <styled.ProfilePic src={elements.profileImageUrl}/>
                                        :
                                        <div style={{background : `${me}`}}/>
                                    }

                                </styled.ProfilePicWrapper>
                                <styled.ListElements>
                                    {elements.nickname}
                                </styled.ListElements>
                                {mode ?
                                    <>
                                        {mode === "radio" ?
                                            <input type="radio"
                                                   name="member"
                                                   style={{width: "30px", height: "30px"}}
                                                   onChange={() => {
                                                       sessionStorage.setItem("ownerId",elements.memberId);
                                                   }}
                                                   disabled={elements.memberId === owner ? true : false}
                                            ></input>
                                            :
                                            <input type="checkbox"
                                                   style={{width: "30px", height: "30px"}}
                                                   disabled={elements.memberId === owner ? true : false}
                                                   id={elements.memberId}
                                                   onChange={() => {
                                                       if(document.getElementById(elements.memberId).checked === true){
                                                            deleteList.add(elements.memberId);
                                                       }
                                                       else {
                                                            deleteList.delete(elements.memberId);
                                                       }
                                                       sessionStorage.setItem("deleteMembersId",JSON.stringify(Array.from(deleteList)));

                                                   }}
                                            ></input>
                                        }
                                    </>
                                :
                                    <>
                                        {elements.socialId === 20250101000 ?
                                            <img src={me} style={{width: "30px", height: "30px"}}></img>
                                            :
                                            <div style={{width: "30px", height: "30px"}}></div>
                                        }
                                    </>
                                }

                            </div>
                            <>
                                {elements.id === (data[0].length - 2) ?
                                    <></>
                                    :
                                    <styled.DivideLine>
                                        {elements.id}
                                    </styled.DivideLine>
                                }
                            </>
                        </>


                    ))}
                </styled.ListElement>

            </styled.BoxContentsContainerList>
        </styled.BoxContainerList>

    )
}

export default ListBox;
