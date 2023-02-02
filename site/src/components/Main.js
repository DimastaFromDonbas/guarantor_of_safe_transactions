import Body from "./fullBody/Body";
import Footer from "./fullBody/Footer";
import Header from "./fullBody/Header";
import '../style/body.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../store/reduxHooks";
import { axiosGetUserTransfers, axiosGetUserToUserTransfers } from "../api/axios";
import { useEffect } from "react";
import { reducerTypes } from "../store/Users/types";
 
function Main() {
    const dispatch = useDispatch();
    const {user} = useAppSelector ((store) => store.user)


    async function getTransfers() {
        if(!user?.email) return;
        dispatch({
          type: reducerTypes.GET_TRANSFERS,
          payload: await axiosGetUserTransfers(user?.email)
        });
        dispatch({
          type: reducerTypes.GET_TRANSFERS_TO_USER,
          payload: await axiosGetUserToUserTransfers(user?.email)
        });
        
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