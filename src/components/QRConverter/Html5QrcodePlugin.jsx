import { Html5Qrcode } from 'html5-qrcode';
import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import upload from "../../icons/upload.png";  // 아이콘 import
import done from "../../icons/done.png";

const QRContainer = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploadLabel = styled.label`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploadIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const Html5QrcodePlugin = (label) => {
    const transferURL = useRef(null);
    const html5QrCode = useRef(null);
    const [isTossUploaded, setIsTossUploaded] =
        useState(sessionStorage.getItem("tossURL") ? true : false);
    const [isKakaoUploaded, setIsKakaoUploaded] =
        useState(sessionStorage.getItem("kakaoURL") ? true : false);

    const handleFileChange = async (e, value, valueKor) => {
        e.stopPropagation();  // 이벤트 전파 방지
        const imageFile = e.target.files[0];
        if (!imageFile) return;
        console.log(value)
        try {
            if (html5QrCode.current) {
                await html5QrCode.current.clear();
            }

            html5QrCode.current = new Html5Qrcode("qr-reader", {
                rememberLastUsedCamera: false
            });

            const decodedText = await html5QrCode.current.scanFile(imageFile, false);
            transferURL.current = decodedText;

            if (transferURL.current.search(value) !== -1){
                if (value === 'toss'){
                    setIsTossUploaded(true);
                    sessionStorage.setItem('tossURL',transferURL.current);
                    // alert(`${valueKor} 송금코드가 등록되었습니다.`);
                }
                else if (value === 'kakao'){
                    setIsKakaoUploaded(true);
                    sessionStorage.setItem('kakaoURL',transferURL.current);
                    // alert(`${valueKor} 송금코드가 등록되었습니다.`);
                }
            }

            else{
                alert(`유효하지 않은 ${valueKor} 송금코드입니다. 다시 시도해 주세요.`)
            }
            // 스캔 후 정리
            await html5QrCode.current.clear();
            e.target.value = '';
        } catch (err) {
            alert("유효하지 않은 송금코드입니다. 다시 시도해 주세요.");
            e.target.value = '';
        }
    };

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return async () => {
            if (html5QrCode.current) {
                await html5QrCode.current.clear();
            }
        };
    }, []);

    return (
        <>
            {label.label === 'kakao' ?
                <div onClick={(e) => e.stopPropagation()}>
                    <div id="qr-reader"/>
                    <label htmlFor="kakaoInput">
                        <img src={isKakaoUploaded ? done : upload} alt="Upload QR" style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
                    </label>
                    <input
                        id="kakaoInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'kakao', '카카오페이')}
                        style={{display: 'none'}}
                    />
                </div>
                :
                <div onClick={(e) => e.stopPropagation()}>
                    <div id="qr-reader"/>
                    <label htmlFor="tossInput">
                        <img src={isTossUploaded ? done : upload} alt="Upload QR" style={{width: '30px', height: '30px', cursor: 'pointer'}}/>
                    </label>
                    <input
                        id="tossInput"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'toss', '토스')}
                        style={{display: 'none'}}
                    />
                </div>
            }
        </>

    );
};


export default Html5QrcodePlugin;
