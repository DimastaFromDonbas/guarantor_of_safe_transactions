import { Link } from 'react-router-dom'
import '../../style/footer.css'

function Footer() {
    let date = new Date()
    let year = date.getFullYear()
    return <div className="footer bg-img">
        <div className="footer_panel">
        <div class="container footer_holder">
            <p class="footer_copyright">© 2017– {year} Гарант сервис gamesgun.ru</p>
                <ul class="footer-menu">
                    <li class="footer-menu_item">
                        <Link class="footer-menu_link" to='#' target="_blank">Пользовательское соглашение</Link>
                    </li>
                </ul>
        </div>
        </div>
    </div>
}

export default Footer