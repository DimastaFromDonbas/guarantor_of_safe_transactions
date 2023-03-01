import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useAppSelector } from '../../../../store/reduxHooks';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';

function PromoDescription() {

    const { user, nameTheSite } = useAppSelector((store) => store.user);

    return <>

            <div className="promo-description container">
                <div className="block-main-v1">

                    <h1>{nameTheSite.name} - лучший гарант безопасных сделок!</h1>
                    <Link style={{ textDecoration: 'none' }} to={`${user?.id ? 'makedeal' : '/login'}`}>
                        <button className="btn-class-v1">Открыть новую сделку</button>
                    </Link>
                </div>
                <ul className="ist-promo">
                    <li className="list-promo-item">
                        <SecurityIcon className="hovet-effect"></SecurityIcon>
                        <p>
                            Наш сервис отвечает за безопасность
                            <br />
                            каждой сделки.
                        </p>
                    </li>
                    <li className="list-promo-item">
                        <CalendarMonthIcon className="hovet-effect"></CalendarMonthIcon>
                        <p>
                            Сервис работает 24 часа в сутки
                            <br />7 дней в неделю
                        </p>
                    </li>
                    <li className="list-promo-item">
                        <CurrencyExchangeIcon className="hovet-effect"></CurrencyExchangeIcon>
                        <p>Комиссия меньше 10%</p>
                    </li>
                </ul>
            </div>

    </>
}

export default PromoDescription