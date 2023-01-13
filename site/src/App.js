import { Route, Routes } from "react-router-dom";
import Login from "./components/fullBody/Login";
import Main from "./components/Main";
function App() {
  return  <>
      <Routes>
        <Route path="/" element = {<Main/>}/>
        <Route path="#"/>
        <Route path="#"/>
        <Route path="#" />
        <Route path="#" />
        <Route path="/login" element = {<Login />}/>
      </Routes>
     </>
}

export default App;
