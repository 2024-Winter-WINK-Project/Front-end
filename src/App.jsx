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
import InvitationCallback from './pages/Nickname/checkInvite.jsx';
import Nickname from "./pages/Nickname/nickname.jsx";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";
import {useEffect} from "react";
import GlobalStyles from "./GlobalStyles";
import ChangeManager from "./pages/ManageMeeting/ChangeManager";
import EditMeeting from "./pages/ManageMeeting/EditMeeting";
import Transfer from "./pages/Transfer/Transfer";
import SelectMembers from "./pages/ManageMeeting/SelectMembers";
import LoginCallback from './pages/Login/loginCallback';
import {PrivateRoute} from './components/Session/PrivateRoute';
import NotFound from "./pages/NotFound/NotFound";

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
                    <Route index element={<Login />}/>
                    <Route exact path='/oauth' element={<LoginCallback />} />
                    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
                    <Route path="/meetinglist" element={<PrivateRoute><MeetingList /></PrivateRoute>}/>
                    <Route path="/createmeeting" element={<PrivateRoute><CreateMeeting /></PrivateRoute>}/>
                    <Route path="/managemeeting/:meetingId/:skey" element={<PrivateRoute><ManageMeeting /></PrivateRoute>}/>
                    <Route path="/managemeeting/:meetingId/:skey/edit" element={<PrivateRoute><EditMeeting /></PrivateRoute>}/>
                    <Route path="/managemeeting/:meetingId/:skey/changemanager" element={<PrivateRoute><ChangeManager /></PrivateRoute>}/>
                    <Route path="/managemeeting/:meetingId/:skey/removemembers" element={<PrivateRoute><SelectMembers /></PrivateRoute>}/>
                    <Route path="/transfer/:meetingId/selectmembers" element={<PrivateRoute><SelectMembers /></PrivateRoute>}/>
                    <Route path="/movingkakaomap" element={<PrivateRoute><MovingKakaoMap /></PrivateRoute>}/>
                    <Route path="/nickname" element={<PrivateRoute><Nickname /></PrivateRoute>}/>
                    <Route path="/mypage/:memberId" element={<PrivateRoute><MyPage /></PrivateRoute>}/>
                    <Route path="/budget/:meetingId" element={<PrivateRoute><Budget /></PrivateRoute>}/>
                    <Route path="/budget/:meetingId/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>}/>
                    <Route path="/addhistory" element={<PrivateRoute><AddHistory /></PrivateRoute>}/>
                    <Route path="/history/:id" element={<PrivateRoute><HistoryDetail /></PrivateRoute>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <BottomNavBar />
        </BrowserRouter>
    )
}

export default App;
