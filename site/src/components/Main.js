import Body from "./fullBody/Body";
import Footer from "./fullBody/Footer";
import Header from "./fullBody/Header";
import '../style/body.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../store/reduxHooks";
import { axiosGetDeal } from "../api/axios";
import { useEffect } from "react";
import { reducerTypes } from "../store/Users/types";

function Main() {
    const dispatch = useDispatch();
    const {user} = useAppSelector ((store) => store.user)

    async function getDeal() {
        if(!user.email) return;
        dispatch({
          type: reducerTypes.GET_DEAL,
          payload: await axiosGetDeal(user?.email, user?.password)
        });
      }

    useEffect(() => {
        getDeal();
        // eslint-disable-next-line
      },[user])
    return <div className="bg-img">
        <Header />
        <Body />
        <Footer />
    </div>
}

export default Main;