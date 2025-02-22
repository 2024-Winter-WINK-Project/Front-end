export function SessionStorageCleaner(response_status){
    const tmpData = sessionStorage.getItem("userId");
    sessionStorage.clear();
    if (response_status !== 401){
        sessionStorage.setItem("userId",tmpData);
    }
}
