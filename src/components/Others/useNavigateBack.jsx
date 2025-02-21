import { useNavigate, useLocation } from "react-router-dom";
import * as SessionCleaner from "./Crypto";

export const useNavigateBack = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return () => {
        // 현재 경로가 createmeeting일 때는 홈으로 이동
        if (location.pathname === '/createmeeting') {
            navigate(`/home?id=${sessionStorage.getItem("userId")}`);
        } else if (location.key === "default") {
            navigate(`/home?id=${sessionStorage.getItem("userId")}`);
        } else {
            navigate(-1);
        }
    };
};

// 브라우저 자체 뒤로가기 버튼의 경우
export const useBrowserRefresh = () => {
    return (
        window.onbeforeunload = function (event){
            SessionCleaner(200);
        }
    )
}
