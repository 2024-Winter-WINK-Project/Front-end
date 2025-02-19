import React, {useRef, useState} from "react";
import * as styled from "./ModalStyles";
import close from "../../icons/close.png";
import upload from "../../icons/upload.png";
import Html5QrcodePlugin from "../QRConverter/Html5QrcodePlugin";
import OneButton from "../Button/OneButton";
import TwoButtons from "../Button/TwoButtons";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const AskModal = ({mode,onDataChange}) => {
    const closeModal = () => {
        onDataChange("doneModal",false);
    }
    const params = useParams();
    const sessionStorageClear = (status) =>{
        if (status === 401){
            sessionStorage.removeItem("userId");
        }
    }
    const navigate = useNavigate();
    const stringToArr = (string) => {
        console.log(JSON.parse(sessionStorage.getItem("deleteMembersId")).length);

    }
    const submitData = (operations) =>{
        if (operations === "deletemember"){
            var tmpArr = JSON.parse(sessionStorage.getItem("deleteMembersId"));
            for (let i = 0; i < tmpArr.length; i++) {
                if (tmpArr[i] === ','){
                    continue;
                }
                else{
                    if ((removeMembers(tmpArr[i])) === 0){
                        return 0;
                    }
                }
            }
            stringToArr();
            alert("모임 멤버 삭제를 완료했어요. 확인 버튼을 누르면 모임 조회 화면으로 이동해요.");
            navigate(`/managemeeting/${params.meetingId}?owner=true`);

        }
        else if (operations === "deletemeeting"){
            axios(`http://localhost:8080/meetings/${window.location.pathname.slice(15)}`, {
                method : 'DELETE',
                headers : {
                    Authorization : `Bearer ${document.cookie}`,
                    withCredentials : true
                },
            })
                .then(res=>{
                    console.log(res.status);
                    if (res.status === 200){
                        alert("모임 삭제를 완료했어요. 확인 버튼을 누르면 홈화면으로 이동해요.");
                        navigate(`/home/${sessionStorage.getItem("userId")}`);
                    }
                })
                .catch(e=>{
                    console.log(e);
                    if (e.status === 401){
                        alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                        sessionStorageClear(e.status);
                        navigate('/login');
                    }
                    else{
                        alert(`모임장 삭제에 실패했어요.`);
                    }

                });
        }
        else if (operations === "quitmeeting"){
            axios(`http://localhost:8080/meetings/${window.location.pathname.slice(15)}/members`, {
                method : 'DELETE',
                headers : {
                    Authorization : `Bearer ${document.cookie}`,
                    withCredentials : true
                },
            })
                .then(res=>{
                    console.log(res.status);
                    if (res.status === 200){
                        alert("모임 탈퇴를 완료했어요. 모임 재가입은 초대 코드를 받으면 가능해요. 확인 버튼을 누르면 홈화면으로 이동해요.");
                        navigate(`/home/${sessionStorage.getItem("userId")}`);
                    }
                })
                .catch(e=>{
                    console.log(e);
                    if (e.status === 401){
                        alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                        sessionStorageClear(e.status);
                        navigate('/login');
                    }
                    else{
                        alert(`모임 탈퇴에 실패했어요.`);
                    }

                });
        }
    }
    const removeMembers = (i) => {
        axios(`http://localhost:8080/meetings/${params.meetingId}/members/${i}`, {
            method : 'DELETE',
            headers : {
                Authorization : `Bearer ${document.cookie}`,
                withCredentials : true
            },
        })
            .then(res=>{console.log(res.status);})
            .catch(e=>{
                console.log(e);
                if (e.status === 401){
                    alert("로그아웃 되었어요. 다시 로그인 해 주세요.");
                    sessionStorageClear(e.status);
                    navigate('/login');
                }
                else{
                    alert(`멤버 삭제에 실패했어요. 다시 시도해 주세요.`);
                    return 0;
                }

            }
        );
    }
    return (
        <>
            <styled.TitleBoxContainer>
                <styled.TitleBox>
                    <styled.TextBox style={{fontWeight: "bold"}}>{mode}</styled.TextBox>
                </styled.TitleBox>
                <styled.CloseIcon src={close} onClick={closeModal}/>
            </styled.TitleBoxContainer>
            <div style={{display: "flex", alignItems: "center", height: "80px"}}>
                <styled.TextBox
                    style={{fontSize: "20px", textAlign: "left", width: "90%"}}>
                    {mode} 후에는 취소가 불가해요. 이대로 진행하시겠어요?
                </styled.TextBox>
            </div>

            <TwoButtons ButtonColor={"#F7E7E7"}
                        TextColor={"black"}
                        ButtonText1={"예"}
                        Dest={``}
                        ButtonColor2={"#E7EBF7"}
                        ButtonText2={"아니오"}
                        isModalRequired={true}
                        onSubmit={submitData}
                        Dest2={``}
                        Type={mode}/>
        </>
    );
};

export default AskModal;
