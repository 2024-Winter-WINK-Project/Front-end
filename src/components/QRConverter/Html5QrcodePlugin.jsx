// file = Html5QrcodePlugin.jsx
import { Html5Qrcode } from 'html5-qrcode';
import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import upload from "../../icons/upload.png";

const QRContainer = styled.div`
    width : 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const UploadButton = styled.button`
    border: none;
    background: none;
`;

const ButtonBackground = styled.img`
    width: 30px;
    height: 30px;
`;


const Html5QrcodePlugin = ({onDataGet}) => {
    const transferURL = useRef(null);
    const clearScan = () => {
        onDataGet(transferURL);
    }
    useEffect(() => {
        const html5QrCode = new Html5Qrcode(/* element id */ "reader",undefined,false);
        // File based scanning
        const selectButton = document.getElementById("upload-button");
        selectButton.addEventListener('click', function(){
            fileinput.click();
        });
        const fileinput = document.getElementById('qr-input-file');
        fileinput.addEventListener('change', function(e) {
            if (e.target.files.length == 0) {
                // No file selected, ignore
                return;
            }
            const imageFile = e.target.files[0];
            html5QrCode.scanFile(imageFile, false)
                .then(decodedText => {
                    // success, use decodedText
                    transferURL.current = decodedText;
                    clearScan();
                    html5QrCode.clear();
                })
                .catch(err => {
                    // failure, handle it.
                    console.log(`Error scanning file. Reason: ${err}`)
                });
        });
    }, []);

    return (
        <QRContainer id="reader">
            <UploadButton id="upload-button" className="file-button upload-button">
                <ButtonBackground src={upload}/>
            </UploadButton>
            <input name="qr-input-file" type="file" id="qr-input-file" accept="image/*" hidden/>
        </QRContainer>


    );
};

export default Html5QrcodePlugin;
