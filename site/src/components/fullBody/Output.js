import { Link } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../../store/reduxHooks";
import { Form } from "react-bootstrap";
import { useState } from "react";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

function Output() {

    const {user} = useAppSelector ((store) => store.user)
    const [item, setItem] = useState(1)

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

    let data = (Math.random() * 1000).toFixed(0)

    return <div className="bg-img"> 
        <Header />
            <div className="container">
            <HeadsetMicIcon className='chat-icon icon-chat-sizes'></HeadsetMicIcon>
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
                                <div className="operation__heading">Операция №{data}</div>
                                <div className="form-operation">
                                    <div className="form-operation__input-section">
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Платежная система:</Form.Label>
                                            <Form.Select aria-label="Default select example">
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
                                            <Form.Control
                                                type="text"
                                                id="inputText"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Cумма</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputText"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-orange">Отправить</button>
                                </div>
                            </div>
                        </div>
                        <div className="account-wrap__about-info">
                            <p>stom-pro.ru не является банком, платежной системой или другой финансовой организацией и не ведет
                            расчетные счета пользователей.</p>
                            <p>Кабинет stom-pro.ru обеспечивает лишь удобство расчетов между клиентами.</p>
                    </div>
                    <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                    <div className="alert-block alert-block_info">
                        <p className="text-alert">История выводов по реквизитам пуста</p>
                    </div>
                    </div>
                        <div style={item === 0 ? {display: 'block'}: {display: 'none'}} className="flex-box-0">
                            <div className="nav-account__content">
                                <div className="account-wrap__about-info" style={{marginTop: "40px"}}>
                                    <p>stom-pro.ru не является банком, платежной системой или другой финансовой организацией и не ведет
                                        расчетные счета пользователей.</p>
                                    <p>Кабинет stom-pro.ru обеспечивает лишь удобство расчетов между клиентами.</p>
                                </div>
                            </div>
                            <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                            <div className="output-description-info-block">
                                <p className="output-id">ID</p>
                                <p className="output-date">Дата</p>
                                <p className="output-sum">Сумма</p>
                            </div>
                    </div>
                        <div style={item === 2 ? {display: 'block'}: {display: 'none'}} className="flex-box-2">
                        <div className="nav-account__content">
                            <div className="nav-account__operation operation">
                                <div className="operation__heading">Операция №{data}</div>
                                <div className="form-operation">
                                    <div className="form-operation__input-section">
                                        <div style={{width: '510px'}} className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Получатель:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputText"
                                                placeholder="Логин пользователя"
                                            />
                                        </div>
                                        <div className="form-operation__item">
                                        <Form.Label htmlFor="inputPassword5">Cумма:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="inputText"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-orange">Отправить</button>
                                </div>
                            </div>
                        </div>
                        <div className="account-wrap__about-info">
                            <p>stom-pro.ru не является банком, платежной системой или другой финансовой организацией и не ведет
                            расчетные счета пользователей.</p>
                            <p>Кабинет stom-pro.ru обеспечивает лишь удобство расчетов между клиентами.</p>
                    </div>
                    <div className="account-wrap__time-info">Перевод осуществляется в течении 24 ч</div>
                    <div className="alert-block alert-block_info">
                        <p className="text-alert">История выводов по реквизитам пуста</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        <Footer />
    </div>
}

export default Output