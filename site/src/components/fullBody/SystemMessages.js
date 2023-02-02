import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reducerTypes } from "../../store/Users/types";
import Chat from "./Chat";

function SystemMessages() {

    const dispatch = useDispatch()
    const {checkAlertSystemMessage, user, transfers, transfersToUser} = useAppSelector ((store) => store.user)


    let dateParceUser1 = new Date(transfers[0]?.time)
    let dateParceUser2 = new Date(transfersToUser[0]?.time)
    const triggerTime = new Date(dateParceUser1.getFullYear(), dateParceUser1.getMonth(), dateParceUser1.getDate()+1, 9, 0, 0).toLocaleString();
    const triggerTime2 = new Date(dateParceUser2.getFullYear(), dateParceUser2.getMonth(), dateParceUser2.getDate()+1, 9, 0, 0).toLocaleString();

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
            <div style={{ marginTop: '30px'}} className="container heiggg">
            <Chat />
                    <h3 style={{borderBottom : "1px solid rgb(85, 85, 88)"}} className="login-inner_title">Системные сообщения</h3>
                    {checkAlertSystemMessage || user?.systemMessage === 'true' ? 
                    <div className="message-flex">
                        <div className="message-header">
                            <h2>Сообщение от stom-pro.ru</h2> 
                            <h2>{triggerTime? triggerTime: triggerTime2}</h2>
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
        <Footer /> 
    </div>
}

export default SystemMessages