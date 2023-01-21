import Footer from "./Footer"
import Header from "./Header"
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import { useAppSelector } from "../../store/reduxHooks";
import { useState } from "react";

function SystemMessages() {

    const [huy, setHuy] = useState('')

    const {checkAlertSystemMessage,deals} = useAppSelector ((store) => store.user)

    let dateParceUser = Date.parse(deals[0]?.createdAt) + 3600000*12
    console.log(dateParceUser, typeof dateParceUser , new Date(dateParceUser))

    async function dateMessage(dateParceUser) {
        setHuy(await new Date(dateParceUser))
    }
    dateMessage()
    return <div className="bg-img">
        <Header />
            <div className="container wrap">
            <HeadsetMicIcon className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
                <div className="">
                    <h3 style={{borderBottom : "1px solid rgb(85, 85, 88)"}} className="login-inner_title">Системные сообщения</h3>
                    {checkAlertSystemMessage ? 
                    <div style={{color: 'red'}}>
                        Сообщение от stom-pro.ru 
                        {huy}
                        
                        Доброго времени суток, gleb2022 
                        
                        В соответствии, с пунктом правил Пользовательского соглашения 5.2.11 финансовые операции временно приостановлены, как и доступ к сделкам во избежание возможной легализации средств, полученных преступным путем. 
                        Данная сумма устанавливается автоматически, исходя из сделки/сделок на момент первого перевода. 
                        Для Вас установлена сумма минимального перевода 10800 RUB 
                        
                        Сумма пополнения для Вас составляет: 3500 RUB. 
                        Данную сумму возможно дополнить только новым платёжем, после чего, 
                        вам будет доступен перевод всей суммы, включая пополненные средства. 
                        Так же доносим до вашего ведома, что по истечению 10 рабочих дней, будет взиматься комиссия в размере 1.5% каждые последующие сутки. 
                        
                        Данные ограничения накладываются выборочно, во избежание конфликта с мониторинг-системой. Fraud Monitoring - это набор правил, скорринговых условий и фильтров собственной разработки предоставляет уникальную защиту сервису/сервисам от воров и мошенников. 
                        Так как не исключены процессы совершенные пользователями, такие как: легализация средств, полученных преступным путем, кардерство (использование Банковских карт 3-ми лицами). 
                        После пополнения вам будет доступен перевод в полном объеме, доступ к сделкам так же будет открыт. 
                        
                        С уважением, 
                        Администрация stom-pro.ru
                    </div>:
                    ""}
                </div>
            </div>
        <Footer />
    </div>
}

export default SystemMessages