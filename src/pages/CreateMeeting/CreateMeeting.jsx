import React, {useEffect, useRef, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import {useLocation} from "react-router-dom";
import axios from "axios";
import UploadModal from "../../components/Modal/UploadModal";
import * as styled from "./styles";
import DarkBlueBox from "../../components/Box/DarkBlueWriteBox";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";


const CreateMeeting = () => {
    const location = useLocation();
    const placeLat = 37.402056;
    const placeLon = 127.108212;
    const placeName = "";
    const startDate = useRef(null);
    const endDate = useRef(null);
    const groupName = useRef(null);
    const nickName = useRef(null);
    const settleUpURL = useRef(null);
    const [currId, setCurrId] = useState(null);
    const [open, setOpen] = useState(false);
    const handleDataChange2 = async (newData) => {
        groupName.current = newData;
    }
    const handleDataChange3 = async (newData, newData2) => {
        startDate.current = newData;
        endDate.current = newData2;
    }
    const handleDataChange = async (newData) => {
        setOpen(newData);
    }
    const handleDataChange4 = async (newData) => {
        settleUpURL.current = newData;
        console.log(settleUpURL.current.current.current);
    }
    const handleDataChange5 = async (newData) => {
        nickName.current = newData;
    }


    const handleSubmit = (e) =>{
        // e.preventDefault();

        // try{
        //     axios
        //         .post("http://localhost:8000/meeting", {
        //             id:currId,
        //             title:groupName.current.current,
        //             startDate:startDate.current.current,
        //             endDate:endDate.current.current,
        //             place : {
        //                 placeName:placeName,
        //                 placeLon:placeLon,
        //                 placeLat:placeLat
        //             },
        //             members : [
        //                 {
        //                     id : Number(String(currId) + "00"),
        //                     meetingId : currId,
        //                     socialId : 20250101001,
        //                     nickName : nickName.current,
        //                     permission : "OWNER",
        //                     profilePicture : "",
        //                     isQuit : false
        //                 }
        //             ],
        //             ledger : {
        //                 id : Number(String(startDate.current).slice(2)),
        //                 balance : 0,
        //                 kakaoURL : settleUpURL.current,
        //                 tossURL : settleUpURL.current,
        //                 bankAccNum : "20120012346875",
        //                 ledgerDetails :[{}]
        //             }
        //
        //         })
        //         .then((res) => console.log(res));
        //
        //     return true;
        //
        // } catch(err){
        //     alert("모임 생성을 위해 필요한 정보를 입력해 주세요.");
        //     return false;
        // }



    }

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?_sort=-id&_limit=1`)
            .then((response) => response.json())
            .then((json) => setCurrId(Number(json[0].id)+1))
            .catch((error) => {
                console.log(error)
                setCurrId(1)
            });
    }, []);


    return (
        <styled.BodyContainer>
            <UploadModal isOpen={open}
                         content={"sendMoney"}
                         onDataChange={handleDataChange}
                         onDataChange2={handleDataChange4}/>
            <TopNavBar pageName={"모임 생성"}
                       feature={"done"}
                       isModalRequired={true}
                       isBackRequired={true}
                       onDataChange={handleSubmit}
                       dest={"/"}/>
            <styled.FormContainer>
                <DarkBlueWriteBox feature={""}
                             boxTitle={"모임명"}
                             onDataChange2={handleDataChange2}/>
                <LightBlueWriteBox feature={"nickname"}
                                        boxtitle={"닉네임"}
                                        onDataChange2={handleDataChange5}/>
                <LightBlueWriteBox feature={"location"}
                                        style={{paddingTop: "none"}}
                                        boxtitle={"모임 장소"}
                                        to={"/movingkakaomap"}/>
                <KakaoMap lat={placeLat}
                          lon={placeLon}
                          pName={placeName}/>
                <DoubleColumnsBox feature={"calendar"}
                                  firstLine={"모임 시작날짜"}
                                  secondLine={"모임 종료날짜"}
                                  isEditable={true}
                                  onDataChange={handleDataChange3}/>
                <DoubleColumnsBox feature={"plus"}
                                  firstLine={"정산링크 등록"}
                                  secondLine={"나중에 설정에서 변경할 수 있어요"}
                                  isEditable={false}
                                  onDataChange={handleDataChange}
                />

            </styled.FormContainer>
        </styled.BodyContainer>
    )
}

export default CreateMeeting;
