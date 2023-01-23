import { Route, Routes } from "react-router-dom";
import UserRegistr from "./components/fullBody/UserRegistr";
import UserInput from "./components/fullBody/UserInput";
import UserSoglos from "./components/fullBody/UserSoglos";
import Main from "./components/Main";
import Settings from "./components/fullBody/Settings";
import Makedeal from "./components/fullBody/Makedeal";
import Deals from "./components/fullBody/Deals";
import MainChat from "./components/ChatTest/Main";
import Chat from "./components/ChatTest/Chat";
import Output from './components/fullBody/Output';
import Payments from './components/fullBody/Payments';
import SystemMessages from './components/fullBody/SystemMessages';
import Deal from "./components/fullBody/Deal"

function App() {
  

  return  <>
      <Routes>
        <Route path="/" element = {<Main/>}/>
        <Route path="/deal/:id" element={<Deal />}/>
        <Route path="/systemmessages" element={<SystemMessages />}/>
        <Route path="/payments" element={<Payments />}/>
        <Route path="/output" element={<Output />}/>
        <Route path="/deals" element={<Deals />}/>
        <Route path="/makedeal" element={<Makedeal/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/login" element ={<UserInput />} />
        <Route path="/registr" element = {<UserRegistr />}/>
        <Route path="/rules" element = {<UserSoglos />}/>
        <Route path="/test" element = {<MainChat />}/>
        <Route path="/chat" element={<Chat />} />
      </Routes>
     </>
}

export default App;
