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
import Output from "./components/fullBody/Output";
import Payments from "./components/fullBody/Payments";
import SystemMessages from "./components/fullBody/SystemMessages";
import Deal from "./components/fullBody/Deal";
import Howitwork from "./components/fullBody/Howitwork";
import AdminPanel from "./components/fullBody/AdminPanel";
import BlockMaseges from "./components/fullBody/BlockMaseges";
import Sertificates from "./components/fullBody/Sertificates";
import UserID from "./components/fullBody/adminComponent/UserID";
import DealID from "./components/fullBody/adminComponent/DealID";
import RefillID from "./components/fullBody/adminComponent/RefillID";
import TransfersID from "./components/fullBody/adminComponent/TransfersID";
import TransfersToUserID from "./components/fullBody/adminComponent/TransfersToUserID";
import Disputes from "./components/fullBody/Disputes";
import AdminChat from "./components/fullBody/adminComponent/AdminChat";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import sound from './sound/newMessage.mp3';

export const socket = io.connect("https://asdasdasd-front.onrender.com");

function App() {
  const audioPlayer = useRef(null);

  function playAudio() {
    try {
      if (audioPlayer) {
        audioPlayer.current.play();
      }
    } catch {
      console.log('Ошибка воспроизведения аудио, обновите страницу')
    }
  }

  useEffect(() => {
    socket.on('messageToAdmin', ({ data }) => {
      if (!data?.nickname) playAudio();
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <audio ref={audioPlayer} src={sound} />
      {/* <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico" />
      </Helmet> */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/adminPanel/user/:id" element={<UserID />} />
        <Route path="/adminPanel/deal/:id" element={<DealID />} />
        <Route path="/adminPanel/refill/:id" element={<RefillID />} />
        <Route path="/adminPanel/transfers/:id" element={<TransfersID />} />
        <Route
          path="/adminPanel/transferstouser/:id"
          element={<TransfersToUserID />}
        />
        <Route path="/adminPanel/chat/:email" element={<AdminChat />} />
        <Route path="/deal/:id" element={<Deal />} />
        <Route path="/systemmessages" element={<SystemMessages />} />
        <Route path="/blockMaseges" element={<BlockMaseges />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/output" element={<Output />} />
        <Route path="/howitwork" element={<Howitwork />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/sertificates" element={<Sertificates />} />
        <Route path="/makedeal" element={<Makedeal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<UserInput />} />
        <Route path="/registr" element={<UserRegistr />} />
        <Route path="/rules" element={<UserSoglos />} />
        <Route path="/test" element={<MainChat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/disputes" element={<Disputes />} />
      </Routes>
    </>
  );
}

export default App;
