import { Route, Routes } from "react-router-dom";
import Login from "./components/fullBody/Login";
import UserInput from "./components/fullBody/UserInput";
import UserSoglos from "./components/fullBody/UserSoglos";
import Main from "./components/Main";
function App() {
  return  <>
      <Routes>
        <Route path="/" element = {<Main/>}/>
        <Route path="#"/>
        <Route path="#"/>
        <Route path="#" />
        <Route path="/login" element ={<UserInput />} />
        <Route path="/registr" element = {<Login />}/>
        <Route path="/rules" element = {<UserSoglos />}/>
      </Routes>
     </>
}

export default App;
