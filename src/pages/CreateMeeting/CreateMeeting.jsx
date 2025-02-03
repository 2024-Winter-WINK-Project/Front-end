import React, {useEffect, useRef, useState} from "react";
import TopNavBar from "../../components/TopNavBar/TopNavBar.jsx";
import DoubleColumnsBox from "../../components/Box/DoubleColumnsBox.jsx";
import KakaoMap from "../MovingKakaoMap/KakaoMap.jsx";
import axios from "axios";
import UploadModal from "../../components/Modal/UploadModal";
import * as styled from "./styles";
import DarkBlueBox from "../../components/Box/DarkBlueWriteBox";
import DarkBlueWriteBox from "../../components/Box/DarkBlueWriteBox";
import LightBlueWriteBox from "../../components/Box/LightBlueWriteBox";
import ModalTemplate from "../../components/Modal/ModalTemplate";
import close from "../../icons/close.png";
import DoneModal from "../../components/Modal/DoneModal";


const CreateMeeting = () => {
    const placeLat = 37.402056;
    const placeLon = 127.108212;
    const placeName = "";
    const [currId, setCurrId] = useState(null);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [doneModalOpen, setDoneModalOpen] = useState(false);

    const [basicInfo, setBasicInfo] = useState({
       id : 0,
       title : "",
       startDate : 0,
       endDate : 0,
       places : {
           placeId : 0,
           placeName : "",
           placeLon : 0,
           placeLat : 0
       },
       members : {
           socialId:  0,
           nickName: "",
           permission: "",
           profilePicture: "",
           isQuit: false
       },
        ledgers : {
            balance : 0,
            kakaoURL : "",
            tossURL : "",
            bankAccNum  : ""
        }
    });


    useEffect(() => {
        const savedValues = JSON.parse(localStorage.getItem('multiForm'));
        if (savedValues) {
            setBasicInfo(savedValues);
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/meeting?_sort=-id&_limit=1`)
            .then((response) => response.json())
            .then((json) => setCurrId(Number(json[0].id)+1))
            .catch((error) => {
                console.log(error)
                setCurrId(1)
            });
    }, []);

    const handleChange = (e) => {
        const {key, value} = e.target;
        const updateValues = {...basicInfo, [key]:value};
        setBasicInfo(updateValues);
        localStorage.setItem('multiform', JSON.stringify(updateValues));
    };

    const handleDataChange = async (id,value) => {
        console.log(id, ":",value);
        if (id === "uploadModal"){
            setUploadModalOpen(value);
        }
        else if(id === "doneModal"){
            setDoneModalOpen(value);
        }
    }


    const handleSubmit = (e) =>{
        // e.preventDefault();
        setDoneModalOpen(true);
        // try{
        //     axios
        //         .post("http://localhost:8000/meeting", {
        //             id:currId,
        //             title:groupName.current.current,
        //             startDate:startDate.current.current,
        //             endDate:endDate.current.current,
        //             isManager:true
        //         })
        //         .then((res) => {
        //             console.log(res)
        //             if (res === 200){
        //                 axios
        //                     .post("http://localhost:8000/place",{
        //                         id:currId,
        //                         placeId:123456789,
        //                         placeName : placeName,
        //                         placeLon:placeLon,
        //                         placeLat:placeLat
        //                     })
        //                     .then((res) => {
        //                         console.log(res)
        //                         if(res === 200){
        //                             axios
        //                                 .post("http://localhost:8000/members",{
        //                                     id : currId,
        //                                     memberId : Number(String(currId) + "00"),
        //                                     socialId : Number(String(20250101) + "00" + String(1)),
        //                                     nickName : nickName.current,
        //                                     permission : "OWNER",
        //                                     profilePicture : "",
        //                                     isQuit : false
        //                                 })
        //                                 .then((res) => {
        //                                     console.log(res)
        //                                     if(res === 200){
        //                                         axios
        //                                             .post("http://localhost:8000/ledgers",{
        //                                                 id : currId,
        //                                                 ledgersId : Number(String(startDate.current) + "1"),
        //                                                 balance : 0,
        //                                                 kakaoURL : settleUpURL.current,
        //                                                 tossURL : settleUpURL.current,
        //                                                 bankAccNum : "123456789",
        //                                                 ledgerDetails : [{}]
        //                                             })
        //                                             .then((res) => {
        //                                                 console.log(res)
        //                                             })
        //                                             .catch((err) => {
        //                                                 console.log(err)
        //                                             })
        //                                     }
        //                                 })
        //                         }
        //                     })
        //             }
        //         });
        //
        //     return true;
        //
        // } catch(err){
        //     alert("모임 생성을 위해 필요한 정보를 입력해 주세요.");
        //     return false;
        // }



    }
    return (
        <styled.BodyContainer>
            <TopNavBar pageName={"모임 생성"}
                       feature={"done"}
                       isBackRequired={true}
                       isModalRequired={true}
                       onDataChange={handleSubmit}
                       dest={"/"}/>
            <styled.FormContainer>
                <DarkBlueWriteBox feature={""}
                             boxTitle={"모임명"}
                             eventTitle={"모임 제목을 입력해 주세요."}
                             onDataChange={handleDataChange}/>
                <LightBlueWriteBox feature={"nickname"}
                                        boxtitle={"닉네임"}
                                        onDataChange={handleDataChange}/>
                <LightBlueWriteBox feature={"location"}
                                        style={{paddingTop: "none"}}
                                        boxtitle={"모임 장소"}
                                        page={"/movingkakaomap"}/>
                <KakaoMap lat={placeLat}
                          lon={placeLon}
                          pName={placeName}/>
                <DoubleColumnsBox feature={"calendar"}
                                  firstLine={"모임 시작날짜"}
                                  secondLine={"모임 종료날짜"}
                                  isEditable={true}
                                  onDataChange={handleDataChange}/>
                <DoubleColumnsBox feature={"plus"}
                                  firstLine={"정산링크 등록"}
                                  secondLine={"나중에 설정에서 변경할 수 있어요"}
                                  isEditable={false}
                                  onDataChange={handleDataChange}/>
                <ModalTemplate isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)}>
                    <UploadModal onDataChange={() => setUploadModalOpen(false)}/>
                </ModalTemplate>
                <ModalTemplate isOpen={doneModalOpen} onClose={() => setDoneModalOpen(false)}>
                    <DoneModal onDataChange={() => setDoneModalOpen(false)}/>
                </ModalTemplate>
            </styled.FormContainer>
        </styled.BodyContainer>
    )
}

export default CreateMeeting;
