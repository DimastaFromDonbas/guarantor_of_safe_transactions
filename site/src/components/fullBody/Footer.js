
function Footer() {
    let date = new Date()
    let year = date.getFullYear()
    return <div className="footer">
        <div className="footer_panel">
        <div class="container footer_holder">
            <p class="footer_copyright">© 2017– {year} Гарант сервис gamesgun.ru</p>
                <ul class="footer-menu">
                    <li class="footer-menu_item"><a class="footer-menu_link" href="/rules" target="_blank">Пользовательское соглашение</a></li>
                </ul>
        </div>
        </div>
    </div>
}

export default Footer