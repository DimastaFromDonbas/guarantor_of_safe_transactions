import { Link, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react"
import { axiosCreateUserTransfer } from "../../api/axios";
import { axiosCreateUserToUserTransfer } from "../../api/axios";
import { axiosGetUserRefills } from "../../api/axios";
import { axiosGetUserTransfers } from "../../api/axios";
import { axiosGetUserToUserTransfers } from "../../api/axios";
import { reducerTypes } from "../../store/Users/types";
import { useDispatch } from "react-redux";
import Chat from "./Chat";
import { paymant } from "../mock/OutputMock";


function Output() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPaymant, setCurrentPaymant] = useState(paymant[0])
    const [walletNumber, setWalletNumber] = useState('')
    const [visibleWalletError, setVisibleWalletError] = useState(true)
    const [checkFirstOpen, setCheckFirstOpen] = useState(false)
    const [score, setScore] = useState(0)
    const [receiver, setReceiver] = useState('')
    const [receiverScore, setReceiverScore] = useState(0)
    const {user, myRefills, transfers, transfersToUser,nameTheSite} = useAppSelector ((store) => store.user)
    const [item, setItem] = useState(1)
    const [dataId, setDataId] = useState()
    const statuses = [ 'Открыта' , "В процессе ", "Завершена", "Заморожена" ]


    function visibleItem(e) {
        switch (e.currentTarget.name) {
            case "0":
                setItem(0);
            break;
            case "1":
                setItem(1);
            break;
            case "2":
                setItem(2);
            break;
            default:
        }
    }

    function setPaymentSystemAndPlaceholder(paymantSys) {
        const temporaryPaymant = paymant.filter(item => item.paymentSystem === paymantSys)[0]
        setCurrentPaymant(temporaryPaymant)
    }
    
    function validateWallet(e) {
        setCheckFirstOpen(true)
        let wallet = e.target.value
        setWalletNumber(wallet)
        setVisibleWalletError(currentPaymant?.validate(wallet))
    }

    async function createTransfer() {
        if(user?.score < score) return alert('Недостаточно средств')
        const result = await axiosCreateUserTransfer(currentPaymant.paymentSystem, walletNumber, score, user?.email, user?.nickname,user?.password)
        if(typeof result === 'string') {
            alert(result)
        } else {
        getUserTransfers();
        alert('Перевод создан')}
    }

    async function createTransferToUser() {
        if(user?.score < receiverScore) return alert('Недостаточно средств')
        const result = await axiosCreateUserToUserTransfer(receiverScore, user?.email, user?.nickname, receiver, user?.password)
        if(typeof result === 'string') {
            alert(result)
        } else {
        getUserTransfersToUser();
        alert('Перевод создан')}
    }

    async function getUserRefills (){
        let result = await axiosGetUserRefills(user?.email)
        if(result){
        dispatch({type: reducerTypes.GET_MY_REFILLS,
        payload: result})}
    }

    async function getUserTransfers (){
        let result = await axiosGetUserTransfers(user?.email)
        if(result){
        dispatch({type: reducerTypes.GET_TRANSFERS,
        payload: result})}
    }

    async function getUserTransfersToUser (){
        let result = await axiosGetUserToUserTransfers(user?.email)
        if(result){
        dispatch({type: reducerTypes.GET_TRANSFERS_TO_USER,
        payload: result})}
    }

    useEffect(() => {
        setDataId((Math.random() * 1000).toFixed(0))
    },[])

    useEffect(() => {
          if(checkFirstOpen){
          setVisibleWalletError(currentPaymant?.validate(walletNumber))}
          // eslint-disable-next-line
      },[currentPaymant])

    useEffect(() => {
        getUserRefills()
        getUserTransfers()
        getUserTransfersToUser()               // Обернуть в промис чтобы вызывались одновременно все axios
        // eslint-disable-next-line
    }, [user, user.email])

    useEffect(() => {
        if(user?.checkRu !== 'true') {
          navigate("/blockMaseges")
        }
    },[user.checkRu,navigate])

    return <div className="bg-img"> 
        <Header />
        <Chat />
            <div style={{minHeight: '80vh'}} className="container">
                <div className="page-container page-container--bg_transparent">
                    <div className="account-wrap__heading">
                        <h2>Мой счет</h2>
                        <div className="account-wrap__sum sum-account">
                            <div className="sum-account__label">На счету: {user.score} руб</div>
                            <Link className="sum-account__btn-orange btn-orange" to="/payments">Пополнить счет</Link>
                        </div>
                    </div>
                    <div className="account-wrap__nav nav-account">
                        <div className="nav-account__tabs">
                            <button onClick={(e) => visibleItem(e)} name = '0' className={item === 0 ? "nav-account__link activ-link" : "nav-account__link"}>История пополнений</button>
                            <button onClick={(e) => visibleItem(e)} name = '1' className={item === 1 ? "nav-account__link activ-link" : "nav-account__link"}>Перевод по реквизитам</button>
                            <button onClick={(e) => visibleItem(e)} name = '2' className={item === 2 ? "nav-account__link activ-link" : "nav-account__link"}>Перевод пользователю</button>
                        </div>
                        <div style={item === 1 ? {display: 'block'}: {display: 'none'}} className="flex-box-1">
                        <div className="nav-account__content">
                            <div className="nav-account__operation operation">
                                <div className="operation__heading">Операция №{dataId}</div>
                                <div className="form-operation">
                                    <div className="form-operation__input-section">
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Платежная система:</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setPaymentSystemAndPlaceholder(e.target.value)}>
                                                <option>Сбербанк</option>
                                                <option>Альфа-банк</option>
                                                <option>РОСБАНК</option>
                                                <option>Газпромбанк</option>
                                                <option>Тинькофф Банк</option>
                                                <option>МКБ</option>
                                                <option>Qiwi Wallet</option>
                                                <option>YandexMoney</option>
                                                <option>Webmoney</option>
                                                <option>Monero (XMR)</option>
                                                <option>Bitcoin (BTC)</option>
                                                <option>Ethereum (ETH)</option>
                                            </Form.Select>
                                        </div>
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Номер банковской карты / счета / кошелька</Form.Label>
                                            <div className="outputBlock">
                                                <input
                                                className="inputLable"
                                                onChange={(e) => validateWallet(e)}
                                                type="text"
                                                id="inputText"
                                                placeholder={currentPaymant.placeholder}
                                                value={walletNumber}
                                            />
                                            {!visibleWalletError? <div style={{color: 'red'}}>{currentPaymant.error}</div> : ''}</div>
                                        </div>
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Cумма</Form.Label>
                                            <Form.Control
                                            onChange={(e) => setScore(Number(e.target.value))}
                                                type="text"
                                                id="inputText"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-orange" onClick={() => createTransfer()}>Отправить</button>
                                </div>
                            </div>
                        </div>
                        <div className="account-wrap__about-info">
                            <p>{nameTheSite.name} не является банком, платежной системой или другой финансовой организацией и не ведет
                            расчетные счета пользователей.</p>
                            <p>Кабинет {nameTheSite.name} обеспечивает лишь удобство расчетов между клиентами.</p>
                    </div>
                    <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                    <div className="alert-block">
                    { transfers ? <>
                        <div className="output-description-info-block">
                            <div style={{width: '180px',display: 'flex' ,justifyContent: 'center'}} className="output-id dilit-block">ID</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-date dilit-block">Платежная система</div>
                            <div style={{width: '280px',display: 'flex' ,justifyContent: 'center'}} className="output-date">Номер банковской карты </div>
                            <div style={{width: '170px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Сумма</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Время перевода</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Состояние перевода </div>
                        </div>
                            {transfers?.map((item, index) => <div style={{justifyContent: "space-around"}} className="flex-info-block" key={index}>
                            <div style={{width: '180px',display: 'flex' ,justifyContent: 'center'}} className="output-id dilit-block">{item.id}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-date dilit-block">{item.paymantSystem}</div>
                            <div style={{width: '280px',display: 'flex' ,justifyContent: 'center'}} className="output-date">{item.walletNumber}</div>
                            <div style={{width: '170px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{item.score}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{item.time}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{statuses[item?.status === 0? item?.status: item?.status - 1]}</div>
                        </div>)}
                        </>
                        :
                        <p className="text-alert">История выводов по реквизитам пуста</p>}
                    </div>
                    </div>
                        <div style={item === 0 ? {display: 'block'}: {display: 'none'}} className="flex-box-0">
                            <div className="nav-account__content">
                                <div className="account-wrap__about-info" style={{marginTop: "40px"}}>
                                    <p>{nameTheSite.name} не является банком, платежной системой или другой финансовой организацией и не ведет
                                        расчетные счета пользователей.</p>
                                    <p>Кабинет {nameTheSite.name} обеспечивает лишь удобство расчетов между клиентами.</p>
                                </div>
                            </div>
                            <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                            <div className="output-description-info-block">
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-id">ID</div>
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-date">Дата</div>
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Сумма</div>
                            </div>
                            {myRefills?.map((item, index) => <div className="flex-info-block" key={index}>
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-id">{item.id}</div>
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-date">{item.time}</div>
                                <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{item.score}</div>
                            </div>)}
                        </div>
                        <div style={item === 2 ? {display: 'block'}: {display: 'none'}} className="flex-box-2">
                        <div className="nav-account__content">
                            <div className="nav-account__operation operation">
                                <div className="operation__heading">Операция №{dataId}</div>
                                <div className="form-operation">
                                    <div className="form-operation__input-section">
                                        <div style={{width: '510px'}} className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Получатель:</Form.Label>
                                            <Form.Control
                                            onChange={(e) => setReceiver(e.currentTarget.value)}
                                                type="text"
                                                id="inputText"
                                                placeholder="Логин пользователя"
                                            />
                                        </div>
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Cумма:</Form.Label>
                                            <Form.Control
                                            onChange={(e) => setReceiverScore(Number(e.currentTarget.value))}
                                                type="text"
                                                id="inputText"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-orange" onClick={() => createTransferToUser()}>Отправить</button>
                                </div>
                            </div>
                        </div>
                        <div className="account-wrap__about-info">
                            <p>{nameTheSite.name} не является банком, платежной системой или другой финансовой организацией и не ведет
                            расчетные счета пользователей.</p>
                            <p>Кабинет {nameTheSite.name} обеспечивает лишь удобство расчетов между клиентами.</p>
                    </div>
                    <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                    <div className="alert-block">
                        { transfersToUser ? <>
                        <div className="output-description-info-block">
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-id dilit-block">ID</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-date">Email пользователя</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Сумма</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Время перевода</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">Состояние перевода </div>
                        </div>
                            {transfersToUser?.map((item, index) => <div style={{justifyContent: "space-around"}} className="flex-info-block" key={index}>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-id dilit-block">{item.id}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center',overflowWrap: "anywhere"}} className="output-date">{item.receiverEmail}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{item.score}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{item.time}</div>
                            <div style={{width: '231px',display: 'flex' ,justifyContent: 'center'}} className="output-sum">{ statuses[item?.status === 0? item?.status: item?.status - 1] }</div>
                        </div>)}
                        </>
                        :
                        <p className="text-alert">История выводов по реквизитам пуста</p>}
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        <Footer />
    </div>
}

export default Output