export function SessionStorageCleaner(response_status){
    const tmpUserId = sessionStorage.getItem("userId");
    const tmpProfilePic = sessionStorage.getItem("profileUrl");
    const tmpNickname = sessionStorage.getItem("nickName");

    sessionStorage.clear();
    if (response_status !== 401){
        sessionStorage.setItem("userId",tmpUserId);
        sessionStorage.setItem("profileUrl",tmpProfilePic);
        sessionStorage.setItem("nickName",tmpNickname);
    }
}
