import Footer from "./Footer";
import Header from "./Header";
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/reduxHooks";

function Deal() { 
    const [progress, setProgress] = useState(50)
    const {deals} = useAppSelector ((store) => store.user)

    const deal = {
        buyer: "user12@gmail.com",
        createdAt: "2023-01-18T13:25:37.883Z",
        description: "test",
        id: 4,
        name: "test",
        seller: "user5@gmail.com",
        status: 1,
        sum: 10,
        updatedAt: "2023-01-18T13:25:37.883Z"
    }

    const statuses = [ 'Открыта' , "В процессе ", "Завершена", "Заморожена" ]

    return <div className="bg-img">
        <Header />
            <div className='container wrap'>
                <div className="message-body">
                    <div style={{paddingBottom: '5px'}}>Статус сделки: { statuses[deal.status - 1] }</div>
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
                            {deals?.map( item => <tr style={{width: '1010px',display: 'flex', justifyContent: "space-between",paddingTop: '10px'}}>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item.name}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item.buyer}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item.seller}</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item?.sum} руб</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item.sum* 0.05} руб</th>
                                    <th style={{width: '168px', textAlign: 'center'}}>{item.sum+ item.sum*0.05} руб</th>
                                </tr>)}
                            </tr>
                        </tbody>
                        <div>
                        <h5 style={{padding: "20px"}}>ОПИСАНИЕ СДЕЛКИ:</h5>
                        {deals?.map(item => <div style={{paddingLeft: "20px"}}>{item.description}</div>)}
                        </div>
                    </div>
                </div>
                <div className="message-body">
                    <h2 style={{textAlign: 'center'}}>Чат с партнером по сделке</h2>
                    {deals?.map(item => <h4 style={{textAlign: 'center'}}>{item.buyer}</h4>)}
                </div>
            </div>
        <Footer />
    </div>
}

export default Deal;