import Footer from "./Footer";
import Header from "./Header";
import {LinearProgress, Button} from '@mui/material';
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { useDispatch } from "react-redux";
import Chat from "./Chat";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "./Header";
import { reducerTypes } from "../../store/Users/types";
import { axiosGetDealMessages, axiosGetOneDeal, axiosChangeDealStatus, axiosDecreaseScore} from "../../api/axios";
import { dealStatusMock } from "../mock/OutputMock";

function Deal() { 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(0)
    const [messages, setMessages] = useState('')
    const {deals, user, dealMessages} = useAppSelector ((store) => store.user)
    const { id } = useParams();
    const [deal, setDeal] = useState(deals?.filter(item => String(item.id) === id)[0])

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

    async function getDeal() {
      const result = await axiosGetOneDeal(Number(id))
      if(result) {
        setDeal(result)
      }
}

async function changeDealStatus(status) {
  if(!user?.email) return alert('Войдите в аккаунт')
  const result = await axiosChangeDealStatus(Number(id), Number(status || 1), user?.email, user?.password)
  if(result) {
    setDeal(prev => ({...prev, status: result?.status}))
  } else alert('Что-то пошло не так')
}

async function pay() {
  if(!user?.email) return alert('Войдите в аккаунт')
  if(!deal?.sum) return alert('Сделка не найдена')
  const resultUser = await axiosDecreaseScore(Number((deal?.sum + deal?.sum*0.05)).toFixed(), user?.email, user?.password)
  if(resultUser) {
    dispatch({
      type: reducerTypes.GET_USER,
      payload: resultUser,
    });
    await changeDealStatus(3);
  } else alert('Что-то пошло не так')
}

    useEffect(() => {
        let temporaryDeal = deal
        if(temporaryDeal) {
        setDeal(temporaryDeal)
        const progress = temporaryDeal?.status *25 > 100 ? 0 : temporaryDeal?.status *25
        setProgress(progress)
        }
    }, [id, deal])

    useEffect(() => {
        socket.emit("join", {name: user?.email, room: String(deal?.id)});
      }, [deal, user, deals]);

      useEffect(() => {
        getDealMessages();
          getDeal();
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

      useEffect(() => {
        if(user?.checkRu !== 'true') {
          navigate("/blockMaseges")
        }
      },[user.checkRu,navigate])

    return <div className="bg-img">
        <Header />
        <Chat />
            <div style={{marginBottom: '20px',marginTop:"30px"}} className='container heiggg'>
                <div className="message-body">
                    <div style={{paddingBottom: '5px'}}>Статус сделки: { dealStatusMock[deal?.status - 1] }</div>
                    { (deal?.status === 1 && deal?.creator !== user?.email) ? <button onClick={() => changeDealStatus(2)}>Подтвердить участие</button> : null}
                    { (deal?.status === 2 && deal?.buyer === user?.email) ? <button onClick={pay}>Оплатить</button> : null}
                    { (deal?.status === 3 && deal?.buyer === user?.email) ? <button onClick={() => changeDealStatus(4)}>Подтвердить выполнение сделки</button> : null}
                    { (deal?.status === 3) ? <button onClick={() => changeDealStatus(5)}>Арбитраж</button> : null}
                    {(deal?.status !== 5) ? <LinearProgress variant="determinate" value={progress} /> : null}
                </div>
                <div className="message-body">
                    <div>
                        <table className="trades-table-deals ">
                          <tbody>
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
                            </tbody>
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