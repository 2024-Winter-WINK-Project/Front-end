import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";

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
            </Routes>
        </BrowserRouter>
    )
}

export default App;