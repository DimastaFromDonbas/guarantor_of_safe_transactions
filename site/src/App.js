import { Route, Routes } from "react-router-dom";
import UserRegistr from "./components/Pages/UserRegistrPage/UserRegistr";
import UserInput from "./components/Pages/UserInputPage/UserInput";
import UserSoglos from "./components/Pages/UserSoglosPage/UserSoglos";
import HomePage from "./components/Pages/HomePage/HomePage";
import Settings from "./components/Pages/SettingsPage/Settings";
import Makedeal from "./components/Pages/MakedealPage/Makedeal";
import Deals from "./components/Pages/DealsPage/Deals";
import Output from "./components/Pages/OutputPage/Output";
import Payments from "./components/Pages/PaymentPage/Payments";
import SystemMessages from "./components/Pages/SystemMassagesPage/SystemMessages";
import Deal from "./components/Pages/DealsPage/Deal";
import Howitwork from "./components/Pages/HowitworkPage/Howitwork";
import AdminPanel from "./components/Pages/AdminPage/AdminPanel";
import BlockMaseges from "./components/Pages/BlockMasseges/BlockMaseges";
import Sertificates from "./components/Pages/SertificatesPage/Sertificates";
import UserID from "./components/Pages/adminComponent/UserID";
import DealID from "./components/Pages/adminComponent/DealID";
import RefillID from "./components/Pages/adminComponent/RefillID";
import TransfersID from "./components/Pages/adminComponent/TransfersID";
import TransfersToUserID from "./components/Pages/adminComponent/TransfersToUserID";
import Disputes from "./components/Pages/DisputesPage/Disputes";
import AdminChat from "./components/Pages/adminComponent/AdminChat";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import sound from './sound/newMessage.mp3';
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/Footer";
import Chat from "./components/Pages/ChatComponent/Chat";

export const socket = io.connect("https://back-hbht.onrender.com");

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
      <Header />
      <Chat />
      <audio ref={audioPlayer} src={sound} />
      {/* <Helmet>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico" />
      </Helmet> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/disputes" element={<Disputes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
