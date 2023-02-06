import Body from "./fullBody/Body";
import Footer from "./fullBody/Footer";
import Header from "./fullBody/Header";
import '../style/body.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../store/reduxHooks";
import { axiosGetUserTransfers, axiosGetUserToUserTransfers } from "../api/axios";
import { useEffect } from "react";
import { reducerTypes } from "../store/Users/types";
 
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
    const {user} = useAppSelector ((store) => store.user)

    async function getTransfers() {
        if(!user?.email) return;
        let transfers = await axiosGetUserTransfers(user?.email)
        if(transfers) {
        dispatch({
          type: reducerTypes.GET_TRANSFERS,
          payload: transfers
        });}
        let transfersToUser = await axiosGetUserToUserTransfers(user?.email)
        if(transfersToUser) {
        dispatch({
          type: reducerTypes.GET_TRANSFERS_TO_USER,
          payload: transfersToUser
        });}
        
      }

    useEffect(() => {
      getTransfers();
        // eslint-disable-next-line
      },[user])
    return <div className="bg-img" >
        <Header />
        <Body />
        <Footer />
    </div>
}

export default Main;