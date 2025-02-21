import {useEffect} from "react";

export const PrivateRoute = ({ children }) => {
    const cookies = document.cookie;

    useEffect(() => {
        if (!cookies.includes('jwt')) {
            alert("로그아웃 되었습니다. 다시 로그인 해 주세요.");
            window.location.href = '/';
        }
    }, [cookies]);

    return children;
};
