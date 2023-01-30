import Footer from "./Footer";
import Header from "./Header";
import {LinearProgress, Button} from '@mui/material';
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useDispatch } from "react-redux";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import { socket } from "./Header";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetDealMessages } from "../../api/axios";

function Deal() { 
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(50)
    const [messages, setMessages] = useState('')
    const {deals, user, dealMessages} = useAppSelector ((store) => store.user)
    const { id } = useParams();
    const [deal, setDeal] = useState(deals?.filter(item => String(item.id) === id)[0])

    const statuses = [ 'Открыта' , "В процессе ", "Завершена", "Заморожена" ]

    useEffect(() => {
        let temporaryDeal = deals?.filter(item => String(item.id) === id)[0]
        setDeal(temporaryDeal)
        setProgress(temporaryDeal?.status)
    }, [deals, id])

    useEffect(() => {
        socket.emit("join", {name: user?.email, room: String(deal?.id)});
      }, [deal, user, deals]);

      useEffect(() => {
        getDealMessages();
        // eslint-disable-next-line
      }, []);

      useEffect(() => {
        socket.on("message", ({ data }) => {
            console.log('data', data)
            dispatch({
                type: reducerTypes.GET_DEAL_MESSAGES,
                payload: [...dealMessages, data]
              });
        });
        // eslint-disable-next-line
      }, [dealMessages]);

      function sendMessage() {
        const time = new Date().toLocaleString().replaceAll(',', '')
        socket.emit("sendMessage", { dealId: deal.id, nickname: user.nickname, email: user.email, message: messages, time, role: user.role });
        setMessages('')
      }

      async function getDealMessages() {
            const result = await axiosGetDealMessages(id)
            dispatch({
                type: reducerTypes.GET_DEAL_MESSAGES,
                payload: result,
              });
      }

    return <div className="bg-img">
        <Header />
        <Chat />
            <div style={{marginBottom: '20px',marginTop:"30px"}} className='container heiggg'>
                <div className="message-body">
                    <div style={{paddingBottom: '5px'}}>Статус сделки: { statuses[deal?.status === 0? deal?.status: deal?.status - 1] }</div>
                    <LinearProgress variant="determinate" value={progress} />
                </div>
                <div className="message-body">
                    <div>
                        <table className="trades-table-deals ">
                            <tr style={{borderBottom: "1px solid"}}> 
                                <th>Название сделки</th>
                                <th className="dilit-block">Покупатель</th>
                                <th className="dilit-block">Продавец</th>
                                <th>Сумма сделки</th>
                                <th>Комиссия сделки</th>
                                <th>Итоговая сумма</th>
                            </tr>


                            <tr>
                                <th>{deal?.name}</th>
                                <th className="dilit-block">{deal?.buyerNickname || deal?.buyer}</th>
                                <th className="dilit-block">{deal?.sellerNickname || deal?.seller}</th>
                                <th>{deal?.sum} ₽</th>
                                <th>{(deal?.sum* 0.05).toFixed(0)} ₽</th>
                                <th>{(deal?.sum+ deal?.sum*0.05).toFixed()} ₽</th>
                            </tr>

                        </table>
                        <div>
                        <h5 style={{padding: "20px"}}>ОПИСАНИЕ СДЕЛКИ:</h5>
                       <div style={{paddingLeft: "20px"}}>{deal?.description}</div>
                        </div>
                    </div>
                </div>
                <div className="message-body">
                    <h2 style={{textAlign: 'center'}}>Чат с партнером по сделке</h2>
                   <h4 style={{textAlign: 'center'}}>{deal?.buyer === user?.email ? deal?.sellerNickname: deal?.buyerNickname}</h4>
                   <div className="scrollDiv" style={{overflow: 'overlay', maxHeight: '70vh'}}>
                   {dealMessages?.map((item, index) => {
                   if (item.dealId !== Number(id)) return null;

                   return item.nickname === user.nickname? 
                   <div style={{textAlign: 'end', paddingRight: '30px'}}>
                        <p 
                        style={{display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere'}}
                        >{item.message} <span style={{fontSize: '15px', color: '#59DBFF'}}>{item.time}</span></p>
                   </div> 
                   : <div style={{textAlign: 'start'}}>
                   <p style={{display: 'flex', flexDirection: 'column', overflowWrap: 'anywhere'}}
                   >{`${item.nickname}: ${item.message}`} <span style={{fontSize: '15px', color: '#59DBFF'}}>{item.time}</span> </p>
              </div> })}
              </div>
                <div style={{width: '100%', display: 'flex',marginTop: '40px'}}>
                <input
                    style={{padding: '.375rem .75rem', border: '1px solid #ced4da', borderRadius: '.375rem', width: '100%', marginRight: '15px'}}
                    type={'text'}
                    onChange={(e) => setMessages(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && sendMessage()
                      }
                    value={messages}
                    placeholder='Введите сообщение'
                    >
                    </input>
                    <Button
                    size='large'
                    onClick={() => sendMessage()}
                    sx={{
                    alignSelf: 'flex-end',
                    color: '#FFFFFF',
                    borderColor: '#FFF',
                    marginLeft: 'auto',
                    }}>Отправить</Button>
                </div>
                </div>
            </div>
        <Footer />
    </div>
}

export default Deal;