import { Link } from 'react-router-dom'
import '../../style/footer.css'

function Footer() {
    let date = new Date()
    let year = date.getFullYear()
    return <div className="footer bg-img">
        <div className="footer_panel">
        <div className="container footer_holder">
            <p className="footer_copyright">© 2017– {year} Гарант сервис gamesgun.ru</p>
                <ul className="footer-menu">
                    <li className="footer-menu_item">
                        <Link className="footer-menu_link" to='/rules' >Пользовательское соглашение</Link>
                    </li>
                </ul>
        </div>
        </div>
    </div>
}

export default Footer