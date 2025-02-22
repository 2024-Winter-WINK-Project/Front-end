import * as crypto from "../Others/Crypto"

export function ValuesCheck(key,id) {
    if (key === "userId"){
        if(sessionStorage.getItem(key) !== id) {
            window.location.href = "/404";
        }
    }
    else if (key === "isOwner") {
        if (id !== crypto.encrypt("true") && id !== crypto.encrypt("false")){
            window.location.href = "/404";
        }
    }
    return null;
}
