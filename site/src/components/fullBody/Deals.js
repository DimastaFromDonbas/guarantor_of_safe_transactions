import { Form } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from "react";
import { axiosGetDeal } from "../../api/axios";
import { reducerTypes } from "../../store/Users/types";
import { useDispatch } from 'react-redux';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';


function Deals() {
    const dispatch = useDispatch();
    const {user, deals,checkAlertSystemMessage} = useAppSelector ((store) => store.user)
    const status = ['Открыта', 'В обработке', 'Выполнена']

    async function getDeal() {
        if(!user.email) return alert('Войдите в аккаунт');
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
        <HeadsetMicIcon className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
            <div className="container wrap">
                <div className="container">
                    <div className="dial-flex_box">
                        <div>
                        <Form.Label htmlFor="inputPassword5">Мои сделки</Form.Label>
                        <Link style={{textDecoration: "none", color: 'white', fontSize: '14px'}} to = '/makedeal'> <button className="spec-btn-ux">Сделать сделку<AddCircleOutlineIcon></AddCircleOutlineIcon></button></Link>
                            {checkAlertSystemMessage ?
                            <div className="message-header">
                            <div style={{borderLeft: '1px solid red'}}>
                                <div style={{padding: '10px'}}>
                                        Доброго времени суток,{user.nickname}
                                        <br />
                                        На данный момент, переводы и выводы для вашей учетной записи приостановлены.
                                        <br />
                                        Описание причины ограничений вы можите найти в <Link style={{color: '#f25322' ,textDecoration: "none" }} to='/systemmessages'>Системные сообщения </Link>
                                </div>
                            </div>
                            </div>
                            : ''}
                        </div>
                        <table className="trades-table">
                                    <thead>
                                        <tr>
                                            <th>Номер</th>
                                            <th>Название</th>
                                            <th>Номер сделки</th>
                                            <th>Сумма</th>
                                            <th>Статус</th>
                                        </tr>
                        </thead>
                            <tbody>
                                {deals?.map((item, index) => <tr>
                                    <th>{index+1}</th>
                                    <th style={{color: '#f25322'}}>{item?.name}</th>
                                    <th>{item?.id}</th>
                                    <th>{item?.sum}</th>
                                    <th>{status[item?.status]}</th>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        <Footer /> 
    </div>
}

export default Deals