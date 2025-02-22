import { useNavigate, useLocation } from "react-router-dom";

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

