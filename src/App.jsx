import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/login.jsx";
import GroupList from "./pages/GroupList.jsx";
import CreateGroup from "./pages/CreateGroup.jsx";
import MovingKakaoMap from "./pages/MovingKakaoMap.jsx";
import ManageGroup from "./pages/ManageGroup.jsx";
import MyPage from "./pages/MyPage/myPage.jsx";
import Budget from "./pages/Budget/budget.jsx";
import AddHistory from "./pages/History/addHistory.jsx";
import BottomNavigation from "./components/BottomNavigation";


let vh = window.innerHeight * 0.01

document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
})
const App = () =>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/grouplist" element={<GroupList />}></Route>
                    <Route path="/creategroup" element={<CreateGroup />}></Route>
                    <Route path="/managegroup/:groupId" element={<ManageGroup />}></Route>
                    <Route path="/movingmap" element={<MovingKakaoMap />}></Route>
                    <Route path="/mypage" element={<MyPage />}></Route>
                    <Route path="/budget" element={<Budget />}></Route>
                    <Route path="/addhistory" element={<AddHistory />}></Route>
                </Routes>
                <BottomNavigation />
            </BrowserRouter>
        </>


)
}

export default App;
