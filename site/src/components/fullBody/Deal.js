import Footer from "./Footer";
import Header from "./Header";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Deal() { 
    const [progress, setProgress] = useState(50)
    const [deal, setDeal] = useState({})
    const {deals, user} = useAppSelector ((store) => store.user)
    const { id } = useParams();

    const statuses = [ 'Открыта' , "В процессе ", "Завершена", "Заморожена" ]

    useEffect(() => {
        let temporaryDeal = deals?.filter(item => String(item.id) === id)[0]
        setDeal(temporaryDeal)
        setProgress(temporaryDeal?.status)
    }, [deals, id])

    return <div className="bg-img">
        <Header />
        <Chat />
            <div className='container wrap'>
                <div className="message-body">
                    <div style={{paddingBottom: '5px'}}>Статус сделки: { statuses[deal?.status === 0? deal?.status: deal?.status - 1] }</div>
                    <LinearProgress variant="determinate" value={progress} />
                </div>
                <div className="message-body">
                    <div className="table-deal">
                        <tbody>
                            <tr style={{width: '1010px',display: 'flex', justifyContent: "space-between",borderBottom: "1px solid"}}>
                                <th style={{width: '168px', textAlign: 'center'}}>Название сделки</th>
                                <th style={{width: '168px', textAlign: 'center'}}>Покупатель</th>
                                <th style={{width: '168px', textAlign: 'center'}}>Продавец</th>
                                <th style={{width: '168px', textAlign: 'center'}}>Сумма сделки</th>
                                <th style={{width: '168px', textAlign: 'center'}}>Комиссия сделки</th>
                                <th style={{width: '168px', textAlign: 'center'}}>Итоговая сумма</th>
                            </tr>

                            <tr style={{width: '1010px',display: 'flex', justifyContent: "space-between",paddingTop: '10px'}}>
                            <tr style={{width: '1010px',display: 'flex', justifyContent: "space-between",paddingTop: '10px'}}>
                                    <th style={{width: '168px', textAlign: 'center'}}>{deal?.name}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{deal?.buyerNickname || deal?.buyer}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{deal?.sellerNickname || deal?.seller}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{deal?.sum} ₽</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{(deal?.sum* 0.05).toFixed(0)} ₽</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{(deal?.sum+ deal?.sum*0.05).toFixed()} ₽</th>
                                </tr>
                            </tr>
                        </tbody>
                        <div>
                        <h5 style={{padding: "20px"}}>ОПИСАНИЕ СДЕЛКИ:</h5>
                       <div style={{paddingLeft: "20px"}}>{deal?.description}</div>
                        </div>
                    </div>
                </div>
                <div className="message-body">
                    <h2 style={{textAlign: 'center'}}>Чат с партнером по сделке</h2>
                   <h4 style={{textAlign: 'center'}}>{deal?.buyer === user?.email ? deal?.sellerNickname: deal?.buyerNickname}</h4>
                </div>
            </div>
        <Footer />
    </div>
}

export default Deal;