import Footer from "./Footer";
import Header from "./Header";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Link } from "react-router-dom";

function Payments() {
    return <div className="bg-img">
        <Header />
            <div className="container wrap">
                <div className="promo-description_payments">
                    <div className="alert-block alert-block_info">
                        <p className="text-alert">Уважаемые пользователи! Тчательно проверяйте все данные перед платежем, правильно
                            заполняйте что бы не произошло недоразумений.
                            После пополнения, отправьте чек об оплате в чат технической поддержки</p>
                    </div>
                    <div className="payments">
                        <h2 className="header-title-thre mt-5"><CurrencyBitcoinIcon style={{width: '35px', height: '35px'}}></CurrencyBitcoinIcon> Пополнение счета Monero (XMR)</h2>
                        <div className="text-free">
                            Кошелек Monero (XMR) для пополнения: 
                            <h2> </h2>
                        </div>
                    </div>
                    <div className="header-title-thre">
                    Как пополнить Monero кошелек?
                    </div>
                    <div className="accordion">
                        <div className="section">
                            Шаг первый
                        </div>
                    </div>
                    <div className="panel">
                    <h2 className="header-title-thre">- Перейдите на один представленых обменников ниже.</h2>
                    <h3 className="header-title-thre">- <Link to='https://myxa.cc/exchange_sberrub_to_xmr/'>Муха</Link></h3>
                    <h3 className="header-title-thre">- <Link to='https://coinblinker.com/visa-mastercard-rur-to-monero.html'>CoinBlinker</Link></h3>
                    <h3 className="header-title-thre">- <Link to='https://moment.express/?ref=f0cfa286-56c3-48a8-8e62-80a3fd9b0eab'>Момент</Link></h3>
                    <h3 className="header-title-thre">- <Link to='https://xchange.cash/sberbank-to-monero.html'>Xchange</Link></h3>
                    <h3 className="header-title-thre">- <Link to='https://top-exchange.com/'>Top-Exchange</Link></h3>
                    </div>
                    <div className="accordion">
                        <div className="section">
                            Шаг Второй
                        </div>
                    </div>
                    <div className="panel">
                    <h3 className="header-title-thre">- Cкопируйте номер Monero кошелька и вставьте его в необходимое поле на сайте выбранного Вами обменника.</h3>
                    <h3 className="header-title-thre">- Заполните все необходимые поля на сайте обменника.</h3>
                    <h3 className="header-title-thre">- Следуйте инструкциям.</h3>
                    </div>
                    <div className="accordion">
                        <div className="section">
                            Шаг Третий
                        </div>
                    </div>
                    <div className="panel">
                    <h3 className="header-title-thre">- После оплаты, сохраните чек, и отправьте в чат онлайн технической поддержки на нашем сайте.</h3>
                    </div>
                </div>
            </div>
        <Footer /> 
    </div>
}

export default Payments;