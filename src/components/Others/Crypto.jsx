import CryptoJS from 'crypto-js';

const secretKey = '1a6v2d4x5d553s88we9q9qe7q9e79q13'; // 32자리 비밀키
const iv = 'a53sd2f4er54a2rw'; // 16자리 iv

// 암호화
export const encrypt = (text) => {
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString()
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '~');
};

// 복호화
export const decrypt = (encryptedText) => {
    const original = encryptedText
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .replace(/~/g, '=');
    const decipher = CryptoJS.AES.decrypt(original, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return decipher.toString(CryptoJS.enc.Utf8);
};
