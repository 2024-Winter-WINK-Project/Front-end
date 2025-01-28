import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/login.jsx";
import MeetingList from "./pages/MeetingList/MeetingList.jsx";
import CreateMeeting from "./pages/CreateMeeting/CreateMeeting.jsx";
import MovingKakaoMap from "./pages/MovingKakaoMap/MovingKakaoMap.jsx";
import ManageMeeting from "./pages/ManageMeeting/ManageMeeting.jsx";
import MyPage from "./pages/MyPage/myPage.jsx";
import Budget from "./pages/Budget/budget.jsx";
import AddHistory from "./pages/History/addHistory.jsx";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import {useEffect} from "react";



const App = () =>{
    useEffect(() => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        })

    }, []);

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/meetinglist" element={<MeetingList />}/>
                    <Route path="/createmeeting" element={<CreateMeeting />}/>
                    <Route path="/managemeeting/:meetingId" element={<ManageMeeting />}/>
                    <Route path="/movingkakaomap" element={<MovingKakaoMap />}/>
                    <Route path="/mypage" element={<MyPage />}/>
                    <Route path="/budget" element={<Budget />}/>
                    <Route path="/addhistory" element={<AddHistory />}/>
                </Routes>
                <BottomNavBar />
            </BrowserRouter>
        </>


)
}

export default App;
