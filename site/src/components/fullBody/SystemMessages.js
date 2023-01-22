import Footer from "./Footer"
import Header from "./Header"
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";

function SystemMessages() {

    const dispatch = useDispatch()
    const {checkAlertSystemMessage,deals ,user} = useAppSelector ((store) => store.user)
    let dateParceUser = new Date(Date.parse(deals[0]?.createdAt)).toLocaleString()

    useEffect(() => {
        if(checkAlertSystemMessage) {
            localStorage.setItem(`${user.email}`, 'true')
            dispatch({
                type: reducerTypes.GET_UPDATE_HEADER_ALERT,
                payload: false,
              });
        }
        // eslint-disable-next-line 
    },[checkAlertSystemMessage, dispatch])

    return <div className="bg-img">
        <Header />
            <div className="container wrap">
            <HeadsetMicIcon className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
                <div className="">
                    <h3 style={{borderBottom : "1px solid rgb(85, 85, 88)", paddingLeft: '15px'}} className="login-inner_title">Системные сообщения</h3>
                    {checkAlertSystemMessage ? 
                    <div className="message-flex">
                        <div className="message-header">
                            <h2>Сообщение от stom-pro.ru</h2> 
                            <h2>{dateParceUser}</h2>
                        </div>
                        <div className="message-body">
                        Доброго времени суток, {user.nickname}
                        <br />
                        <br />
                        В соответствии, с пунктом правил Пользовательского соглашения 5.2.11 финансовые операции временно приостановлены, как и доступ к сделкам во избежание возможной легализации средств, полученных преступным путем. 
                        Данная сумма устанавливается автоматически, исходя из сделки/сделок на момент первого перевода. 
                        <div style={{color: 'red', margin: '0px', padding:'0px'}}>Для Вас установлена сумма минимального перевода 10800 RUB</div>
                        <br />
                        <div style={{color: 'red', margin: '0px', padding:'0px'}}> Сумма пополнения для Вас составляет: 3500 RUB. </div>
                        Данную сумму возможно дополнить только новым платёжем, после чего, 
                        вам будет доступен перевод всей суммы, включая пополненные средства.<span style={{color: 'red', margin: '0px', padding:'0px'}}>Так же доносим до вашего ведома, что по истечению 10 рабочих дней, будет взиматься комиссия в размере 1.5% каждые последующие сутки.</span>
                        <br />
                        <br />
                        Данные ограничения накладываются выборочно, во избежание конфликта с мониторинг-системой. Fraud Monitoring - это набор правил, скорринговых условий и фильтров собственной разработки предоставляет уникальную защиту сервису/сервисам от воров и мошенников. 
                        Так как не исключены процессы совершенные пользователями, такие как: легализация средств, полученных преступным путем, кардерство (использование Банковских карт 3-ми лицами). 
                        После пополнения вам будет доступен перевод в полном объеме, доступ к сделкам так же будет открыт. 
                        <br />
                        <br />
                        С уважением, 
                        Администрация stom-pro.ru
                        <br />
                        </div>
                    </div>:
                    ""}
                </div>
            </div>
        <Footer />
    </div>
}

export default SystemMessages