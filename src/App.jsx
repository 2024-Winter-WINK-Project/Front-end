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
import HistoryDetail from './pages/History/HistoryDetail.jsx';
import Nickname from "./pages/Nickname/nickname.jsx";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import {useEffect} from "react";
import GlobalStyles from "./GlobalStyles";
import ChangeManager from "./pages/ManageMeeting/ChangeManager";
import EditMeeting from "./pages/ManageMeeting/EditMeeting";
import Transfer from "./pages/Transfer/Transfer";
import SelectMembers from "./pages/ManageMeeting/SelectMembers";
import LoginCallback from './pages/Login/loginCallback';


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
        <BrowserRouter>
                <GlobalStyles/>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route exact path='/oauth' element={<LoginCallback />} />
                    <Route path="/home/:memberId" element={<Home />}/>
                    <Route path="/meetinglist/:memberId" element={<MeetingList />}/>
                    <Route path="/createmeeting" element={<CreateMeeting />}/>
                    <Route path="/managemeeting/:meetingId" element={<ManageMeeting />}/>
                    <Route path="/managemeeting/:meetingId/edit" element={<EditMeeting />}/>
                    <Route path="/managemeeting/:meetingId/changemanager" element={<ChangeManager />}/>
                    <Route path="/managemeeting/:meetingId/removemembers" element={<SelectMembers />}/>
                    <Route path="/transfer/:meetingId/selectmembers" element={<SelectMembers />}/>
                    <Route path="/movingkakaomap" element={<MovingKakaoMap />}/>
                    <Route path="/nickname" element={<Nickname />}/>
-                    <Route path="/mypage/:memberId" element={<MyPage />}/>
                    <Route path="/budget/:meetingId" element={<Budget />}/>
                    <Route path="/budget/:meetingId/transfer" element={<Transfer />}/>
                    <Route path="/addhistory" element={<AddHistory />}/>
                    <Route path="/history/:id" element={<HistoryDetail />} />
                </Routes>
                <BottomNavBar />
        </BrowserRouter>
    )
}

export default App;
