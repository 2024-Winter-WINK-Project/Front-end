import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/login.jsx";
import EventList from "./pages/EventList.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import MovingKakaoMap from "./pages/MovingKakaoMap.jsx";
import ManageEvent from "./pages/ManageEvent.jsx";
import MyPage from "./pages/MyPage/myPage.jsx";
import Budget from "./pages/Budget/budget.jsx";
import AddHistory from "./pages/History/addHistory.jsx";


let vh = window.innerHeight * 0.01

document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
})
const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/eventlist" element={<EventList />}></Route>
                <Route path="/createevent" element={<CreateEvent />}></Route>
                <Route path="/manageevent" element={<ManageEvent />}></Route>
                <Route path="/movingmap" element={<MovingKakaoMap />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/budget" element={<Budget />}></Route>
                <Route path="/addhistory" element={<AddHistory />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
