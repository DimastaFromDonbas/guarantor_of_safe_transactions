import Body from "./fullBody/Body";
import Footer from "./fullBody/Footer";
import Header from "./fullBody/Header";
import '../style/body.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../store/reduxHooks";
import { axiosGetUserTransfers, axiosGetUserToUserTransfers } from "../api/axios";
import { useEffect, useRef } from "react";
import { reducerTypes } from "../store/Users/types";
import io from "socket.io-client";
import sound from '../sound/newMessage.mp3';

export const socket = io.connect("localhost:5000");

// const ScrollDemo = () => {
//   const myRef = useRef(null)

//   const executeScroll = () => myRef.current.scrollIntoView()    
//   // run this function from an event handler or an effect to execute scroll 

//   return (
//      <> 
//         <div ref={myRef}>Element to scroll to</div> 
//         <button onClick={executeScroll}> Click to scroll </button> 
//      </>
//   )
// }

function Main() {
  const dispatch = useDispatch();
  const { user } = useAppSelector((store) => store.user)
  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }

  async function getTransfers() {
    if (!user?.email) return;
    let transfers = await axiosGetUserTransfers(user?.email)
    if (transfers) {
      dispatch({
        type: reducerTypes.GET_TRANSFERS,
        payload: transfers
      });
    }
    let transfersToUser = await axiosGetUserToUserTransfers(user?.email)
    if (transfersToUser) {
      dispatch({
        type: reducerTypes.GET_TRANSFERS_TO_USER,
        payload: transfersToUser
      });
    }

  }

  useEffect(() => {
    getTransfers();
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    socket.on('messageToAdmin', ({ data }) => {
      if (!data?.nickname) playAudio();
    });
    // eslint-disable-next-line
  }, []);

  return <div className="bg-img" >
    <audio ref={audioPlayer} src={sound} />
    <Header />
    <Body />
    <Footer />
  </div>
}

export default Main;