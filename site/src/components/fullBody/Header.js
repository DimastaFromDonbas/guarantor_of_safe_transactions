import { Navbar, Alert} from "react-bootstrap";
import {Routes,Route,Link} from "react-router-dom"
import '../../style/header.css'
import img1 from '../../image/free-icon-home-7544449.png'

function Header() {
    return  <>
        <Alert.Heading style={{backgroundColor: '#E63F3F', color: 'white',margin: 0, height: "40px", textAlign: "center",fontSize: '17px',paddingBottom:'10px',paddingTop:'10px'}}>Технический чат поддержки работает с 10:00 до 20:00 ежедневно!</Alert.Heading>
              <div className="navbar-header">
              <div className="nav-main-header">
              <Link className="color-nav-link color" to="/main"><img className="imgWith" src={img1} alt='sss'></img></Link>
              <div className="flex-nav-link">
              <Link className="color-nav-link color" to="#">ПОМОЩЬ</Link>
              <Link className="color-nav-link color" to="#">РАЗРЕШЕНИЕ СПОРОВ</Link>
              <Link className="color-nav-link color" to="#">ОТЗЫВЫ</Link>
              </div>
              </div>
              <div className="flex-nav-link-registr ">
              <Link className="color-nav-link color" to="#">Войти</Link>
              <Link className="color-nav-link color" to="#">Регистрация</Link>
              </div>
              </div>
    </>
}

export default Header